import type {Metadata} from 'next';
import {M_PLUS_1p} from 'next/font/google';
import './globals.css';

const mainFont = M_PLUS_1p({
  weight: ['400', '700'] // フォントの太さを指定
});

export const metadata: Metadata = {
  title: '食材管理ツール',
  description:
    '食材バッグのスクリーンショットを画像として読み込み、目的のレシピを入力することで、食材数を管理するツールです。'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={mainFont.className}>{children}</body>
    </html>
  );
}
// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
