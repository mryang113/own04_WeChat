import request from '../../utils/request'



Page({
  data: {
    videoGroupList: [], // 导航列表
    navId: '', // 视频标签id标识
    videoList: [], // 视频列表数据
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    // 获取导航列表数据
    let videoGroupListData = await request('/video/group/list');
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0,14),
      navId: videoGroupListData.data[0].id
    })

    //页面一上来先加载一遍视频列表
    this.getVideoList(this.data.navId)
  },

  // 修改导航id值
  changeNavId(e){
    // console.log(e);
    // console.log(typeof e.currentTarget.id); //id传给他wx小程序隐式转换成字符串
    this.setData({
      // 右移一位,相当于强制转换换成数字类型的二进制,也可以用注释掉的代码
      // navId: e.currentTarget.id*1,
      navId: e.currentTarget.id>>>0
    })
  },

  // 获取视频列表数
  async getVideoList(navId){
    let videoListData = await request('/video/group',{id: navId})
    console.log(videoListData);
    // 更新至data中的videoList
    this.setData({
      videoList: videoListData.datas
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