let _event

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
   * 三方监听手机银行客户端登录情况
   * params{needSignIn}是否拉起登录(true 是 false 否)
   * @returns {*}
   */
  doOAuthAndListenerSignIn({needSignIn = false} = {}) {
    return new Promise((resolve, reject) => {
      window.oAuthListener = (res) => {
        try {
          const temp = window.JSON.parse(res)
          if (temp.ReturnCode === '000000') {
            resolve(temp)
            window.updateLoginState = null
          } else {
            reject(temp)
            window.updateLoginState = null
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
      })
    })
  }
}

export const install = function (eventFunc) {
  _event = eventFunc
  return plugin
}
