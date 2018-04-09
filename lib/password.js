/* eslint-disable */
import { is } from './util/type'
let _event

/**
 * 分享相关的工具模块
 */
const plugin = {
  modelName: 'password',
  /**
   * 调起密码键盘
   * @param inputDom  输入框的dom元素
   * @param  {String}   [name=''] 键盘唯一标识，在同一个视图，如果调起两个键盘，该name必须区分开
   * @param  {Number}   [needrandom=0]             是否随机 0 标识不需要随机，1 标识随机
   * @param  {Number}   [needhint=0]               1有按钮回显
   * @param  {Number}   [useletter=1]              默认初始化的显示的键盘类型（1.字母、2.数字、3.字符）
   */
  showPwdKeyboard(inputDom, name, {needrandom = '1', needhint = '1', useletter = '1'} = {}) {
    // 先检查是否有初始化键盘监听回调
    // 点击字符数字字母的回调 'tapcharacter'/ 点击删除按键 'tapdelete'/ 点击ok: level(安全级别：S:高 M:中 W:弱 error: 不够最低要求位数 'tapok':
    return new Promise((resolve, reject) => {
      if (typeof inputDom === 'object' && name.trim().length > 0) {
        window.keyboardOnTap = (data) => {
          try {
            const res = JSON.parse(data)
            switch (res.eventName) {
              // 点击字符数字字母的回调
              case 'tapcharacter':
                inputDom.value += '*'
                break
              // 点击删除按键
              case 'tapdelete':
                if (inputDom.value.length > 0) {
                  inputDom.value = inputDom.value.substring(0, inputDom.value.length - 1)
                }
                break
              default:
            }
          } catch (e) {
            reject(new Error(`客户端响应键盘TAP通知事件解析数据出错：${e.message}`))
          }
        }
        const command = {
          event: 'PasswordKeyboardEvent',
          action: 'showKeyboard',
          params: {
            name,
            needrandom,
            needhint,
            useletter
          },
          listener: 'keyboardOnTap'
        }
        _event(command)
      } else {
        reject(new Error(`调用密码键盘参数不匹配`))
      }
    })
  },
  /**
   * 获取密文
   * @param  {Array} name      密码控件唯一标示数组['pwd1', 'pwd2', 'pwd3']
   * @param  {String} timestamp 时间戳
   * @return {String}           密文
   */
  getEncrypt(name, timestamp) {
    return new Promise((resolve, reject) => {
      if (timestamp.trim().length > 0 && Array.isArray(name)) {
        const command = {
          event: 'PasswordKeyboardEvent',
          action: 'encryptForName',
          params: {
            name,
            timestamp
          }
        }
        _event(command).then(res => {
          resolve(res)
        }).catch(() => {
          reject(new Error(`客户端响应[获取密码]通知事件出错`))
        })
      } else {
        reject(new Error(`调用获取密码密文接口参数不匹配`))
      }
    })
  },
  /**
   * 清除密码
   * @param inputDom 输入框的dom元素
   * @param name  键盘唯一标识，在同一个视图，如果调起两个键盘，该name必须区分开
   * @returns {Promise}
   */
  onTapClearKeyboardEncrypt(inputDom, name) {
    return new Promise((resolve, reject) => {
      if (typeof inputDom === 'object' && name.trim().length > 0) {
        const command = {
          event: 'PasswordKeyboardEvent',
          action: 'putCharToEncryptor',
          params: {
            name: name,
            type: 'clear'
          }
        }
        _event(command).then(() => {
          inputDom.value = ''
        }).cache(() => {
          reject(new Error(`客户端响应[清除密码]通知事件出错`))
        })
      } else {
        reject(new Error(`调用清除密码接口参数不匹配`))
      }
    })
  },
  /**
   * 获取设备信息
   */
  getMobileDeviceInfo() {
    return new Promise((resolve, reject) => {
      const command = {
        event: 'DeviceEvent',
        action: 'getMobileDevice'
      }
      _event(command).then(res => {
        resolve(res)
      }).catch(() => {
        reject(new Error(`客户端响应[获取设备信息]通知事件出错`))
      })
    })
  },
}

export const install = function (eventFunc) {
  _event = eventFunc
  return plugin
}
