import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from '@vant/auto-import-resolver';
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
    UnoCSS(),
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
		host: true,
		proxy: {
			'/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
		}
	}
})
