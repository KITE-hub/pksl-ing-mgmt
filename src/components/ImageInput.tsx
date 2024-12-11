'use client';
import React from 'react';
import {useState} from 'react';
import {ImageInputProps} from '../types';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';

export default function ImageInput({result, setResult}: ImageInputProps) {
  const [image, setImage] = useState<File[]>([]);
  const [imageName, setImageName] = useState<string[]>([]);
  const [imageSize, setImageSize] = useState<string[]>(['0', '0']);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 2);
      const names = files.map((file) => file.name);
      const sizes = files.map((file) => (file.size / 1024).toFixed(2)); // kB単位に変換      setImageName(names);
      setImageName(names);
      setImage(files);
      setImageSize(sizes);
    }
  };

  const handleOCR = async () => {
    if (image.length > 0) {
      setIsLoading(true);
      const updatedResult = [...result];
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append('image', image[i]);
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_FLASK_API;
        if (!apiUrl) {
          throw new Error('API URL is not defined');
        }
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Unknown error');
        }
        const data: number[] = await response.json();
        for (let i = 0; i < data.length; i++) {
          updatedResult[i].nowIngCount = data[i];
          updatedResult[i].diffIngCount =
            updatedResult[i].nowIngCount - updatedResult[i].targetIngCount;
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
        setResult(updatedResult);
      }
    }
  };

  return (
    <div className="ImageInput mt-6 mb-10 mx-auto">
      <div className="flex mb-3">
        <span className="bg-[#25d76b] w-1.5 mr-1.5"></span>
        <h3 className="font-bold text-white bg-[#25d76b] px-2 clipSlant flex-grow">画像認識</h3>
      </div>
      <div className="responsiveFlexImageInput">
        {imageName.length > 0 ? (
          <label
            htmlFor="file-upload"
            className="shadow-input bg-white rounded-full border border-[#25d76b] focus:border-2 focus:border-[#25d76b] h-14 w-80 flex mx-auto my-4 items-center justify-center cursor-pointer"
          >
            <ImageIcon className="mr-2" />
            <div>
              {imageName.map((name, index) => (
                <div key={index}>
                  {name.split('.')[0].length > 11
                    ? `${name.slice(0, 11)}... .${name.split('.').pop()}`
                    : name}
                  <small> ({imageSize[index]} kB)</small>
                </div>
              ))}
              <input
                className="hidden"
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
          </label>
        ) : (
          <label
            htmlFor="file-upload"
            className="shadow-input bg-white rounded-full border border-[#25d76b] focus:border-2 focus:border-[#25d76b] h-14 w-80 flex mx-auto my-4 items-center justify-center cursor-pointer"
          >
            <AddIcon className="mr-2" />
            <div className="flex items-end">
              食材バッグの画像を選択
              <small className="ml-1">(2枚まで)</small>
            </div>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </label>
        )}
        {isLoading ? ( // isLoading が true のときに表示する要素
          <button
            className="shadow-input font-bold text-center text-white bg-gray-400 rounded-full border border-gray-600 py-1.5 w-44 flex mx-auto my-4 justify-center self-center"
            disabled
          >
            読み込み中...
          </button>
        ) : (
          // isLoading が false のときに表示する要素
          <button
            onClick={handleOCR}
            className="shadow-input font-bold text-center text-white bg-[#25d76b] rounded-full border border-[#0d974f] py-1.5 w-44 flex mx-auto my-4 justify-center self-center"
          >
            画像を読み込む
          </button>
        )}
      </div>
    </div>
  );
}
