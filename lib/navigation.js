import MixinPlugin from './util/mixin-plugin'

export const modelName = 'navigation'

let _event
/* eslint-disable */
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
     event: 'navigation',
     action: 'popWebView'
    })
  },
  /**
   * 设置原生请求头
   * @param title 标题
   * @param visible 显示/隐藏
   * @returns {*}
   */
  setTitleBar(title = '', visible = false, bckBtnVisible = false) {
    console.log(visible)
    return _event({
      event: 'UI',
      action: 'setHeaderBarConfig',
      params: {
        title,
        visible,
        bckBtnVisible
      }
    })
  },
  /**
   * 通知客户端h5加载完毕
   * @returns {*}
   */
  h5loaded() {
    return _event({
      event: 'navigation',
      action: 'napiH5Loaded'
    })
  }
}

export const install = function (global, eventFunc, {debug}) {
  _event = eventFunc
  MixinPlugin.mixin(global, plugin, modelName, debug)
}
