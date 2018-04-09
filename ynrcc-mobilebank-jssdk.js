(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.ynrcc = global.ynrcc || {})));
}(this, (function (exports) { 'use strict';

/**
 * 判断值对应的类型
 * @param {String|Function}type 自定义对象需要传递类型，其他（String、Boolean、Number、Null、Undefined、Function、Date、Array、RegExp、Object）
 * @param {String|Boolean|Number|Null|Undefined|Function|Date|Array|RegExp|Object} val 待判断的值
 * @param  {Boolean} [isCustomType=false] 是否是自定义类型
 * @return {Boolean}                      预期类型匹配返回true，否则返回false
 */
function is(type, val) {
  var isCustomType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (type === 'NaN') {
    return isNaN(val);
  } else if (Object.prototype.toString.call(val) === '[object Object]' && type !== 'Object' && isCustomType) {
    return val instanceof type;
  } else {
    return Object.prototype.toString.call(val) === '[object ' + type + ']';
  }
}

var ua = navigator.userAgent;
var isAndroid = /(Android);?[\s/]+([\d.]+)?(.*Mobile)/.test(ua);
var isIpad = /(iPad).*OS\s([\d_]+)/.test(ua);
var isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua);
var isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
var isWechat = /micromessenger/i.test(ua);
var isAlipay = /alipayclient/i.test(ua);
var isAndroidPad = /^(?!.*Mobile).*(Android);?[\s/]+([\d.]+)?/.test(ua);

var device = {
  isAndroid: isAndroid,
  isIpad: isIpad,
  isIpod: isIpod,
  isIphone: isIphone,
  isWechat: isWechat,
  isAlipay: isAlipay,
  isAndroidPad: isAndroidPad
};

// log相关
var PLUGIN_CONSOLE_LOG_FLAG = '[ynrcc-jssdk]';

/* eslint-disable no-console */
var _isdebug = void 0;
var _errorHandler = void 0;
function info(message) {
  if (_isdebug) {
    typeof console !== 'undefined' && console.info(PLUGIN_CONSOLE_LOG_FLAG + ' ' + message);
  }
}

function warn(message) {
  if (_isdebug) {
    typeof console !== 'undefined' && console.warn(PLUGIN_CONSOLE_LOG_FLAG + ' ' + message);
  }
}

function emitErr(errMsg, reject) {
  var isInstall = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (is('Function', reject)) {
    reject(errMsg);
  }
  if (is('Function', _errorHandler)) {
    _errorHandler(errMsg);
  } else {
    if (isInstall) {
      warn(is('String', errMsg) ? errMsg : errMsg.message);
    } else {
      assert(is('String', errMsg) ? errMsg : errMsg.message);
    }
  }
}

function assert(message) {
  if (is('Function', _errorHandler)) {
    _errorHandler(new Error(PLUGIN_CONSOLE_LOG_FLAG + ' ' + message));
  }
  if (_isdebug) {
    throw new Error(PLUGIN_CONSOLE_LOG_FLAG + ' ' + message);
  }
}

function init(isdebug,
/* 指定和客户端交互过程中抛出的错误的处理函数。应用可以使用该函数来统一处理非业务级别的公共错误消息。 */
errorHandler) {
  _isdebug = isdebug;
  _errorHandler = errorHandler;
  if (_isdebug) {
    warn('您配置为debug模式，插件将会输出一些调试信息，建议上线前关闭调试');
  }
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var JsBridgeError = function (_Error) {
  inherits(JsBridgeError, _Error);

  function JsBridgeError(message, code) {
    classCallCheck(this, JsBridgeError);

    var _this = possibleConstructorReturn(this, (JsBridgeError.__proto__ || Object.getPrototypeOf(JsBridgeError)).call(this));

    _this.message = message;
    _this.stack = new Error().stack;
    _this.name = _this.constructor.name;
    _this.code = code;
    return _this;
  }

  return JsBridgeError;
}(Error);

var _jsContext = void 0;
var _global = void 0;
var canUseJsbridgeInterface = true;

function _handlerResp(res, resolve, reject) {
  try {
    var temp = window.JSON.parse(res);
    if (temp.ReturnCode === '000000') {
      resolve(temp);
    } else {
      reject(temp);
    }
  } catch (e) {
    emitErr(new JsBridgeError('\u89E3\u6790\u5BA2\u6237\u7AEF\u8FD4\u56DE\u7684\u7ED3\u679C\u51FA\u9519[' + e.message + ']', 'PARSE_ANDROID_RES_ERR'), reject, true);
  }
}

/**
 * 前端和客户端交互的工具方法集（支持的是客户端使用包括上下文的方式）
 */
var plugin = {
  /**
   * 协议方式请求客户端
   * @param  {Object} [command=null] 客户端所需的调用消息
   * command的格式：
   *  const command = {
   *    event: 'test',
   *    action: 'TestCallBack',
   *    params: {
   *      number1,
   *      number2
   *    }
   *  }
   */
  cnEvent: function cnEvent() {
    var command = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!canUseJsbridgeInterface) {
      var err = new JsBridgeError('上下文桥接方式当前不支持，请确认当前运行环境和配置', 'NOT_SUPPORT_CONTEXT_JSBRIDGE');
      emitErr(err);
      return Promise.reject(err);
    } else {
      return new Promise(function (resolve, reject) {
        if (!is('Object', command)) {
          emitErr(new JsBridgeError('指令不是一个有效的对象', 'COMMAND_IS_NOT_AN_OBJ'), reject);
        } else {
          try {
            if (device.isAndroid || device.isAndroidPad) {
              // android 参考webView.evaluateJavascript方法
              // TODO event 是硬编码
              var res = _jsContext.event(window.JSON.stringify(command));
              _handlerResp(res, resolve, reject);
            } else if (device.isIphone || device.isIpod || device.isIpad) {
              var callBackName = '__callback__' + (new Date().getTime() + (Math.random() * 10).toFixed(5).toString().replace('.', ''));
              _global[callBackName] = function (res) {
                _handlerResp(res, resolve, reject);
                _global[callBackName] = null;
              };
              var p = _extends({ callback: callBackName }, command);
              // TODO postMessage 是硬编码
              _jsContext.postMessage(window.JSON.stringify(p));
            } else {
              emitErr(new JsBridgeError('不支持当前运行环境', 'RUN_EVN_NOT_SUPPORT'), null, true);
            }
          } catch (e) {
            // 这里需要捕获一些，客户端没有捕获到的抛出来的异常：
            // 如：[INFO:CONSOLE(90)] "Uncaught Error: Java exception was raised during method invocation", source: file:///android_asset/test.html (90)
            switch (e.message) {
              case "Cannot read property 'event' of undefined":
                canUseJsbridgeInterface = false;
                break;
              default:
            }
            emitErr(new JsBridgeError('请求客户端出错', 'CLINET_THROW_ERROR:' + e.message), reject);
          }
        }
      });
    }
  }
};

var install = function install() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$global = _ref.global,
      global = _ref$global === undefined ? window : _ref$global,
      _ref$runNative = _ref.runNative,
      runNative = _ref$runNative === undefined ? false : _ref$runNative,
      _ref$jsBridge = _ref.jsBridge;

  _ref$jsBridge = _ref$jsBridge === undefined ? {} : _ref$jsBridge;
  var _ref$jsBridge$context = _ref$jsBridge.context;
  _ref$jsBridge$context = _ref$jsBridge$context === undefined ? {} : _ref$jsBridge$context;
  var _ref$jsBridge$context2 = _ref$jsBridge$context.name,
      name = _ref$jsBridge$context2 === undefined ? 'YnrccJSBridge' : _ref$jsBridge$context2;

  if (runNative) {
    _global = global;
    if (device.isIpad || device.isIphone || device.isIpod) {
      if (!global.webkit || !global.webkit.messageHandlers) {
        emitErr(new JsBridgeError('IOS客户端没有配置上下文执行环境', 'CLIENT_ENV_NOT_SUPPORT_WEBKIT_OR_WEBKIT_MESSAGEHANDLERS'), null, true);
        canUseJsbridgeInterface = false;
      } else {
        _jsContext = global.webkit.messageHandlers[name];
        if (!is('UserMessageHandler', _jsContext)) {
          emitErr(new JsBridgeError('IOS\u5BA2\u6237\u7AEF\u6CA1\u6709\u914D\u7F6E\u4E0A\u4E0B\u6587:' + name, 'IOS_NATIVE_CONTEXT_NOT_FOUND'), null, true);
          canUseJsbridgeInterface = false;
        }
      }
    } else if (device.isAndroid || device.isAndroidPad) {
      _jsContext = global[name];
      if (!is('Object', _jsContext)) {
        emitErr(new JsBridgeError('Android\u5BA2\u6237\u7AEF\u6CA1\u6709\u914D\u7F6E\u4E0A\u4E0B\u6587:' + name, 'ANDROID_OS_NATIVE_CONTEXT_NOT_FOUND'), null, true);
        canUseJsbridgeInterface = false;
      }
    } else {
      emitErr(new JsBridgeError('不支持当前运行环境', 'RUN_EVN_NOT_SUPPORT'), null, true);
      canUseJsbridgeInterface = false;
    }
  } else {
    // ！没有跑在支持的运行设备
    emitErr(new JsBridgeError('不支持当前运行环境', 'RUN_EVN_NOT_SUPPORT'), null, true);
    canUseJsbridgeInterface = false;
  }

  return plugin.cnEvent;
};

var _appId = void 0;
var _timestamp = void 0;
var _nonceStr = void 0;
var _signature = void 0;
var _errorHandler$1 = void 0;
// _event

/**
 * 判断一个字符串是否为空，如果非字符串参数，则抛出类型错误异常
 * @param  {String} str 带判断的字符串
 * @return {boolean}     如果为空返回true，否则返回false
 */
function utilStrIsEmpty(str) {
  if (str && !is('String', str)) {
    if (is('Function', _errorHandler$1)) {
      _errorHandler$1('\u8BF7\u786E\u8BA4\u7ED9\u5B9A\u53C2\u6570\u503C: ' + str + ' \u662F\u5426\u4E3A\u5B57\u7B26\u4E32');
    }
    throw new Error('\u8BF7\u786E\u8BA4\u7ED9\u5B9A\u53C2\u6570\u503C: ' + str + ' \u662F\u5426\u4E3A\u5B57\u7B26\u4E32');
  }
  return !str || str.trim().length === 0;
}

function _CheckSign(isDebug) {
  return new Promise(function (resolve, reject) {
    if (!utilStrIsEmpty(_appId) && !utilStrIsEmpty(_timestamp) && !utilStrIsEmpty(_nonceStr) && !utilStrIsEmpty(_signature)) {
      info(isDebug, '\u9A8C\u7B7E\u5B8C\u6210');
      resolve('验签完成');
    } else {
      reject(new Error('\u8BF7\u6838\u5BF9\u9A8C\u7B7E\u53C2\u6570'));
    }
  });
}

var install$1 = function install(eventFunc, appId, timestamp, nonceStr, signature, errorHandler, isDebug) {
  // _event = eventFunc
  _appId = appId;
  _timestamp = timestamp;
  _nonceStr = nonceStr;
  _signature = signature;
  _errorHandler$1 = errorHandler;
  return _CheckSign(isDebug);
};

var _event = void 0;
/**
 * 和导航相关的工具模块
 */
var plugin$1 = {
  modelName: 'navigation',
  /**
   * 关闭当前窗口
   * @returns {*}
   */
  closeWindow: function closeWindow() {
    return _event({
      event: 'NavigationEvent',
      action: 'popWebView'
    });
  },

  /**
   * 设置原生请求头
   * @param title 标题
   * @param visible 显示/隐藏
   * @returns {*}
   */
  setTitleBar: function setTitleBar(_ref) {
    var _ref$title = _ref.title,
        title = _ref$title === undefined ? '标题' : _ref$title,
        _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? false : _ref$visible;

    return _event({
      event: 'UIEvent',
      action: 'setHeaderBarConfig',
      params: {
        title: title,
        visible: visible
      }
    });
  }
};

var install$2 = function install(eventFunc) {
  _event = eventFunc;
  return plugin$1;
};

var _event$1 = void 0;

/**
 * 和导航相关的工具模块
 */
var plugin$2 = {
  modelName: 'user',
  /**
   * 获取登录用户信息
   * @returns {*}
   */
  getUserInfo: function getUserInfo() {
    return _event$1({
      event: 'UserInfoManageEvent',
      action: 'getUserInfo'
    });
  }
};

var install$3 = function install(eventFunc) {
  _event$1 = eventFunc;
  return plugin$2;
};

/* eslint-disable */
var _event$2 = void 0;

/**
 * 分享相关的工具模块
 */
var plugin$3 = {
  modelName: 'password',
  /**
   * 调起密码键盘
   * @param inputDom  输入框的dom元素
   * @param  {String}   [name=''] 键盘唯一标识，在同一个视图，如果调起两个键盘，该name必须区分开
   * @param  {Number}   [needrandom=0]             是否随机 0 标识不需要随机，1 标识随机
   * @param  {Number}   [needhint=0]               1有按钮回显
   * @param  {Number}   [useletter=1]              默认初始化的显示的键盘类型（1.字母、2.数字、3.字符）
   */
  showPwdKeyboard: function showPwdKeyboard(inputDom, name) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$needrandom = _ref.needrandom,
        needrandom = _ref$needrandom === undefined ? '1' : _ref$needrandom,
        _ref$needhint = _ref.needhint,
        needhint = _ref$needhint === undefined ? '1' : _ref$needhint,
        _ref$useletter = _ref.useletter,
        useletter = _ref$useletter === undefined ? '1' : _ref$useletter;

    // 先检查是否有初始化键盘监听回调
    // 点击字符数字字母的回调 'tapcharacter'/ 点击删除按键 'tapdelete'/ 点击ok: level(安全级别：S:高 M:中 W:弱 error: 不够最低要求位数 'tapok':
    return new Promise(function (resolve, reject) {
      if ((typeof inputDom === 'undefined' ? 'undefined' : _typeof(inputDom)) === 'object' && name.trim().length > 0) {
        window.keyboardOnTap = function (data) {
          try {
            var res = JSON.parse(data);
            switch (res.eventName) {
              // 点击字符数字字母的回调
              case 'tapcharacter':
                inputDom.value += '*';
                break;
              // 点击删除按键
              case 'tapdelete':
                if (inputDom.value.length > 0) {
                  inputDom.value = inputDom.value.substring(0, inputDom.value.length - 1);
                }
                break;
              default:
            }
          } catch (e) {
            reject(new Error('\u5BA2\u6237\u7AEF\u54CD\u5E94\u952E\u76D8TAP\u901A\u77E5\u4E8B\u4EF6\u89E3\u6790\u6570\u636E\u51FA\u9519\uFF1A' + e.message));
          }
        };
        var command = {
          event: 'PasswordKeyboardEvent',
          action: 'showKeyboard',
          params: {
            name: name,
            needrandom: needrandom,
            needhint: needhint,
            useletter: useletter
          },
          listener: 'keyboardOnTap'
        };
        _event$2(command);
      } else {
        reject(new Error('\u8C03\u7528\u5BC6\u7801\u952E\u76D8\u53C2\u6570\u4E0D\u5339\u914D'));
      }
    });
  },

  /**
   * 获取密文
   * @param  {Array} name      密码控件唯一标示数组['pwd1', 'pwd2', 'pwd3']
   * @param  {String} timestamp 时间戳
   * @return {String}           密文
   */
  getEncrypt: function getEncrypt(name, timestamp) {
    return new Promise(function (resolve, reject) {
      if (timestamp.trim().length > 0 && Array.isArray(name)) {
        var command = {
          event: 'PasswordKeyboardEvent',
          action: 'encryptForName',
          params: {
            name: name,
            timestamp: timestamp
          }
        };
        _event$2(command).then(function (res) {
          resolve(res);
        }).catch(function () {
          reject(new Error('\u5BA2\u6237\u7AEF\u54CD\u5E94[\u83B7\u53D6\u5BC6\u7801]\u901A\u77E5\u4E8B\u4EF6\u51FA\u9519'));
        });
      } else {
        reject(new Error('\u8C03\u7528\u83B7\u53D6\u5BC6\u7801\u5BC6\u6587\u63A5\u53E3\u53C2\u6570\u4E0D\u5339\u914D'));
      }
    });
  },

  /**
   * 清除密码
   * @param inputDom 输入框的dom元素
   * @param name  键盘唯一标识，在同一个视图，如果调起两个键盘，该name必须区分开
   * @returns {Promise}
   */
  onTapClearKeyboardEncrypt: function onTapClearKeyboardEncrypt(inputDom, name) {
    return new Promise(function (resolve, reject) {
      if ((typeof inputDom === 'undefined' ? 'undefined' : _typeof(inputDom)) === 'object' && name.trim().length > 0) {
        var command = {
          event: 'PasswordKeyboardEvent',
          action: 'putCharToEncryptor',
          params: {
            name: name,
            type: 'clear'
          }
        };
        _event$2(command).then(function () {
          inputDom.value = '';
        }).cache(function () {
          reject(new Error('\u5BA2\u6237\u7AEF\u54CD\u5E94[\u6E05\u9664\u5BC6\u7801]\u901A\u77E5\u4E8B\u4EF6\u51FA\u9519'));
        });
      } else {
        reject(new Error('\u8C03\u7528\u6E05\u9664\u5BC6\u7801\u63A5\u53E3\u53C2\u6570\u4E0D\u5339\u914D'));
      }
    });
  },

  /**
   * 获取设备信息
   */
  getMobileDevice: function getMobileDevice() {
    return new Promise(function (resolve, reject) {
      var device = {
        BSMobileDevice: 'ANDROID',
        BSMobileClientVer: '3.01',
        BSMobileClientApp: 'MOBILEBANK',
        BSMobileDeviceId: '65784CF48334634548B11F0DC5A89BC3',
        BSMobileIsBroken: '',
        BSMobileSystemVersion: '',
        IsPortal: '',
        IsIphone3: ''
      };
      resolve(device);
      // const command = {
      //   event: '',
      //   action: 'getMobileDevice',
      // }
      // _event(command).then((res) => {
      //   resolve(res)
      // }).cache(() => {
      //   reject(new Error(`客户端响应[获取设备信息]通知事件出错`))
      // })
    });
  }
};

var install$4 = function install(eventFunc) {
  _event$2 = eventFunc;
  return plugin$3;
};

var MixinPlugin = function () {
  function MixinPlugin() {
    classCallCheck(this, MixinPlugin);
  }

  createClass(MixinPlugin, null, [{
    key: 'mixin',
    value: function mixin(global, plugins) {
      plugins.forEach(function (plugin) {
        var modelName = plugin.modelName;
        info('\u6DF7\u5408' + modelName + '\u6A21\u5757\u5F00\u59CB');
        Object.keys(plugin).forEach(function (key) {
          if (key !== 'modelName') {
            Object.defineProperty(global, key, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: plugin[key]
            });
          }
        });
        info('\u6DF7\u5408' + modelName + '\u6A21\u5757\u5B8C\u6210');
      });
    }
  }]);
  return MixinPlugin;
}();

// import {install as share} from './share.js'
// 和业务相关，只需要判断一下几种类型
var isRunNative = device.isAndroid || device.isAndroidPad || device.isIpad || device.isIphone;

var JSBridge = function () {
  function JSBridge() {
    classCallCheck(this, JSBridge);
  }

  createClass(JSBridge, null, [{
    key: 'config',
    value: function config(_ref) {
      var _ref$global = _ref.global,
          global = _ref$global === undefined ? window : _ref$global,
          _ref$debug = _ref.debug,
          debug = _ref$debug === undefined ? false : _ref$debug,
          appId = _ref.appId,
          timestamp = _ref.timestamp,
          nonceStr = _ref.nonceStr,
          signature = _ref.signature,
          errorHandler = _ref.errorHandler;


      init(debug, errorHandler);

      var jsBridge = new JSBridge();

      var eventFunc = install({
        global: global,
        runNative: isRunNative,
        jsBridge: jsBridge
      });

      return new Promise(function (resolve, reject) {
        install$1(eventFunc, appId, timestamp, nonceStr, signature, errorHandler, { debug: debug }).then(function () {
          var plugins = [install$2(eventFunc), install$3(eventFunc), install$4(eventFunc)];
          MixinPlugin.mixin(jsBridge, plugins);
          resolve(jsBridge);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }]);
  return JSBridge;
}();

exports.JSBridge = JSBridge;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ynrcc-mobilebank-jssdk.js.map
