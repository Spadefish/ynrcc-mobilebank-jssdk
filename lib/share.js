let _event

/**
 * 分享相关的工具模块
 */
const plugin = {
  modelName: 'share',
  shareToWeChat({link, title, description, imgUrl}) {
    return new Promise((resolve, reject) => {
      window.shareResult  = (res) => {
        try {
          const temp = window.JSON.parse(res)
          if(temp.ReturnCode === '000000'){
            resolve(temp)
          } else {
            reject(temp)
          }
        } catch (e) {
          reject({
            ReturnCode: 'parse_client_res_err',
            ReturnMessage: `解析客户端返回的字符串出错，错误消息：${e.message}`
          })
        }
      }
      _event({
        event: 'ShareEvent',
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

export const install = function (eventFunc) {
  _event = eventFunc
  return plugin
}
