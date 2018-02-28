<template>
<div id="app">
  <h1>{{ msg }}</h1>
  <h2>导航相关</h2>
  <ul>
    <li><a @click="closeWindow">关闭网页窗口</a></li>
    <li><a @click="setTitleBar(0)">显示导航栏</a></li>
    <li><a @click="setTitleBar(1)">隐藏导航栏</a></li>
    <li><a @click="h5loaded">通知客户端网页加载完毕</a></li>
  </ul>
  <h2>用户相关</h2>
  <ul>
    <li><a @click="getUserInfo">获取登录用户信息</a></li>
  </ul>
  <h2>分享</h2>
  <ul>
    <li><a @click="shareToWeChat">微信分享</a></li>
  </ul>
  <!--<h2>支付</h2>-->
  <!--<ul>-->
    <!--<li><a @click="pullPayPage">调取支付页面</a></li>-->
  <!--</ul>-->
</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: '云南农信手机银行JS-SDK示例'
    }
  },
  methods: {
    closeWindow() {
      this.jsBridge.closeWindow()
    },
    setTitleBar(type) {
      this.jsBridge.setTitleBar({
        title: '测试',
        visible: type === 0 ? true : false
      })
    },
    h5loaded() {
      this.jsBridge.h5loaded()
    },
    shareToWeChat() {
      this.jsBridge.shareToWeChat({
        link: 'https://www.baidu.com/',
        title: '分享测试',
        description: '啦啦啦，开始测试了',
        imgUrl: 'http://emobile.jiiiiiin.cn/static/Comm/BankIcons/fudian@2x.png'}).then(res => {
        alert(`success=》${JSON.stringify(res)}`)
      }).catch(error => {
        alert(JSON.stringify(error))
      })
    },
    pullPayPage() {
      jsBridge.pullPayPage('genToken2.do', {params1: 1, params2: 2}, {a:1, b: 1, c:2}).then(res => {
        alert(`success=》${JSON.stringify(res)}`)
      }).catch(error => {
        alert(error)
      })
    },
    getUserInfo() {
      this.jsBridge.getUserInfo().then(res => {
        alert(JSON.stringify(res))
      }).catch(err => {
        alert(JSON.stringify(err))
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
