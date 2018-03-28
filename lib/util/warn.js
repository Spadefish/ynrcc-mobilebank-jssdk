import { PLUGIN_CONSOLE_LOG_FLAG } from '../gloabl-dict'
import {is} from './type'

/* eslint-disable no-console */
let _isdebug, _errorHandler
export function info(message) {
  if (_isdebug) {
    typeof console !== 'undefined' && console.info(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function warn(message) {
  if (_isdebug) {
    typeof console !== 'undefined' && console.warn(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function emitErr(errMsg, reject, isInstall = false) {
  if (is('Function', reject)) {
    reject(errMsg)
  }
  if (is('Function', _errorHandler)) {
    _errorHandler(errMsg)
  } else {
    if (isInstall) {
      warn(is('String', errMsg) ? errMsg : errMsg.message)
    } else {
      assert(is('String', errMsg) ? errMsg : errMsg.message)
    }
  }
}

export function assert(message) {
  if (is('Function', _errorHandler)) {
    _errorHandler(new Error(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`))
  }
  if (_isdebug) {
    throw new Error(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function init(
  isdebug,
  /* 指定和客户端交互过程中抛出的错误的处理函数。应用可以使用该函数来统一处理非业务级别的公共错误消息。 */
  errorHandler) {
  _isdebug = isdebug
  _errorHandler = errorHandler
  if (_isdebug) {
    warn('您配置为debug模式，插件将会输出一些调试信息，建议上线前关闭调试')
  }
}

