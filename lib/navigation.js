import MixinPlugin from './util/mixin-plugin'

export const modelName = 'navigation'
let _event
/**
 * 和导航相关的工具模块
 */
const plugin = {
  /**
   * 关闭当前窗口
   * @returns {*}
   */
  closeWindow() {
    return _event({
     event: 'NavigationEvent',
     action: 'popWebView'
    })
  },
  /**
   * 设置原生请求头
   * @param title 标题
   * @param visible 显示/隐藏
   * @returns {*}
   */
  setTitleBar({title = '标题', visible = false}) {
    return _event({
      event: 'UIEvent',
      action: 'setHeaderBarConfig',
      params: {
        title,
        visible
      }
    })
  },
  // /**
  //  * 通知客户端h5加载完毕
  //  * @returns {*}
  //  */
  // h5loaded() {
  //   return _event({
  //     event: 'navigation',
  //     action: 'napiH5Loaded'
  //   })
  // }
}

export const install = function (global, eventFunc, {debug}) {
  _event = eventFunc
  MixinPlugin.mixin(global, plugin, modelName, debug)
}
