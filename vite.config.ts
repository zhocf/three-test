import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, ".", dir)
}
const alias: Record<string, string> = {
    '@': pathResolve("src")
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
		alias
	},
    server: {
		host: '0.0.0.0'
	},
})
