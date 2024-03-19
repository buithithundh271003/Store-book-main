import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;

export default defineConfig({
    server: {
        port: 8080,
    },
    plugins: [
        ...VitePluginNode({
            adapter: "express",
            appPath: "./src/app.js",
            exportName: "viteNodeApp",
            tsCompiler: "esbuild",
            swcOptions: {},
        }),
    ],
    optimizeDeps: {},
});
