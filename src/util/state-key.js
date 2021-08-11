/* @flow */
import { inBrowser } from './dom'

// use User Timing api (if present) for more accurate key precision
const Time =
  inBrowser && window.performance && window.performance.now
    ? window.performance
    : Date

export function genStateKey (): string {
  return Time.now().toFixed(3)
}

// 有意思，这种全局变量我还以为只有react会用
// TODO:用法上好像是copy啥的

let _key: string = genStateKey()

export function getStateKey () {
  return _key
}

export function setStateKey (key: string) {
  return (_key = key)
}
