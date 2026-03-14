import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path'; // <- adicione

const isVercel = process.env.VERCEL === '1';

const plugins: any[] = [
    tailwindcss(),
    vue({
        template: {
            transformAssetUrls: {
                base: null,
                includeAbsolute: false,
            },
        },
    }),
];

if (!isVercel) {
    const { default: laravel } = await import('laravel-vite-plugin');
    const { wayfinder } = await import('@laravel/vite-plugin-wayfinder');

    plugins.unshift(
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
    );

    plugins.push(wayfinder({ formVariants: true }));
}

export default defineConfig({
    plugins,
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'), // <- adicione
        },
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: 'resources/js/app.ts',
        },
    },
});
