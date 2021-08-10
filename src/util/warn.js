/* @flow */

export function assert (condition: any, message: string) {
  if (!condition) {
    throw new Error(`[vue-router] ${message}`)
  }
}

// TODO:这里很好奇的是，打包以后这个process.env什么的，还能继续判断吗
// 在dist文件夹下还是有process存在的
export function warn (condition: any, message: string) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(`[vue-router] ${message}`)
  }
}

