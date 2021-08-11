// 想了一下，这个相比Object.assign()就在于原型链上的属性
export function extend (a, b) {
  for (const key in b) {
    a[key] = b[key]
  }
  return a
}
