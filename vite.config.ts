import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
      ],
      resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
    build: {
      outDir:'lib',
      lib:{
        entry:'./src/index.ts',
        name:'MarkdownItNavbar',
        formats:['es','umd'],
        fileName: (format) => {
          if(format==='es'){
            return 'index.js'
          }
        return   `index.${format}.js`
        }
      },
      rollupOptions: {
        // 确保外部处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            MarkdownItNavbar: 'MarkdownItNavbar'
          }
        }
      }
  }

})
