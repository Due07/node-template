import { RuleSetRules } from "@rspack/core";

/** 平均时长 2 - 3s */
export default [
  {
    test: /\.ts$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', { targets: { node: '16' } }],
          '@babel/preset-typescript'
        ],
        // plugins: [
        //   '@babel/plugin-proposal-class-properties',
        //   '@babel/plugin-proposal-object-rest-spread'
        // ]
      }
    },
    exclude: /node_modules/,
  }
] satisfies RuleSetRules;