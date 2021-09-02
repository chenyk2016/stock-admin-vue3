/* eslint-disable */
function pow10 (d, num = 0) {
  const ds = d.toString()
  let len
  try {
    len = ds.split('.')[1].length
  } catch (f) {
    len = 0
  }
  let c = num - len
  let db = ds.replace('.', '')

  if (c >= 0) {
    while (c--) {
      db += '0'
    }
    return Number(db)
  }

  return Number(db.slice(0, db.length + c) + '.' + db.slice(c))
}

/**
 * [accAdd 加法运算 a + b]
 */
export function accAdd (a, b) {
  let c, d, e, f
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  f = Math.max(c, d)
  e = Math.pow(10, f)
  return (pow10(a, f) + pow10(b, f)) / e
}

/**
 * [accMul 乘法运算 a * b]
 */
export function accMul (a, b) {
  let c = 0
  const d = a.toString()
  const e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}

/**
 * [accSub 减法运算 a - b]
 */
export function accSub (a, b) {
  let c, d, e, f
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  f = Math.max(c, d)
  e = Math.pow(10, f)
  return parseFloat((pow10(a, f) - pow10(b, f)) / e)
}

/**
 * 获取数字的范围 a~b
 * @param  {[arr]} numArr [1,2,3]
 * @return {[str]}        [1～2 | 1]
 */
export function getNumberRange (numArr) {
  if (!numArr || numArr.length === 0) {
    return ''
  }
  const min = Math.min.apply(null, numArr)
  const max = Math.max.apply(null, numArr)

  if (min !== max) {
    return `${min}~${max}`
  }
  return `${min}`
}
