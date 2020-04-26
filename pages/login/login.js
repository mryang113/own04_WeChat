import request from '../../utils/request'



Page({
  data: {
    phone: '',
    password: '',
  },


  // 生命周期函数--监听页面加载
  onLoad: function (options) {
  
  },

  // 登录功能
  async login(){
    // 1. 收集表单项数据
    let {phone, password} = this.data;

    // 2. 前端验证
    if(!phone.trim() || !password.trim()){
      wx.showToast({
        title: '手机号或密码不合法',
        icon: 'none',
        duration: 1000
      })
      return
    }else{
      // 3. 后端验证  isLogin: true 后加的为了video视频也访问需要 cookies,用于request封装里面判别是否为login请求
      let result = await request('/login/cellphone',{phone, password, isLogin:true});
      // console.log(result);
      if(result.code === 200){
        //登录成功
        wx.showToast({
          title: '登录成功',
          duration: 1000
        })
      }
      // 1. 将用户数据存储至本地
      wx.setStorage({
        key:"userInfo",
        data:JSON.stringify(result.profile)
      })

      // 2. 跳转至个人中心页
      wx.reLaunch({
        url:'/pages/personal/personal'
      })

    }
  },

  handleInput(event){
    // console.log(event);
    // 向事件对象传参1： data-key = value 比如页面的data-type = phone type就是key,phone就是value key和value可以随意定,前面data-是固定的
    // let type = event.currentTarget.dataset.type;
    // this.setData({
    //   [type]: event.detail.value
    // })

    // 向事件对象传参2: id
    let type = event.currentTarget.id
    this.setData({
      [type]: event.detail.value
    })
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})