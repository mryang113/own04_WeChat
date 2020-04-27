
import request from '../../utils/request'


Page({
  data: {
    day: '',
    month:'',
    recommendList: [] //// 推荐数据列表
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    // 判断用户是否登录
    let userInfo = wx.getStorageSync('cookies');
    if(!userInfo){
      // 用户没有登录,请先登录,并跳转至登录页
      wx.showLoading({
        title: '请先登录', //提示完,跳转放到回调里面,没那么生硬
        success: () => {
          wx.redirectTo({
            url: "/pages/login/login"
          })
        }
      })
    }

    //初始化页面时,加载下实时日期
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })

    // 获取recommendList数据
    let recommendListData = await request('/recommend/songs')
    this.setData({
      recommendList: recommendListData.recommend
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