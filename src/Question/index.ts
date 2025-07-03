import inquirer from 'inquirer';
import fs from 'fs';
import { PromptConfig } from './config';
// import TableTem from '@/Template/Table/index.art';

import artTemplate from '@/common/ArtTemplate';
import StreamFile from '@/common/write';

// import TableArt from '@/Template/Table/index.art';
// const result = TableArt({value: 111, data: 'xs'});

// 暫停函數，等待用戶按鍵
const pauseBeforeExit = () => {
  if (process.pkg) {
    console.log('\n操作完成。按任意鍵退出...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', () => process.exit(0));
  } else {
    process.exit(0);
  }
};

export const CeateQuestion = () => {
  inquirer.prompt(PromptConfig).then(async (res) => {
    const { fileName, isDirectory, isTable, isForm } = res;

    if (!isTable && !isForm) {
      console.log('----------------- 什么都不要 再见🏃🏃🏃 -----------------');
      return pauseBeforeExit();
    }

    const result = artTemplate('Template/Table/index.art', res);

    if (!!isDirectory) {
      const dirPath = `/dist/${fileName}`;
      const isDirectoryExists = fs.existsSync(dirPath);

      if (isDirectoryExists) {
        console.log(`--------- ❌路径目录已存在：${dirPath} ---------`);
        return pauseBeforeExit();
      }

      const configResult = artTemplate('Template/config.art', res);

      await StreamFile(dirPath, 'index.vue', result);
      await StreamFile(dirPath, 'config.ts', configResult);
      console.log('------------- 操作结束！🔚 -------------');
      return pauseBeforeExit();
    }

    await StreamFile('/dist/', `${fileName}.vue`, result);
    console.log('------------- 操作结束！🔚 -------------');
    pauseBeforeExit();

  }).catch(error => {
    console.error('操作过程出错:', error);
    pauseBeforeExit();
  });
};