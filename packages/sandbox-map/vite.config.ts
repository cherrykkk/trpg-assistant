import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    extensions: [".ts"],
  },
  server: {
    host: "0.0.0.0",
  },
});
