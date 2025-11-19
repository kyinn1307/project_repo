import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const DEV_BACKEND = env.DEV_BACKEND_URL;
  return {
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
          target: DEV_BACKEND,
          changeOrigin: true,
        },
        "/ws": {
          target: DEV_BACKEND,
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
});
