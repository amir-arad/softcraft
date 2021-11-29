import { defineConfig } from 'vite';
import dotenv from 'dotenv';
// import reactRefresh from '@vitejs/plugin-react-refresh';
dotenv.config();

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
    // plugins: [reactRefresh()],
    optimizeDeps: {
        include: ['@emotion/react', '@arwes/core'],
    },
    server: {
        proxy: {
            '/api': {
                target: `http://localhost:${PORT}`,
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'dist/app',
    },
    // esbuild: {
    //     jsxFactory: `jsx`,
    //     jsxInject: `import { jsx } from '@emotion/react'`,
    // },
});
