import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    hmr: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"), // 设置入口文件
      name: "rich-text", // 起个名字，安装、引入用
      fileName: (format) => `index.${format}.js`, // 打包后的文件名
    },
  },
});
