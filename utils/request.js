import config from './config'

//发送ajax请求
export default (url,data={},method='GET') => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: config.host + url,
      // url: config.phoneHost + url,
      data,
      method,
      header: { // 请求头携带 cookie ,必须为字符串,两种方法都可以
        // 这里测试时有个bug,已登录状态下,再次登录,会报错,会登录不进去,
        // cookie: JSON.parse(wx.getStorageSync('cookies') || "[]").toString()
        cookie: `${JSON.parse(wx.getStorageSync('cookies') || "[]")}` //第一次上来没有,没有就给个空的json数据格式
      },
      // dataType: 'json',
      // responseType: 'text',
      success: (result)=>{
        // console.log('result:', result);

        // login请求的时候需要获取用户cookies， 存入至storage
        if(data.isLogin){ // 是否为登录请求
          wx.setStorage({
            key: 'cookies',
            data: JSON.stringify(result.cookies)
          })
        }

        resolve(result.data) //  修改promise的状态为成功状态
      },
      fail: (err)=>{
        reject(err)
      },
    });
  })
}



/*
* 封装功能函数的核心思想
*   1. 函数内部保留静态的代码
*   2. 将变化的部分抽取出来作为函数的形参
*   3. 使用者根据实际情况传入实参
*
* 封装功能组件的核心思想
*   1. 组件内部保留静态代码段
*   2. 将变化的部分抽取出来作为组件的props数据由外部导入
*   3. 使用者根据实际情况通过标签属性导入数据至组件内部的props对象中
*   4. 良好的组件通常会规定组件props属性的必要性及数据类型
*     如： props: {
*       num: {
*         type: Number,
*         isRequired: true,
*         default: 0
*       }
*
*     }
* */