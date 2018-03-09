import { is } from './util/type'
import { info } from './util/warn'

let _appId,// 唯一标识
  _timestamp,// 生成签名的时间戳
  _nonceStr,// 生成签名的随机串
  _signature,// 签名
  _errorHandler
  // _event

/**
 * 判断一个字符串是否为空，如果非字符串参数，则抛出类型错误异常
 * @param  {String} str 带判断的字符串
 * @return {boolean}     如果为空返回true，否则返回false
 */
function utilStrIsEmpty(str) {
  if (str && !is('String', str)) {
    if(is('Function', _errorHandler)) {
      _errorHandler(`请确认给定参数: ${str} 是否为字符串`)
    }
    throw new Error(`请确认给定参数: ${str} 是否为字符串`)
  }
  return (!str || str.trim().length === 0)
}

function _CheckSign(isDebug) {
  return new Promise((resolve, reject) => {
    if (!utilStrIsEmpty(_appId) && !utilStrIsEmpty(_timestamp) && !utilStrIsEmpty(_nonceStr) && !utilStrIsEmpty(_signature)) {
      info(isDebug, `验签完成`)
      resolve('验签完成')
    } else {
      reject(new Error(`请核对验签参数`))
    }
  })
}

export const install = function (eventFunc, appId, timestamp, nonceStr, signature, errorHandler, isDebug) {
  // _event = eventFunc
  _appId = appId
  _timestamp = timestamp
  _nonceStr = nonceStr
  _signature = signature
  _errorHandler = errorHandler
  return _CheckSign(isDebug)
}
