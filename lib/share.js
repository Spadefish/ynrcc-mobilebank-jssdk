import MixinPlugin from './util/mixin-plugin'

export const modelName = 'share'

let _event

/**
 * 和导航相关的工具模块
 */
const plugin = {
  shareToWeChart() {
    return _event({
     event: 'share',
     action: 'toWeChart'
    })
  }
}

export const install = function (global, eventFunc, {debug}) {
  _event = eventFunc
  MixinPlugin.mixin(global, plugin, modelName, debug)
}
