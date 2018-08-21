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
  },
  /**
   * 通知客户端加载完毕
   * @returns {*}
   */
  H5Loaded() {
    _event({
      event: 'LifeCycleEvent',
      action: 'napiH5Loaded'
    })
  }
}

export const install = function (eventFunc) {
  _event = eventFunc
  // 通知客户端加载完成
  plugin.H5Loaded()
  return plugin
}

