import {is} from './util/type'
import device from './util/device'
import {emitErr} from './util/warn'

export class JsBridgeError extends Error {
  constructor(message, code) {
    super()
    this.message = message
    this.stack = (new Error()).stack
    this.name = this.constructor.name
    this.code = code
  }
}

let _jsContext, _global

function _handlerResp(res, resolve, reject) {
  try {
    const temp = window.JSON.parse(res)
    if (temp.ReturnCode === '000000') {
      resolve(temp)
    } else {
      reject(temp)
    }
  } catch (e) {
    emitErr(new JsBridgeError(`解析客户端返回的结果出错[${e.message}]`, 'PARSE_ANDROID_RES_ERR'), reject, true)
  }
}

/**
 * 前端和客户端交互的工具方法集（支持的是客户端使用包括上下文的方式）
 */
const plugin = {
  CAN_USE_JSBRIDGE_CONTEXT: true,
  /**
   * 协议方式请求客户端
   * @param  {Object} [command=null] 客户端所需的调用消息
   * command的格式：
   *  const command = {
   *    event: 'test',
   *    action: 'TestCallBack',
   *    params: {
   *      number1,
   *      number2
   *    }
   *  }
   */
  cnEvent(command = null) {
    if (!this.CAN_USE_JSBRIDGE_CONTEXT) {
      const err = new JsBridgeError('上下文桥接方式当前不支持，请确认当前运行环境和配置', 'NOT_SUPPORT_CONTEXT_JSBRIDGE')
      emitErr(err)
      return Promise.reject(err)
    } else {
      return new Promise((resolve, reject) => {
        if (!is('Object', command)) {
          emitErr(new JsBridgeError('指令不是一个有效的对象', 'COMMAND_IS_NOT_AN_OBJ'), reject)
        } else {
          try {
            if (device.isAndroid || device.isAndroidPad) {
              // android 参考webView.evaluateJavascript方法
              // TODO event 是硬编码
              const res = _jsContext.event(window.JSON.stringify(command))
              _handlerResp(res, resolve, reject)
            } else if (device.isIphone || device.isIpod || device.isIpad) {
              const callBackName = `__callback__${new Date().getTime() + (Math.random() * 10).toFixed(5).toString().replace('.', '')}`
              _global[callBackName] = function (res) {
                _handlerResp(res, resolve, reject)
                _global[callBackName] = null
              }
              const p = {...{callback: callBackName}, ...command}
              // TODO postMessage 是硬编码
              _jsContext.postMessage(window.JSON.stringify(p))
            } else {
              emitErr(new JsBridgeError('不支持当前运行环境', 'RUN_EVN_NOT_SUPPORT'), null, true)
            }
          } catch (e) {
            // 这里需要捕获一些，客户端没有捕获到的抛出来的异常：
            // 如：[INFO:CONSOLE(90)] "Uncaught Error: Java exception was raised during method invocation", source: file:///android_asset/test.html (90)
            switch (e.message) {
              case "Cannot read property 'event' of undefined":
                plugin.CAN_USE_JSBRIDGE_CONTEXT = false
                break
              default:
            }
            emitErr(new JsBridgeError('请求客户端出错', `CLINET_THROW_ERROR:${e.message}`), reject)

          }
        }
      })
    }
  }
}

export const install = function ({
                                   global = window,
                                   runNative = false,
                                   jsBridge: {
                                     context: {
                                       name = 'YnrccJSBridge'
                                     } = {}
                                   } = {}
                                 } = {}) {
  if (runNative) {
    _global = global
    if (device.isIpad || device.isIphone || device.isIpod) {
      if (!global.webkit || !global.webkit.messageHandlers) {
        emitErr(new JsBridgeError('IOS客户端没有配置上下文执行环境', 'CLIENT_ENV_NOT_SUPPORT_WEBKIT_OR_WEBKIT_MESSAGEHANDLERS'), null, true)
        plugin.CAN_USE_JSBRIDGE_CONTEXT = false
      } else {
        _jsContext = global.webkit.messageHandlers[name]
        if (!is('UserMessageHandler', _jsContext)) {
          emitErr(new JsBridgeError(`IOS客户端没有配置上下文:${name}`, 'IOS_NATIVE_CONTEXT_NOT_FOUND'), null, true)
          plugin.CAN_USE_JSBRIDGE_CONTEXT = false
        }
      }
    } else if (device.isAndroid || device.isAndroidPad) {
      _jsContext = global[name]
      if (!is('Object', _jsContext)) {
        emitErr(new JsBridgeError(`Android客户端没有配置上下文:${name}`, 'ANDROID_OS_NATIVE_CONTEXT_NOT_FOUND'), null, true)
        plugin.CAN_USE_JSBRIDGE_CONTEXT = false
      }
    } else {
      emitErr(new JsBridgeError('不支持当前运行环境', 'RUN_EVN_NOT_SUPPORT'), null, true)
      plugin.CAN_USE_JSBRIDGE_CONTEXT = false
    }
  } else {
    // ！没有跑在支持的运行设备
    emitErr(new JsBridgeError('不支持当前运行环境', 'RUN_EVN_NOT_SUPPORT'), null, true)
    plugin.CAN_USE_JSBRIDGE_CONTEXT = false
  }

  return plugin.cnEvent
}
