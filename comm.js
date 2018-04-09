/* eslint-disable */
/**
 *
 */
const timestamp = new Date().getTime().toString();
const obj = {
  appId: '8afa56642d7049679ea984eaefb6d854',
  timestamp: timestamp,
  nonceStr: '9999',
  token: '157e30fd36cc13075cd90ca390ac8ec8',
  url: ''
}
const signature = orgSHA1SignSrc(objToArrayAndSortByASCII(obj), obj)
console.log(signature)
let jsBridge = null
  ynrcc.JSBridge.config({
    global: window,
    debug: true,
    appId: '8afa56642d7049679ea984eaefb6d854',
    timestamp: timestamp,
    nonceStr: '9999',
    signature: signature,
    errorHandler(err){
      alert(JSON.stringify(err))
    }
  }).then((bridge) => {
    jsBridge = bridge
  }).catch(err => {
    alert(JSON.stringify(err))
  })

/**
 * 返回到手机银行
 * @returns
 */
  function backToApp() {
    jsBridge.closeWindow();
  }

/**
 * 调用客户端密码键盘
 * @param dom 输入框dom对象
 * @param name 密码唯一标识
 * @returns
 */
  function showPwdKeyboard(dom, name) {
    document.activeElement.blur();
    jsBridge.showPwdKeyboard(document.getElementById("pwd"), "password");
  }
  /**
   * 获取密文
   * @param name 密码唯一标识
   * @param timestamp 时间戳
   * @returns
   */
  function getPwdEncrypt(name, timestamp) {
	  return jsBridge.getEncrypt(name, timestamp)
  }
  /**
   * 清除密码
   * @param dom 输入框dom对象
   * @param name 密码唯一标识
   * @returns
   */
  function clearPwd(dom, name) {
    jsBridge.onTapClearKeyboardEncrypt(dom, name)
  }
