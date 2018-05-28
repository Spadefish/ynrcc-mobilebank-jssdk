import {base64} from './Base64'
let _event
export const dict = {
  statusCodeKey: 'ReturnCode',
  statusCodeSuccess: '000000',
  msgKey: 'ReturnMessage'
}
let userAgent = navigator.userAgent

export function httpRequest(transcode, params) {
  return new Promise((resolve, reject) => {
    window.getRequestRes = (res) => {
      try {
        let temp = null
        // ios 3.04/ android 3.05 设置了userAgent,代理请求返回base64编码串
        if (userAgent.indexOf('VIEW_PLUS') !== -1) {
          if (userAgent.indexOf('VIEW_PLUS_ANDROID/1.0.0') !== -1) {
            temp = JSON.parse(res)
          } else {
            temp = JSON.parse(base64.decode(res))
          }
        } else {
          temp = JSON.parse(res)
        }
        if (temp[dict.statusCodeKey] === dict.statusCodeSuccess) {
          resolve(temp)
        } else {
          const errMsg = base64.decode(temp[dict.msgKey])
          temp.ReturnMessage = errMsg
          reject(temp)
        }
      } catch (e) {
        reject({
          ReturnCode: 'parse_client_res_err',
          ReturnMessage: `解析客户端返回的字符串出错，错误消息：${e.message}`
        })
      }
    }
    const command = {
      event: 'AjaxEvent',
      action: 'sendOriginalRequest',
      listener: 'getRequestRes',
      params: {
        transcode,
        params,
      }
    }
    _event(command)
  })
}

export function init(eventFunc) {
  _event = eventFunc
}
