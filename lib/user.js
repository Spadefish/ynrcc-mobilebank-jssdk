import MixinPlugin from './util/mixin-plugin'

export const modelName = 'user'

let _event

/**
 * 和导航相关的工具模块
 */
const plugin = {
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

export const install = function (global, eventFunc, {debug}) {
  _event = eventFunc
  MixinPlugin.mixin(global, plugin, modelName, debug)
}
