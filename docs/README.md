# 云南农信手机银行JS-SDK说明文档

本JS-SDK是面向云南农信手机银行客户端网页开发者提供的网页开发工具包。

通过使用JS-SDK，网页开发者可以直接使用分享等手机银行特有的能力，为手机银行用户提供更优质的网页体验。

此文档面向网页开发者介绍JS-SDK如何使用及相关注意事项。


## 文档

+ [中文文档](https://jiiiiiin.github.io/ynrcc-mobilebank-jssdk/#/)
+ English(working)

## 快速上手

### 依赖

+ 插件支持的手机系统版本：

  !> IOS建议SDK版本 **8.0+**。

  !> Android SDK版本 **4.4+**。

+ 因为项目中使用了`Promise`来包裹每一个接口，而苹果和安卓（或者说安卓自身各个SDK下的浏览器版本）不同系统的浏览器内核对于`Promise`的支持并不相同（[Promises浏览器兼容一览表](http://caniuse.mojijs.com/Home/Html/item/key/promises/index.html)），所以大家在使用本SDK前必须要手动检测，并适当开启针对`Promise`的浏览器polyfill，推荐:

  > [es6-promise](https://www.npmjs.com/package/es6-promise)；

  > [promise-polyfill](https://www.npmjs.com/package/promise-polyfill)；

  - 进行polyfill可能的代码：

  ```js
  import Promise from 'promise-polyfill';

  // To add to window
  if (!window.Promise) {
    window.Promise = Promise;
  }
  ```

### 安装

+ npm：

``` bash
  npm install ynrcc-mobilebank-jssdk
```

+ cdn

``` bash
  # 待补充
```

### 配置

+ 第一种可能的使用方式：直接注入针对浏览器构建的版本*ynrcc-mobilebank-jssdk.js*使用

  ``` html
  <!-- 1.引入JS文件 **备注：支持使用 AMD/CMD 标准模块加载方法加载**-->
  <script src="./dist/ynrcc-mobilebank-jssdk.js"></script>

  <!-- 2.通过config接口注入权限验证配置 -->
  <script type="text/javascript">
    window.onload = function () {
      ynrcc.JSBridge.config({
        debug: true, // 开启调试模式,在PC端开发调试面板中会输出log，如果希望在手机端输出，这里推荐一个插件[Tencent/vConsole](https://github.com/Tencent/vConsole)
        errorHandler(err){
          // 指定和客户端交互过程中抛出的错误的处理函数。应用可以使用该函数来统一处理非业务级别的公共错误消息。
        }
        appId: '', // 必填，唯一标识
        timestamp: , // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }

    // 模拟调用测试：
    jsBridge.goBack()
  </script>
  ```


+ 推荐的使用方式：针对es模块系统构建的版本*ynrcc-mobilebank-jssdk.mjs*使用，以Vue搭建的项目为例

  ``` js
  import Vue from 'vue'
  import App from './App.vue'
  // 1.通过npm安装了sdk之后，通过下面方式引入应用
  import {JSBridge} from 'JSBridge'

  // 2.通过config接口注入权限验证配置
  const jsBridge = JSBridge.config({
    global: window,
    debug: process.env.NODE_ENV !== 'production',
    errorHandler(err){
      // 指定和客户端交互过程中抛出的错误的处理函数。应用可以使用该函数来统一处理非业务级别的公共错误消息。
    }
  })

  new Vue({
    el: '#app',
    render: h => h(App),
    mounted() {
      // 模拟调用测试：
      jsBridge.xxx().then((res)=>{
        // 处理客户端返回的正常结果
      }).catch((err)=>{
        // 处理客户端返回的错误结果
      })
      // 以上的正确和错误都是从业务角度而言
    }
  })
```

+ 接口调用说明

  - 所有接口通过JSBridge.config配置之后返回的对象来调用，参数是一个对象，除了每个接口本身返回的是一个`Promise`对象，通过`then`处理调用成功的情况，通过`catch`处理调用失败的情况，而且是业务层面的【成功】或者【失败】类似：

    ```js
      jsBridge.xxx().then(res => {
        // 处理调用成功的情况
      }).catch(err => {
        // 处理调用失败的情况
      })
  ```

  - `then`中返回的通用参数列表：(待补充)

    返回的JSON数据包如下：

    ```js
    // TODO 待补充
    ```
    <table>
      <tr>
        <th>参数</th>
        <th>描述</th>
      </tr>
        <tr>
            <td>DataMap</td>
            <td>如果接口声明会返回结果，那么返回的结果都将放置到该字段，一个的JSON对象。</td>
        </tr>
        <tr>
            <td>ReturnCode</td>
            <td>000000</td>
        </tr>
    </table>

  - `catch`中一般为调用接口出现错误，返回的通用参数列表：(待补充)

    返回的JSON数据包如下：

    ```js
    // TODO 待补充
    ```

    <table>
      <tr>
        <th>参数</th>
        <th>描述</th>
      </tr>
        <tr>
            <td>RetrunCode</td>
            <td>状态码，标识错误的标记，方便查错</td>
        </tr>
        <tr>
            <td>ReturnMessage</td>
            <td>错误通知消息</td>
        </tr>
    </table>

## 接口列表

### 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口

```js
jsBridge.onMenuShareTimeline({
    title: '', // 分享标题
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
}).then(res => {
  // 用户确认分享后执行的回调函数
}).catch(err => {
  // 用户取消分享后执行的回调函数
})
```

### 关闭当前网页窗口接口

```js
jsBridge.closeWindow()
```


## 附录1

### 签名算法

签名生成规则如下：参与签名的字段包括noncestr（随机字符串）, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分） 。对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。

即signature=sha1(string1)。 示例：

``` js
noncestr=xxx
timestamp=1414587457
url=https://www.baidu.com?params=value
```

步骤1. 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1：

``` js
noncestr=xxx&timestamp=1414587457&url=https://www.baidu.com?params=value
```

步骤2. 对string1进行sha1签名，得到signature：

``` js
xxxde62fce790f9a083d5c99e95740ceb90c27ed
```

注意事项

1.签名用的noncestr和timestamp必须与ynrcc.JSBridge.config中的nonceStr和timestamp相同。

2.签名用的url必须是调用JS接口页面的完整URL。

3.出于安全考虑，开发者必须在服务器端实现签名的逻辑。

## 测试

jssdk前端代码使用mocha完成了mock测试，所有接口都经过自身的集成测试；

```js
> ynrcc-mobilebank-jssdk@1.0.0 test /Users/jiiiiiin/Documents/Atom/ynrcc-mobilebank-jssdk
> mocha



  连通性测试
[ynrcc-jssdk] 混合navigation模块开始
[ynrcc-jssdk] 混合navigation模块完成
    ✓ 测试正常情况
1111 { ReturnCode: '000000' }

  连通性测试
[ynrcc-jssdk] 混合navigation模块开始
[ynrcc-jssdk] 混合navigation模块完成
    ✓ 测试业务返回非000000情况

  连通性测试
[ynrcc-jssdk] 混合navigation模块开始
[ynrcc-jssdk] 混合navigation模块完成
    ✓ 模拟客户端返回json字符串格式有误的情况


  3 passing (60ms)
```

## Issues

`ynrcc-mobilebank-jssdk` 是为云南农信手机银行面向网页开发者提供的基于客户端内的网页开发工具包，如果非合作伙伴请不要开issue。

- 任何描述不清楚、代码(拜托请别截图)懒得给出的 issue 将会直接 `关闭`、`锁定`、打上 `yet another bad issue 标签`;
- 在 issue 下提无关问题会被直接 `删除`;

## 项目文件说明

### lib/index.js

这个是项目入口文件。

- 不建议直接clone源代码进行修改。

### test/index_test.js

这个是项目的测试入口文件。

- sdk所有接口均通过`mocha`进行模拟测试，因为接口需要运行在手机银行客户端，并依赖其保留的上下文对象，故测试只能做到[打桩测试](https://baike.baidu.com/item/%E6%A1%A9%E6%A8%A1%E5%9D%97)；
- 凡是[文档](https://jiiiiiin.github.io/ynrcc-mobilebank-jssdk/#/)中描述的接口我们都进行过内部测试，如果在某些`Android`设备上存在问题（因为总所周知Android碎片化比较厉害），那么请提交`issue`进行详细的bug重现报告

### dist/ynrcc-mobilebank-jssdk.js

这是sdk的[UMD](https://leohxj.gitbooks.io/front-end-database/javascript-modules/about-umd.html)格式主文件，可以运行在大多数的JavaScript运行环境。

### dist/ynrcc-mobilebank-jssdk.mjs

这是sdk的[ES](https://leohxj.gitbooks.io/front-end-database/javascript-modules/about-umd.html)格式主文件，如果你的应用使用类似Vue或者React类似技术，那么建议使用该版本。


## 项目维护者

+ [z.jiiiiiin](https://github.com/Jiiiiiin)
+ [kzylmlfg](https://github.com/kzylmlfg)
