import { fileURLToPath, URL } from 'node:url'
const path = require("path");
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {

  console.log(mode)


  return defineConfig({
    base: mode == 'development' ? "/" : path.resolve(__dirname, "./dist/"),
    server: { port: 8080 },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
