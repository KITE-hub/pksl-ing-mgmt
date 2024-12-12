from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import vision
from google.oauth2 import service_account
import os
from datetime import datetime
import json
from dotenv import load_dotenv
from ocrConfig import readNumber, ingDataInitial

load_dotenv()
app = Flask(__name__)
CORS(app)

# 環境変数からGoogle Cloudの認証情報を読み込む
credentials_info = os.environ.get('GOOGLE_CREDENTIALS_JSON')

if not credentials_info:
  raise RuntimeError("GOOGLE_CREDENTIALS_JSON environment variable is not set!")

# 認証情報をJSONとしてパースして、Google Cloudのクライアントに渡す
credentials_dict = json.loads(credentials_info)
credentials = service_account.Credentials.from_service_account_info(credentials_dict)
client = vision.ImageAnnotatorClient(credentials=credentials)

# 使用量のカウント変数（簡易版: 永続化が必要ならDBやファイルを使う）
API_REQUEST_COUNT = 0
FREE_TIER_LIMIT = 1000  # 無料枠（1000リクエスト/月）
LAST_RESET_MONTH = datetime.now().month  # 初期化時の月

def reset_request_count_if_needed():
    """月が変わった場合にAPI_REQUEST_COUNTをリセットする関数"""
    global API_REQUEST_COUNT, LAST_RESET_MONTH
    current_month = datetime.now().month
    if current_month != LAST_RESET_MONTH:
        API_REQUEST_COUNT = 0
        LAST_RESET_MONTH = current_month

@app.route("/ocr", methods=['POST'])
def ocr():
  global API_REQUEST_COUNT

  if API_REQUEST_COUNT >= FREE_TIER_LIMIT:
    return jsonify({"error": "Free tier limit exceeded. Please try again later."}), 403

  files = request.files.getlist('image')
  ingData = ingDataInitial.copy()

  for file in files:
    # 画像を直接Google Vision API形式に変換
    content = file.read()  # ファイルを直接読み込む
    image_vision = vision.Image(content=content)
    # OCR実行
    response = client.text_detection(image=image_vision)
    detections = response.text_annotations

    API_REQUEST_COUNT += 1

    if detections:
      text_annotations = detections[1:]
      numbers = []
      ings = []
      xFound = False

      for detection in text_annotations:
        vertices = detection.bounding_poly.vertices
        xAxisBottomRight = vertices[2].x
        yAxisBottomRight = vertices[2].y
        text = detection.description

        if text.startswith("x"):
          try:
            number = int(text.replace("x", ""))
            numbers.append([number, xAxisBottomRight, yAxisBottomRight])
            xFound = True
          except ValueError:
            pass
        elif text in readNumber and xFound:
          ings.append([text, xAxisBottomRight, yAxisBottomRight])

      for i in range(len(ings)):
        mindiff = float('inf')
        minIndex = -1
        for j in range(len(numbers)):
          diff = (ings[i][1] - numbers[j][1])**2 + (ings[i][2] - numbers[j][2])**2
          if diff < mindiff:
            mindiff = diff
            minIndex = j
        if minIndex != -1:
          ingData[readNumber[ings[i][0]]] = numbers[minIndex][0]

  return jsonify(ingData)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
