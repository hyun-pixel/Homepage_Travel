import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // 5173은 다른 프로젝트가 쓰고 있어 5180으로 고정한다.
    port: Number(process.env.PORT) || 5180,
    strictPort: false,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        // 애니메이션 라이브러리는 별도 청크로 분리해 초기 로드를 줄인다.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap', 'lenis'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
