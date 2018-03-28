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
  }
}

export const install = function (eventFunc) {
  _event = eventFunc
  return plugin
}
