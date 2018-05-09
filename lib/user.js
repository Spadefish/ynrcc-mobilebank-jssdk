let _statusCodeSuccess, _event,
  _ruleLevel /*权限等级：0:最高权限 1：（不包含身份证号和手机号） */


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
      _event({
        event: 'UserInfoManageEvent',
        action: 'getUserInfo'
      }).then(res => {
        switch (_ruleLevel) {
          case 0 :
            resolve(res)
            break
          case 1 :
            delete res.userInfo.UserIdType
            delete res.userInfo.UserIdNo
            delete res.userInfo.MobilePhoneEncrypt
            resolve(res)
        }
      }).catch((err) => {
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
            if (temp.ReturnCode === _statusCodeSuccess) {
              resolve(temp)
            } else {
              reject(temp)
            }
            window.updateLoginState = null
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

export const install = function (eventFunc, ruleLevel, {
  statusCodeSuccess
}) {
  _statusCodeSuccess = statusCodeSuccess
  _event = eventFunc
  _ruleLevel = typeof (ruleLevel) === 'undefined' ? 1 : ruleLevel
  return plugin
}
