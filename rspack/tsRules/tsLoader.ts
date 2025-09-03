import { RuleSetRules } from "@rspack/core";

/** 平均时长 6-7s */
export default [
  {
    test: /\.ts$/,
    use: {
      loader: 'ts-loader',
      options: {
        compilerOptions: { target: 'es2020', module: 'esnext' }
      }
    },
    exclude: /node_modules/,
  }
] satisfies RuleSetRules;