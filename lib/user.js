let _statusCodeSuccess, _event

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
    return _event({
      event: 'UserInfoManageEvent',
      action: 'getUserInfo'
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

export const install = function (eventFunc, {
  statusCodeSuccess
}) {
  _statusCodeSuccess = statusCodeSuccess
  _event = eventFunc
  return plugin
}
