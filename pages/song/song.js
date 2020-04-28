import request from '../../utils/request'

Page({
  data: {
    isPlay:false, //标识音乐是否在播放
    song: {}, // 音乐数据
    musicId: '', // 音乐的id
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    // options ： 用来获取路由跳转的参数， 默认值是空对象
    console.log(options); //就是路由跳转过来传的对象-->id
    // 路由跳转参数不能传入数量大的参数，因为大小限制的问题导致不能获取全部的参数内容
    // let song = JSON.parse(options.song); // 这个是测试之前把整个歌曲item传过来,接受不完整,会丢失数据

    let musicId = options.id;
    // 通过音乐id获取音乐的数据
    let songData = await request(`/song/detail?ids=${musicId}`)
    this.setData({
      song: songData.songs[0],
      musicId
    })
  },

  // 播放音乐的回调
  musicPlay(){
    let isPlay = !this.data.isPlay
    // 修改是否播放的状态
    this.setData({
      isPlay
    })

    // 播放/暂停音乐
    this.musicControl(isPlay);
  },

  musicControl(isPlay){
    // 播放
    if(isPlay){

    }else{ // 暂停

    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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