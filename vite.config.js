import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import commonjs from '@vitejs/plugin-commonjs';

export default defineConfig({
	plugins: [react(), tailwindcss(),commonjs()],
	optimizeDeps: {
		include: ["recharts"],
	},
});
