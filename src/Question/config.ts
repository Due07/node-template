import inquirer from 'inquirer';

type TPrompt = Parameters<typeof inquirer.prompt>[0];

type TConfigValue = 'isPagination' | 'isFilter' | 'isExecl' | 'isDialogForm';

type TFormType = {
  /** 文件名 */
  fileName: string;
  /** 是否需要目录结构 */
  isDirectory: boolean;
  /** 是否需要Table */
  isTable: boolean;
  /** 列表所需配置   isPagination: 分页模块, isFilterisFilter: 筛选表单 */
  tableConfig: TConfigValue[];
  /** 是否需要Form */
  isForm: boolean;
}

export const PromptConfig = [
  {
    type: 'input',
    name: 'fileName',
    message: '确定文件名称 (大驼峰命名): ',
    validate: (value) => !!value,
  },
  {
    type: 'confirm',
    name: 'isDirectory',
    message: '是否需要目录结构? Y 将生成文件目录（含有 index.ts，config.ts）',
  },
  {
    type: 'confirm',
    name: 'isTable',
    message: '是否需要Table',
  },
  {
    when: (res) => res.isTable,
    type: 'checkbox',
    name: 'tableConfig',
    message: '选择需要额外配置（空格键选中/取消）',
    choices: [
      { value: 'isPagination', name: '分页模块' },
      { value: 'isFilter', name: '筛选表单' },
      { value: 'isExecl', name: '导出Table' },
      { value: 'isDialogForm', name: '弹窗Form' },
    ],
  },
  // {
  //   when: (res) => !res.isTable,
  //   type: 'confirm',
  //   name: 'isForm',
  //   message: '是否需要Form',
  // },
] as (TPrompt & {name: keyof TFormType})[];