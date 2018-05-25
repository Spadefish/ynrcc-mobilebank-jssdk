import {dict, httpRequest} from './util/http'

let _event,
  _appId /* 第三方唯一识别嘛 */

export function noticeClientLoginState({status = false, needNotice = false} = {}) {
  _event({
    event: 'UserInfoManageEvent',
    action: 'userStateChange',
    params: {
      status,
      needNotice
    }
  })
}
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
      httpRequest('GetUserInfoForSdk.do', {appId: _appId}).then(res => {
        resolve(res)
      }).catch(err => {
        if (err.ReturnCode === 'role.invalid_user' || err.ReturnCode === 'validation.user.force.logout.exception') {
          err.ReturnCode = '444444'
          err.ReturnMessage = '用户未登录或者会话已超时'
          noticeClientLoginState({needNotice: true})
        }
        reject(err)
      })
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
              ReturnMessage: `解析客户端返回的字符串出错，错误消息：${e.message}`
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
