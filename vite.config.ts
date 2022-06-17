import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-polyfill-node";
const production = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    !production &&
      nodePolyfills({
        include: [
          "node_modules/**/*.js",
          new RegExp("node_modules/.vite/.*js"),
        ],
      }),
  ],
  server: {
    port: 8000,
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
