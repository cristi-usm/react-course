import { defineConfig } from 'vite'
import { resolve } from 'path'
import { multiPublicPlugin } from '../../common/vite/multi-public-plugin'

export default defineConfig({
  plugins: [
    multiPublicPlugin([
      resolve(__dirname, '../../common/public'),
    ]),
  ],
})
