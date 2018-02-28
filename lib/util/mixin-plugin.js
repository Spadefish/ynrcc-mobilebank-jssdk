import { info } from './warn'
/* eslint-disable */
export default class MixinPlugin {
  static mixin(global, plugin, modelName, isdebug) {
    info(isdebug, `混合${modelName}模块开始`)
    Object.keys(plugin).forEach(function (key){
        Object.defineProperty(global, key, {
          enumerable: false,
          configurable: false,
          writable: false,
          value: plugin[key]
        });
    })
    console.log('global: ->', global)
    info(isdebug, `混合${modelName}模块完成`)
  }
}
