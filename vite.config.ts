import { defineConfig } from 'vite';
import { resolve } from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import pluginCommonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // 确保打包目标与 Node 环境版本匹配
    target: 'node18',
    ssr: true,
    // sourcemap: true,
    /** 是否压缩 */
    minify: 'esbuild',
    
    commonjsOptions: { transformMixedEsModules: true },
    outDir: 'dist', // 打包输出目录
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      plugins: [
        nodeResolve({ preferBuiltins: true }),
        pluginCommonjs(),
        {
          name: 'copy-template-files',
          generateBundle() {
            const copyFile = {'src/Template': 'dist/Template'}

            Object.entries(copyFile).forEach(([origin, target]) => {
              /** 创建目录 */
              if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

              const files = fs.readdirSync(origin, {recursive: true}) as string[];
              files.forEach(file => {
                const oFilePath = path.resolve(origin, file);
                const tFilePath = path.resolve(target, file);
                const stat = fs.statSync(oFilePath);

                if (stat.isDirectory()) return fs.mkdirSync(tFilePath, { recursive: true });

                fs.createReadStream(oFilePath).pipe(fs.createWriteStream(tFilePath));
              })
            })
          }
        }
      ],
      /** es6摇树优化 */
      treeshake: 'smallest',
      // 標記外部依賴，這些依賴將不會被打包進最終產物
      external: ['path', 'fs', 'inquirer', 'art-template', 'child_process'],
      output: {
        interop: 'auto',
        /** false: 禁用动态导入内联，保持资源文件独立输出 */
        inlineDynamicImports: true,
        globals: {},
        compact: true, // 移除空格和注释
        minifyInternalExports: true, // 压缩内部导出
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});