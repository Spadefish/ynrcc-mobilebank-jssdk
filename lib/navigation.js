import MixinPlugin from './util/mixin-plugin'

export const modelName = 'navigation'

let _event

/**
 * 和导航相关的工具模块
 */
const plugin = {
  goBack() {
    _event({
     event: 'navigation',
     action: 'popWebView'
    })
  }
}

export const install = function (global, eventFunc, {debug}) {
  _event = eventFunc
  MixinPlugin.mixin(global, plugin, modelName, !debug)
}
