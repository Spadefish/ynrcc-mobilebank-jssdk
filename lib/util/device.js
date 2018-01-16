const ua = navigator.userAgent
const isAndroid = /(Android);?[\s/]+([\d.]+)?(.*Mobile)/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)
const isAlipay = /alipayclient/i.test(ua)
const isAndroidPad = /^(?!.*Mobile).*(Android);?[\s/]+([\d.]+)?/.test(ua)

export default{
  isAndroid,
  isIpad,
  isIpod,
  isIphone,
  isWechat,
  isAlipay,
  isAndroidPad
}
