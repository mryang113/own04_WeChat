import PubSub from 'pubsub-js'
import request from '../../utils/request'

Page({
  data: {
    day: '',
    month:'',
    recommendList: [], //// 推荐数据列表
    index: 0,// 记录播放歌曲的下标 消息订阅时候加的
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

    // PubSub-01-sub 订阅song页面发布的消息(对应事件名及注释标号)
    PubSub.subscribe('switchType',(msg,type) => {
      // 第一个参数其实没啥用,就是订阅与发布的事件名字
      // console.log(msg,data,'recommend页面');
      let {recommendList,index} = this.data;
      let musicId;
      if(type === 'pre'){ //点击的是上一首
        (index === 0) && (index = recommendList.length) // 小程序对于&& 左右两边的赋值语句,语法会有冲突,要加个()包起来
        index -= 1;
        musicId = recommendList[index].id;
      }else{ //点击的是下一首
        (index === recommendList.length -1) && (index = -1)
        index += 1;
        musicId = recommendList[index].id;
      }
      // 实时更新当前播放音乐的下标记录
      this.setData({index})

      //PubSub-02-pub 此时此刻,不再发布消息等待何时?(就是订阅到song的消息,处理完后,再把这些song所需数据发布给他)
      PubSub.publish('musicId',musicId)

    })
  },

  // 点击音乐列表的回调
  toSong(e){
    // console.log(e);
    let {song,index} = e.currentTarget.dataset
    this.setData({
      index // 点击跳转的时候,把这个index也记录到,后来Pubsub用的
    })
    // 路由传参： query的形式 ----> url?a=xxx&b=yyy
    wx.navigateTo({
      url: '/pages/song/song?id=' + song.id
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