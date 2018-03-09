import {install as jsBridgeContextProxyInit} from './js-bridge-context.js'
import {install as check} from './check'
import {install as navigation} from './navigation.js'
import {install as share} from './share.js'
import {install as user} from './user.js'
import device from './util/device'
// 和业务相关，只需要判断一下几种类型
const isRunNative = (device.isAndroid || device.isAndroidPad || device.isIpad || device.isIphone)

export class JSBridge {
  constructor() {
  }

  static config({
                  global = window,
                  debug = false,
                  appId,
                  timestamp,
                  nonceStr,
                  signature,
                  errorHandler
                }) {
    const jsBridge = new JSBridge()
    const eventFunc = jsBridgeContextProxyInit({
      global,
      debug,
      runNative: isRunNative,
      jsBridge,
      errorHandler
    })

    return new Promise((resolve, reject) => {
      check(eventFunc, appId, timestamp, nonceStr, signature, errorHandler, {debug}).then(() => {
        navigation(jsBridge, eventFunc, {debug})
        share(jsBridge, eventFunc, {debug})
        user(jsBridge, eventFunc, {debug})
        // payment(jsBridge, eventFunc, {debug})
        resolve(jsBridge)
      }).catch(err => {
        reject(err)
      })
    })
  }

}
