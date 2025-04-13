import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), react()],
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  server: {
    host: true,
    port: 5174,
    strictPort: false,
    open: true,
    fs: {
      allow: [resolve('./')],
    },
  },
});
