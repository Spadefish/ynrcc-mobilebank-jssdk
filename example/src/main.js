import Vue from 'vue'
import App from './App.vue'
// 针对es模块系统构建的版本*ynrcc-mobilebank-jssdk.mjs*使用方式
import {JSBridge} from 'JSBridge'

// 模拟客户端向浏览器中注入ViewPlus对象
window.ViewPlus = {
  event(command){
    /* eslint-disable no-console */
    console.log(`模拟客户端注入对象被调用：`, command)
    return JSON.stringify({
      ReturnCode: '000000',
      ReturnMsg: '模拟客户端返回成功消息'
    })
  }
}

/* eslint-disable no-console */
console.log(`针对es模块系统构建的版本*ynrcc-mobilebank-jssdk.mjs*使用方式: ${JSBridge} \n`)
const jsBridge = JSBridge.config({
  global: window,
  debug: true
})

console.log(`配置得到jsBridge: ${jsBridge}`, jsBridge)
new Vue({
  el: '#app',
  render: h => h(App),
  mounted() {
    //do something after mounting vue instance
    // 模拟调用测试：
    jsBridge.goBack()
  }
})
