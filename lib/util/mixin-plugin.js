import {info} from './warn'

export default class MixinPlugin {
  static mixin(global, plugins) {
    plugins.forEach((plugin) => {
      let modelName = plugin.modelName
      info(`混合${modelName}模块开始`)
      Object.keys(plugin).forEach(function (key) {
        if (key !== 'modelName') {
          Object.defineProperty(global, key, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: plugin[key]
          })
        }
      })
      info(`混合${modelName}模块完成`)
    })
  }
}

