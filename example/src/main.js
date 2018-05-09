import Vue from 'vue'
import App from './App.vue'
// 针对es模块系统构建的版本*ynrcc-mobilebank-jssdk.mjs*使用方式
import {JSBridge} from 'JSBridge'
import * as SHA from './assets/js/SHA1'
// 模拟客户端向浏览器中注入ViewPlus对象
// window.YnrccJSBridge = {
//   event(command){
//     /* eslint-disable no-console */
//     console.log(`模拟客户端注入对象被调用：`, command)
//     return JSON.stringify({
//       ReturnCode: '000000',
//       ReturnMsg: '模拟客户端返回成功消息'
//     })
//   }
// }
/* eslint-disable */
console.log(`针对es模块系统构建的版本*ynrcc-mobilebank-jssdk.mjs*使用方式: ${JSBridge} \n`)
const obj = {
  appid: '123456',
  timestamp: '98765412352',
  noncestr: '666666',
  token: '5452652',
  url: ''
}
const signature = SHA.SHA1(SHA.orgSHA1SignSrc(SHA.objToArrayAndSortByASCII(obj), obj))
console.log(`签名：${signature}`)
signature.indexOf()
let jsBridge = null
JSBridge.config({
  global: window,
  debug: true,
  appId: '123456',
  timestamp: '98765412352',
  nonceStr: '666666',
  signature: signature,
  url: '',
  errorHandler(err) {
    console.error(`errorHandler ${JSON.stringify(err)} ${err.message}`)
    alert('errorHandler ' + err.message)
  }
}).then((bridge) => {
  jsBridge = bridge
  Vue.prototype.jsBridge = jsBridge
  console.log(`配置得到jsBridge: ${JSON.stringify(jsBridge)}`, jsBridge)
}).catch(err => {
  alert('config err' + err.message)
})

new Vue({
  el: '#app',
  render: h => h(App),
  mounted() {
    //do something after mounting vue instance
    // 模拟调用测试：
    // jsBridge.goBack()
  }
})
