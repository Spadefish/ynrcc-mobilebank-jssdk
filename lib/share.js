import MixinPlugin from './util/mixin-plugin'

export const modelName = 'share'

let _event, _handlerResp

/**
 * 分享相关的工具模块
 */
const plugin = {
  shareToWeChat({link, title, description, imgUrl}) {
    return new Promise((resolve, reject) => {
      window.shareResult  = (res) => {
        _handlerResp(res, resolve, reject)
      }
      _event({
        event: 'share',
        action: 'shareToWechat',
        params: {
          linkUrl: link,
          title: title,
          description: description,
          thumbImageURL: imgUrl
        },
        listener: 'shareResult'
      })
    })
  }
}

export const install = function (global, brigePlugin, {debug}) {
  _event = brigePlugin.cnEvent
  _handlerResp = brigePlugin.handlerResp
  MixinPlugin.mixin(global, plugin, modelName, debug)
}
