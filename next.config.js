/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' 已删除 — 静态导出会导致服务端追踪代码不执行
  // EdgeOne Pages 框架预设=Next + 输出目录=.next，支持 Cloud Functions / SSR
  images: {
    unoptimized: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

module.exports = nextConfig;
