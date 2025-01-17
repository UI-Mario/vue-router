/* @flow */

// queue是入参，fn是每次运行的异步方法，fn必须要带一个执行完后的回调，cd是所有都执行完后的回调
export function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
  const step = index => {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }
  step(0)
}

// 考虑下reduce的版本
// emm，这种异步咋搞，不需要把上一个方法的返回值当作下一个的入参，但是要按顺序
// 就只能对方法再封装一下了，好像也不用reduce了
export const reduceQueue = (queue: Array<?NavigationGuard>, fn: Function, cb: Function) => {
  if (!queue) return
  if (queue.length < 2) {
    fn(queue[0], cb)
  }

  const newFn = (args) => new Promise((resolve, reject) => {
    fn(args, () => {
      resolve()
    })
  })

  queue.reduce(async(accumulator, current) => {
    await newFn(current)
  })
} 