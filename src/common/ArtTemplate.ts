import artTemplate from "art-template";
import { GetRootPath } from "./utils";

/** https://goofychris.github.io/art-template/zh-cn/docs/options.html */
/** 读取路径默认 src 下 */
const options: Partial<typeof artTemplate.defaults> = {
  root: GetRootPath(),
}

Object.assign(artTemplate.defaults, options)

export default artTemplate;
