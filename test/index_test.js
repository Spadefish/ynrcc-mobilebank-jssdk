import 'babel-polyfill'
/* setup.js https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md */
const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {})
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36',
}
copyProps(window, global)

import {expect} from 'chai'
const JSBridge = require('../lib').JSBridge

/* eslint-disable no-console */
describe('连通性测试', () => {

    let jsBridge = null
    before(function () {
      // 模拟客户端注入的YnrccJSBridge 仅做连通性测试
      window.JSON = {
        parse() {
          return {
            ReturnCode: '000000'
          }
        },
        stringify() {}
      }
      JSBridge.config({
        global: {
          YnrccJSBridge: {
            event: function () {
              return null
            }
          }
        },
        debug: true,
        appId: '123456',
        timestamp: '98765412352',
        nonceStr: '666666',
        signature: '234b913e4b9780adebff19a82e65eb6800809c16',
        url: 'https://www.baidu.com?params=value',
        errorHandler(err){
          console.log(JSON.stringify(err))
        }
      }).then((bridge) => {
        jsBridge = bridge
      }).catch(err => {
        console.log(JSON.stringify(err))
      })
    })

    it('测试正常情况', () => {
      console.log(jsBridge)
      jsBridge.closeWindow().then((res)=>{
        console.log('1111', res);
        expect(res['ReturnCode']).to.be.equal('000000')
      })
    })
})

describe('连通性测试', () => {

    let jsBridge = null
    before(function () {
      // 模拟客户端注入的YnrccJSBridge 仅做连通性测试
      window.JSON = {
        parse() {
          return {
            ReturnCode: 'time_out',
            ReturnMsg: '请求超时'
          }
        },
        stringify() {}
      }
      JSBridge.config({
        global: {
          YnrccJSBridge: {
            event: function () {
              return null
            }
          }
        },
        debug: true,
        appId: '123456',
        timestamp: '98765412352',
        nonceStr: '666666',
        signature: '234b913e4b9780adebff19a82e65eb6800809c16',
        url: 'https://www.baidu.com?params=value',
        errorHandler(err){
          console.log(JSON.stringify(err))
        }
      }).then((bridge) => {
        jsBridge = bridge
      }).catch(err => {
        console.log(JSON.stringify(err))
      })
    })

    it('测试业务返回非000000情况', () => {
      jsBridge.closeWindow().catch((err)=>{
        expect(err['ReturnCode']).to.be.equal('time_out')
      })
    })
})


describe('连通性测试', () => {

    let jsBridge = null
    before(function () {
      // 模拟客户端注入的YnrccJSBridge 仅做连通性测试
      window.JSON = {
        parse() {
          throw new SyntaxError('Unexpected token u in JSON at position 0')
        },
        stringify() {}
      }
      JSBridge.config({
        global: {
          YnrccJSBridge: {
            event: function () {
              return null
            }
          }
        },
        debug: true,
        appId: '123456',
        timestamp: '98765412352',
        nonceStr: '666666',
        signature: '234b913e4b9780adebff19a82e65eb6800809c16',
        url: 'https://www.baidu.com?params=value',
        errorHandler(err){
          console.log(JSON.stringify(err))
        }
      }).then((bridge) => {
        jsBridge = bridge
      }).catch(err => {
        console.log(JSON.stringify(err))
      })
    })

    it('模拟客户端返回json字符串格式有误的情况', () => {
      jsBridge.closeWindow().catch((err)=>{
        // expect(err).to.throw(SyntaxError)
        expect(err['ReturnCode']).to.be.equal('parse_client_res_err')
      })
    })
})
