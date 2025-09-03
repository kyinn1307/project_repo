import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), svgr()],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://18.232.187.209:8080",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
      },
      "/ws": {
        target: "http://18.232.187.209:8080",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
