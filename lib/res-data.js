const code_uncatch_err = 'uncatch err'
const code_uncatch_msg = '请求客户端出错，未解析到错误消息'
const code_no_resp_err = 'no resp err'
const code_no_resp_msg = '请求客户端出错，未返回结果数据'

export default class ResData {

  constructor(errcode, errmsg, data){
    this.errcode = errcode
    this.errmsg = errmsg
    this.data = data
  }

  static err(errcode = code_uncatch_err, errmsg = code_uncatch_msg){
    const resData = new ResData(errcode, errmsg)
    delete resData.data
    return resData
  }

  static parse(res = null){
    let resData = null
    if(res === null){
      resData = new ResData(code_no_resp_err, code_no_resp_msg)
      delete resData.data
    } else {
      // TODO 硬编码
      const stateCode = res.RetrunCode
      if(stateCode === '000000'){
        // 请求成功
        resData = new ResData(null, null, res.DataMap)
        delete resData.errcode
        delete resData.errmsg
      } else {
        resData = new ResData(stateCode, res.RetrunMsg)
        delete resData.data
      }
    }
    return resData
  }
}
