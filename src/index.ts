import { CeateQuestion } from './Question';

process.on('uncaughtException', (error) => {
  console.error('未捕獲的異常:', error);
  // 保持窗口開啟
  console.log('\n程序出錯。按 Enter 鍵退出...');
  process.stdin.resume();
  process.stdin.on('data', () => process.exit(1));
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未處理的 Promise 拒絕:', reason);
  // 保持窗口開啟
  console.log('\n程序出錯。按 Enter 鍵退出...');
  process.stdin.resume();
  process.stdin.on('data', () => process.exit(1));
});

// 顯示環境信息
console.log('===== 環境信息 =====');
console.log(`Node 版本: ${process.version}`);
console.log(`平台: ${process.platform}`);
console.log(`當前工作目錄: ${process.cwd()}`);
console.log(`執行文件: ${process.execPath}`);
console.log(`是否為 pkg 打包: ${!!process.pkg}`);
console.log('===================\n');

CeateQuestion();

// console.log(process.pkg);