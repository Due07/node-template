import { PROJECT_PATH } from '@/common/utils';
import fs from 'fs';
import path from 'path';

/** 验证目录是否存在， false 则已存在指定路径的目录, true 则创建指定路径的目录 */
const VerifyDirectory = (directoryPath: string): boolean => {
  try {
    if (fs.existsSync(directoryPath)) return false;

    fs.mkdirSync(directoryPath, { recursive: true });
    return true;
  } catch (error) {
    console.error(`創建目錄失敗: ${directoryPath}`, error);
    return false;
  }
};

/**
 * 写入文件
 * @param directoryPath 目录路径
 * @param fileName 文件名称
 * @param targetValue 写入内容
 * @returns 
 */
const StreamFile = (directoryPath: string, fileName: string, targetValue: string) => {
  const dirPath = path.join(PROJECT_PATH, directoryPath);
  VerifyDirectory(dirPath);

  const fullPath = path.join(PROJECT_PATH, `${directoryPath}/${fileName}`);
  
  try {
    const ws = fs.createWriteStream(fullPath);
    ws.write(targetValue);
    ws.end();

    return new Promise<boolean>((resolve) => {
      ws.on('finish', () => {
        console.log(`------- 🔈: 写入完成 ${fullPath} -------`);
        resolve(true);
      });

      ws.on('error', (e) => {
        console.error('error', e);
        resolve(false);
      });
    });
  } catch (error) {
    console.error(`創建文件失敗: ${fullPath}`, error);
    return Promise.resolve(false);
  }
};

export default StreamFile;