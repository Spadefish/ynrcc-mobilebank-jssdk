import {install as jsBridgeContextProxyInit} from './js-bridge-context.js'
import {init as errorHandlerConfig} from './util/warn'
import {install as check} from './check'
import {install as navigation} from './navigation.js'
// import {install as share} from './share.js'
import {install as user} from './user.js'
import device from './util/device'
import MixinPlugin from "./util/mixin-plugin"
import {init as http} from './util/http'
// 和业务相关，只需要判断一下几种类型
const isRunNative = (device.isAndroid || device.isAndroidPad || device.isIpad || device.isIphone)

const userAgent = navigator.userAgent
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

    http(eventFunc)

    return new Promise((resolve, reject) => {
      // 安卓老版本(UserAgent为1.0.0)不验证签名
      if (userAgent.indexOf('VIEW_PLUS_ANDROID/1.0.0') !== -1) {
        const plugins = [navigation(eventFunc), user(eventFunc, appId)]
        MixinPlugin.mixin(jsBridge, plugins)
        resolve(jsBridge)
      } else {
        check(eventFunc, appId, timestamp, nonceStr, signature, url).then(() => {
          const plugins = [navigation(eventFunc), user(eventFunc, appId)]
          MixinPlugin.mixin(jsBridge, plugins)
          resolve(jsBridge)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
}
