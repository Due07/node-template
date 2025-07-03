import path from "path";

export const PROJECT_PATH = process.pkg ? path.dirname(process.execPath) : path.join(process.cwd(), '/');

/** 获取src路径 */
export const GetRootPath = () => {
  /** 如果pkg 打包则在exe所在目录， 否则是项目的src下 */
  return process.pkg ? PROJECT_PATH : path.join(PROJECT_PATH, '/src');
};

/** 获取完整路径 */
export const GetWholePath = (paths: string) => {
  return path.join(GetRootPath(), paths);
};