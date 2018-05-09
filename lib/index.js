import {install as jsBridgeContextProxyInit} from './js-bridge-context.js'
import {init as errorHandlerConfig} from './util/warn'
import {install as check} from './check'
import {install as navigation} from './navigation.js'
// import {install as share} from './share.js'
import {install as user} from './user.js'
import device from './util/device'
import MixinPlugin from "./util/mixin-plugin";
// 和业务相关，只需要判断一下几种类型
const isRunNative = (device.isAndroid || device.isAndroidPad || device.isIpad || device.isIphone)

const dict = {
  statusCodeKey: 'ReturnCode',
  statusCodeSuccess: '000000',
  msgKey: 'ReturnMessage'
}

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
                  url,
                  errorHandler
                }) {

    errorHandlerConfig(debug, errorHandler)

    const jsBridge = new JSBridge()

    const eventFunc = jsBridgeContextProxyInit({
      global,
      runNative: isRunNative,
      jsBridge
    })

    return new Promise((resolve, reject) => {
      check(eventFunc, appId, timestamp, nonceStr, signature, url, errorHandler, {debug}).then((res) => {
        const plugins = [navigation(eventFunc, dict), user(eventFunc, res.level, dict )]
        MixinPlugin.mixin(jsBridge, plugins)
        resolve(jsBridge)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
