import { is } from './util/type'
import device from './util/device'

let _isNativeENV,
  /* 指定和客户端交互过程中抛出的错误的处理函数。应用可以使用该函数来统一处理非业务级别的公共错误消息。*/ _errorHandler,
  _jsContext

function _callErr(errMsg, reject) {
  reject(errMsg)
  if(is('Function', _errorHandler)) {
    _errorHandler(errMsg)
  }
}

function _handlerResp(res, resolve, reject){
  try {
    const temp = window.JSON.parse(res)
    if(temp.ReturnCode === '000000'){
      resolve(temp)
    } else {
      reject(temp)
    }
  } catch (e) {
    if(/[Unexpected token a in JSON]\w*/.test(e.message)){
      _callErr({
        ReturnCode: 'parse_client_res_err',
        ReturnMsg: `解析客户端返回的字符串出错，错误消息：${e.message}`
      }, reject)
    } else {
      _callErr({
        ReturnCode: 'handler_client_res_err',
        ReturnMsg: `处理客户端返回结果出错，错误消息：${e.message}`
      }, reject)
    }
  }
}

/**
 * 前端和客户端交互的工具方法集（支持的是客户端使用包括上下文的方式）
 */
const plugin = {

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
    return new Promise((resolve, reject) => {
      if (!is('Object', command)) {
        _callErr(new Error(`请求原生客户端错误,cmmand参数错误，为空`), reject)
      } else {
        if (_isNativeENV) {
          try {
            if (device.isAndroid || device.isAndroidPad) {
              // android 参考webView.evaluateJavascript方法
              // TODO event 是硬编码
              const res = _jsContext.event(window.JSON.stringify(command))
              _handlerResp(res, resolve, reject)
            } else if (device.isIphone || device.isIpod || device.isIpad) {
              const callBackName = `__callback__${new Date().getTime()}`
              global[callBackName] = function (res) {
                _handlerResp(res, resolve, reject)
                global[callBackName] = null
              }
              const p = {...{callback: callBackName}, ...command}
              // TODO postMessage 是硬编码
              _jsContext.postMessage(window.JSON.stringify(p))
            } else {
              _callErr(new Error('暂不支持此客户端'), reject)
            }
          } catch (e) {
            // 这里需要捕获一些，客户端没有捕获到的抛出来的异常：
            // 如：[INFO:CONSOLE(90)] "Uncaught Error: Java exception was raised during method invocation", source: file:///android_asset/test.html (90)
            // reject(new Error(`客户端抛出异常：${e.message}`))
            _callErr({
              ReturnCode: 'req_client_err',
              ReturnMsg: `请求客户端过程中出错，错误消息：${e.message}`
            }, reject)
          }
        } else {
          _callErr(new Error('当前运行环境没有设置为非浏览器模式'), reject)
        }
      }
    })
  }
}

export const install = function ({
  global = window,
  runNative = false,
  jsBridge: {
    context: {
      name = 'YnrccJSBridge'
    } = {}
  } = {},
  errorHandler = null
} = {}) {
  if (runNative) {
    _isNativeENV = runNative
    _errorHandler = errorHandler
    if (device.isIpad || device.isIphone || device.isIpod) {
      if (!global.webkit || !global.webkit.messageHandlers) {
        throw new Error(`浏览器中不支持global.webkit:${global.webkit} 或者global.webkit.messageHandlers：${global.webkit.messageHandlers}`)
      }
      _jsContext = global.webkit.messageHandlers[name]
      if (!is('UserMessageHandler', _jsContext)) {
        throw new Error(`IOS OS浏览器中没有注入需要的客户端上下文对象：${name}`)
      }
    } else if (device.isAndroid || device.isAndroidPad) {
      _jsContext = global[name]
      if (!is('Object', _jsContext)) {
        throw new Error(`Android OS 浏览器中没有注入需要的客户端上下文对象：${name}`)
      }
    } else {
      throw new Error(`暂不支持此运行环境`)
    }
  }

  return plugin.cnEvent
}
