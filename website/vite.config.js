import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from '@vant/auto-import-resolver';
import UnoCSS from 'unocss/vite'
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
	root: __dirname,
	plugins: [
    UnoCSS(),
		vue(),
		AutoImport({
			resolvers: [VantResolver()],
		}),
		Components({
			resolvers: [VantResolver()],
		}),
	],
	build: {
		outDir: "../dist",
		sourcemap: false,
		emptyOutDir: true
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	server: {
		host: "0.0.0.0",
		proxy: {
			'/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
		}
	}
})
