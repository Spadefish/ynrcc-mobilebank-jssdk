let _event
/**
 * 和导航相关的工具模块
 */
const plugin = {
  modelName: 'navigation',
  /**
   * 关闭当前窗口
   * @returns {*}
   */
  closeWindow() {
    return _event({
     event: 'NavigationEvent',
     action: 'popWebView'
    })
  }
}

export const install = function (eventFunc) {
  _event = eventFunc
  return plugin
}

