import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
    // 确保静态资源被正确复制到dist目录
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // 保持img文件夹结构
          if (assetInfo.name?.match(/\.(png|jpe?g|svg|gif|avif|webp)$/i)) {
            return 'img/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths()
  ],
  // 确保img文件夹被识别为静态资源目录
  publicDir: 'public'
})
