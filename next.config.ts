import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'x.com', // 画像のホスト名
        pathname: '/SwabluPksl/**' // 必要に応じてパスも指定
      }
    ]
  }
};

export default nextConfig;
