import { PLUGIN_CONSOLE_LOG_FLAG } from '../gloabl-dict'
/* eslint-disable no-console */
export function assert(isprod, message) {
  if (!isprod) {
    throw new Error(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function info(isprod, message) {
  if (!isprod) {
    typeof console !== 'undefined' && console.info(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function warn(isprod, message) {
  if (!isprod) {
    typeof console !== 'undefined' && console.warn(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`)
  }
}

export function error(isprod, message, err) {
  if (!isprod) {
    typeof console !== 'undefined' && console.error(`${PLUGIN_CONSOLE_LOG_FLAG} ${message}`) && console.error(err)
  }
}
