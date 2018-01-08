
/**
 * 判断值对应的类型
 * @param {String|Function}type 自定义对象需要传递类型，其他（String、Boolean、Number、Null、Undefined、Function、Date、Array、RegExp、Object）
 * @param {String|Boolean|Number|Null|Undefined|Function|Date|Array|RegExp|Object} val 待判断的值
 * @param  {Boolean} [isCustomType=false] 是否是自定义类型
 * @return {Boolean}                      预期类型匹配返回true，否则返回false
 */
export function is(type, val, isCustomType = false) {
  if (type === 'NaN') {
    return isNaN(val)
  } else if (Object.prototype.toString.call(val) === `[object Object]` && type !== 'Object' && isCustomType) {
    return val instanceof type
  } else {
    return Object.prototype.toString.call(val) === `[object ${type}]`
  }
}

export const inBrowser = typeof window !== 'undefined'
