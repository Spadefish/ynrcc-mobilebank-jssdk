import { PLUGIN_CONSOLE_LOG_FLAG } from '../gloabl-dict'
/* eslint-disable no-console */
export function assert(isdebug, message) {
  if (isdebug) {
    throw new Error(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function info(isdebug, message) {
  if (isdebug) {
    typeof console !== 'undefined' && console.info(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function warn(isdebug, message) {
  if (isdebug) {
    typeof console !== 'undefined' && console.warn(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function error(isdebug, message, err) {
  if (isdebug) {
    typeof console !== 'undefined' && console.error(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`) && console.error(err)
  }
}
