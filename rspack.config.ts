import { defineConfig } from '@rspack/cli';
import { RspackOptions } from '@rspack/core';
import path from 'path';
import { fileURLToPath } from 'url';
import swcLoader from './rspack/tsRules/swc-loader';
// import tsLoader from './rspack/tsRules/ts-loader';
// import esbuildLoader from './rspack/tsRules/esbuild-loader';
// import babelLoader from './rspack/tsRules/babel-loader';

type TSystemType = 'es' | 'common';
type TSystemConfig = {
  outputDirery: string,
  suffix: string,
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SystemModule: Record<TSystemType, TSystemConfig> = {
  es: { outputDirery: '/es/', suffix: 'js' },
  common: { outputDirery: '/common/', suffix: 'cjs' },
};

/**
 * @param outputType 打包目标类型
 * @param clean // 是否打包时清除目标文件夹内容
 */
const defineConfigFn = (outputType: 'es' | 'common' = 'es', clean = true) => {
  const moduleType = SystemModule[outputType];

  const CommonOutput: RspackOptions['output'] = {
    path: path.resolve(__dirname, `rsDist${moduleType.outputDirery}`),
    filename: `/[name].${moduleType.suffix}`,
    clean,
    library: { type: 'commonjs2' },
  }
  const EsOutput: RspackOptions['output'] = {
    module: true,
    path: path.resolve(__dirname, `rsDist${moduleType.outputDirery}`),
    filename: `/[name].${moduleType.suffix}`,
    clean,
    library: { type: 'module' },
  }
  return defineConfig({
    entry: { index: './src/index.ts' },
    target: ['node'],
    externals: {
      'art-template': 'commonjs art-template'
      //  ↑ 模块名称      ↑ 外部依赖格式
    },
    devtool: false,
    output: {
      clean: true,
      /** 资源url路径 */
      assetModuleFilename: '[ext]/[name]-[hash][ext]',
      ...(outputType === 'es' ? EsOutput : CommonOutput),
    },

    experiments: { outputModule: outputType === 'es' },

    optimization: {
      minimize: false,              // 禁用压缩
      minimizer: [],               // 自定义压缩器
      usedExports: false,          // 禁用 tree shaking
      sideEffects: true,          // 标记无副作用
      concatenateModules: false,   // 禁用模块连接
      splitChunks: {               // 启用按引入文件的代码分割
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\\/]node_modules[\\\/]/,
            name: 'vendors',
            filename: `/[name]-[contenthash].${moduleType.suffix}`,
            chunks: 'all',
            // https://rspack.rs/zh/plugins/webpack/split-chunks-plugin#splitchunkscachegroupscachegrouppriority
            priority: 1
          },
          common: {
            name: 'common',
            filename: `/[name]-[contenthash].${moduleType.suffix}`,
            minChunks: 2, // 被引用至少2次的模块，将被分包
            chunks: 'all',
            priority: 3
          }
        }
      }
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    module: {
      rules: [
        ...swcLoader,
        // ...tsLoader,
        // ...esbuildLoader,
        // ...babelLoader,
        {
          test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
          // https://rspack.rs/zh/guide/features/asset-module
          type: 'asset',
        }
      ],
    },
    /** 使用运行时真实路径 */
    node: { __dirname: false, __filename: false },
  })
};
export default [
  /** commonjs */
  defineConfigFn('common'),
  /** es module */
  defineConfigFn('es'),
];