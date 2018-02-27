import MixinPlugin from './util/mixin-plugin'

export const modelName = 'payment'

let _event

/**
 * 支付相关的工具模块
 */
const plugin = {
  /* eslint-disable*/
  /**
   * 拉取支付页面
   * @param transCode 交易码
   * @param trsParams 支付交易所需的参数
   * @param payInfo 需显示给用户的确认支付信息, 限制长度为3
   * @returns {Promise}
   */
  pullPayPage(transCode,trsParams, payInfo) {
    return new Promise((resolve, reject) => {
      if (typeof transCode != 'string') {
        reject(new Error('参数[transCode]类型不匹配'))
      }
      if (typeof trsParams !== 'object' || (typeof trsParams === 'object' && !Object.keys(trsParams).length > 0)) {
        reject(new Error('参数[trsParams]类型不匹配'))
      } else if (typeof payInfo !== 'object' || (typeof payInfo === 'object' && payInfo.length > 3)) {
        reject(new Error('参数[payInfo]类型不匹配或长度最大于3'))
      } else {
        let hasAmount = true
        for (const item of payInfo) {
          if (item.amout) {
            hasAmount = true
            break
          } else {
            hasAmount = false
          }
        }
        if (hasAmount) {
          window.payResult = (res) => {
            _handlerResp(res, resolve, reject)
          }
          _event({
            event: 'payment',
            action: 'pullPayPage',
            params: {
              payInfo: payInfo,
              trsParams: trsParams,
              transCode: transCode
            },
            listener: 'payResult'
          })
        } else {
          reject(new Error('参数[payInfo]类型不匹配,缺少键值为[amount]的项'))
        }
      }
    })
  }
}

export const install = function (global, eventFunc, {debug}) {
  _event = eventFunc
  MixinPlugin.mixin(global, plugin, modelName, debug)
}
