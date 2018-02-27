import { install as jsBridgeContextProxyInit } from './js-bridge-context.js'
import { install as navigation } from './navigation.js'
import { install as share} from './share.js'
import { install as payment} from './payment.js'
import device from './util/device'

// 和业务相关，只需要判断一下几种类型
const isRunNative = (device.isAndroid || device.isAndroidPad || device.isIpad || device.isIphone)
/* eslint-disable */
export class JSBridge{
  constructor() {
  }

  static config({
    global = window,
    debug = true,
    errorHandler
  }){
    const jsBridge = new JSBridge()
    const brigePlugin = jsBridgeContextProxyInit({
      global,
      debug,
      runNative: isRunNative,
      jsBridge,
      errorHandler
    })
    alert(2)
    navigation(jsBridge, brigePlugin, {debug})
    // share(jsBridge, brigePlugin, {debug})
    // payment(jsBridge, brigePlugin, {debug})
    return jsBridge
  }

}
