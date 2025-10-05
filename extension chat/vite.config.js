import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Allows Vite to handle JSX files in the root folder
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /.*\.(js|jsx)$/, // tell esbuild to handle JSX everywhere
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx", // allow JSX inside .js too
      },
    },
  },
});
