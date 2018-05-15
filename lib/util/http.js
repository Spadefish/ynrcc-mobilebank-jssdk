let _event
export const dict = {
  statusCodeKey: 'ReturnCode',
  statusCodeSuccess: '000000',
  msgKey: 'ReturnMessage'
}

export function httpRequest(transcode, params, listener) {
  const command = {
    event: 'AjaxEvent',
    action: 'sendOriginalRequest',
    listener,
    params: {
      transcode,
      params,
    }
  }
  _event(command)
}

export function init(eventFunc) {
  _event = eventFunc
}
