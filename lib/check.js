import { is } from './util/type'
import { info, assert } from './util/warn'
import {base64} from './util/Base64'
import {dict, httpRequest} from './util/http'
let _appId,// 唯一标识
  _timestamp,// 生成签名的时间戳
  _nonceStr,// 生成签名的随机串
  _signature,// 签名
  _url

/**
 * 判断一个字符串是否为空，如果非字符串参数，则抛出类型错误异常
 * @param  {String} str 带判断的字符串
 * @return {boolean}     如果为空返回true，否则返回false
 */
function _strIsEmpty(str) {
  if (str && !is('String', str)) {
    assert(`请确认给定参数值 ${str} 是否为字符串`)
  }
  return (!str || str.trim().length === 0)
}

function checkSign() {
  return new Promise((resolve, reject) => {
    if (!_strIsEmpty(_appId) && !_strIsEmpty(_timestamp) && !_strIsEmpty(_nonceStr) && !_strIsEmpty(_signature)) {
      window.getCheckResult = (res) => {
        const temp = JSON.parse(res)
        if (temp[dict.statusCodeKey] === dict.statusCodeSuccess) {
          info('验签完成')
          resolve(temp)
        } else {
          const errMsg = base64.decode(temp[dict.msgKey])
          assert(errMsg)
          temp.ReturnMessage = errMsg
          reject(temp)
        }
      }
      const params = {
        appId: _appId,
        timestamp: _timestamp,
        nonceStr: _nonceStr,
        signature: _signature,
        url: _url
      }
      httpRequest('ThridJsAccessControl.do', params, 'getCheckResult')
    } else {
      reject(new Error(`config err:请核对验签参数`))
    }
  })
}

export const install = function (eventFunc, appId, timestamp, nonceStr, signature, url) {
  _appId = appId
  _timestamp = timestamp
  _nonceStr = nonceStr
  _signature = signature
  _url = url
  return checkSign()
}
