import { RuleSetRules, SwcLoaderOptions } from "@rspack/core";

/** swc 因为是rust编译的，所以源码中的中文会被Unicode 编码掉 */
/** 平均时长 0.1 - 1s */
export default [
  {
    test: /\.ts$/,
    use: {
      loader: 'builtin:swc-loader',
      options: {
        jsc: {
          parser: { syntax: 'typescript', tsx: false },
          target: 'es2020',
        },
      } satisfies SwcLoaderOptions,
    },
    exclude: /node_modules/,
  },
] satisfies RuleSetRules;