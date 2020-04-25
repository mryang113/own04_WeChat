import config from './config'

//发送ajax请求
export default (url,data={},method='GET') => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {'content-type':'application/json'},
      // dataType: 'json',
      // responseType: 'text',
      success: (result)=>{
        // console.log(result);
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