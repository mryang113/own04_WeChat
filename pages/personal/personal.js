import request from '../../utils/request'

let startY = 0; // 手指点击瞬间的位置
let moveY = 0; // 手指移动的实时位置
let moveDistance = 0; // 手指移动的距离

Page({
  data: {
    coverTransform: 'translateY(0px)',
    coverTransition: '',
    userInfo: {},
    recentPlayList: {}, // 最近播放记录
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    // 读取本地是否有登录缓存数据
    let userInfo = wx.getStorageSync('userInfo');
    
  },

  // 点击拖拽3件套  点击-->移动-->抬手
  handleTouchStart(event){
    // 获取手指点击的位置
    startY = event.touches[0].clientY;
    // console.log(event.touches[0].clientY);
    this.setData({
      // 点击前一定要清除过度
      // coverTransition: '', //都可以
      coverTransition: 'none',
    })
  },
  handleTouchMove(event){
    // 计算手指移动的距离
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY
    // console.log(moveDistance);

    // 移动条件限制判断 向上不移动
    if(moveDistance < 0){
      moveDistance = 0
    }
    // 向下最大的移动距离 80px
    if(moveDistance > 80){
      moveDistance = 80
    }

    // 更新translateY的值
    this.setData({
      coverTransform: `translateY(${moveDistance}px)`
    })
  },
  handleTouchEnd(){
    this.setData({
      // 还原移动的位置为0
      coverTransform: `translateY(0px)`,
      coverTransition: 'transform 1s cubic-bezier(.21,1.93,.53,.64)',
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