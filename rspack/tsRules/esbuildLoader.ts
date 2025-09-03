import { RuleSetRules } from "@rspack/core";

/** 源码中的中文会被Unicode 编码掉 */
/** 平均时长 0.4 - 1s */
export default [
  {
    test: /\.ts$/,
    use: {
      loader: 'esbuild-loader',
      options: { loader: 'ts', target: 'es2020' }
    },
    exclude: /node_modules/,
  }
] satisfies RuleSetRules;