'use client';
import {useState, useEffect} from 'react';
import Description from '../components/Description';
import ImageInput from '../components/ImageInput';
import DishOrderInput from '../components/DishOrderInput';
import Grid from '../components/Grid';
import ResultInitialState from '../db/ResultInitialState.json';
import {iResult} from '../types';

export default function Home() {
  const [result, setResult] = useState<iResult[]>(ResultInitialState);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedResult = localStorage.getItem('result');
      if (storedResult) {
        setResult(JSON.parse(storedResult));
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('result', JSON.stringify(result));
    }
  }, [result]);

  const [isMaximumMode, setIsMaximumMode] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedIsMaximumMode = localStorage.getItem('isMaximumMode');
      if (storedIsMaximumMode) {
        setIsMaximumMode(JSON.parse(storedIsMaximumMode));
      }
    }
  }, []); // 初回レンダリング時のみ実行
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isMaximumMode', JSON.stringify(isMaximumMode));
    }
  }, [isMaximumMode]);

  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const root = document.documentElement;
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme === 'dark') {
  //     root.classList.add('dark');
  //     setDarkMode(true);
  //   }
  // }, []);

  // const toggleTheme = () => {
  //   const root = document.documentElement;
  //   if (darkMode) {
  //     root.classList.remove('dark');
  //     localStorage.setItem('theme', 'light');
  //   } else {
  //     root.classList.add('dark');
  //     localStorage.setItem('theme', 'dark');
  //   }
  //   setDarkMode(!darkMode);
  // };

  return (
    <div className="">
      <header className="text-xl flex items-center bg-[#25d76b] border-b-2 border-[#0d974f] shadow-md m-0 px-3">
        <h1 className="font-bold m-0 text-white">
          食材管理ツール <small>for ポケモンスリープ</small>
        </h1>
        {/* <button onClick={toggleTheme} style={{ padding: '10px', fontSize: '16px' }}>
          {darkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
        </button> */}
        <Description />
      </header>
      <div className="responsiveFlex">
        <div className="mx-auto">
          <ImageInput result={result} setResult={setResult} />
          <DishOrderInput result={result} setResult={setResult} isMaximumMode={isMaximumMode} />
        </div>
        <Grid result={result} isMaximumMode={isMaximumMode} setIsMaximumMode={setIsMaximumMode} />
      </div>
    </div>
  );
}
