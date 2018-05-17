import base64url from 'base64url'
import {dict, httpRequest} from './util/http'

let _event,
  _appId /* 第三方唯一识别嘛 */

/**
 * 和导航相关的工具模块
 */
const plugin = {
  modelName: 'user',
  /**
   * 获取登录用户信息
   * @returns {*}
   */
  getUserInfo() {
    return new Promise((resolve, reject) => {
      window.getUserInfoResult = (res) => {
        window.getUserInfoResult = null
        const temp = JSON.parse(res)
        if (temp[dict.statusCodeKey] === dict.statusCodeSuccess) {
          resolve(temp)
        } else {
          const errMsg = base64url.decode(temp[dict.msgKey])
          reject(new Error(errMsg))
        }
      }
      httpRequest('GetUserInfoForSdk.do', {appId: _appId}, 'getUserInfoResult')
    })
  },
  /**
   * 授权登录
   * params{needSignIn}是否拉起登录(true 是 false 否)
   * @returns {*}
   */
  oAuthSignIn({needSignIn = false} = {}) {
    return new Promise((resolve, reject) => {
      if (typeof needSignIn != 'boolean') {
        reject(new Error('参数[needSignIn]类型不匹配'))
      } else {
        window.oAuthListener = (res) => {
          try {
            const temp = window.JSON.parse(res)
            if (temp.ReturnCode === dict.statusCodeSuccess) {
              resolve(temp)
            } else {
              if (temp.ReturnCode === 'user_cancel_login') {
                temp.ReturnCode = '444444'
              }
              reject(temp)
            }
          } catch (e) {
            reject({
              ReturnCode: 'parse_client_res_err',
              ReturnMsg: `解析客户端返回的字符串出错，错误消息：${e.message}`
            })
          }
        }
        _event({
          event: 'NavigationEvent',
          action: 'oAuthAndListenerSignInStatus',
          listener: 'oAuthListener',
          params: {
            needSignIn: needSignIn
          }
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
}

export const install = function (eventFunc, appId) {
  _event = eventFunc
  _appId = appId
  return plugin
}
