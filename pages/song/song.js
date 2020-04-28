import request from '../../utils/request'

Page({
  data: {
    isPlay:false, //标识音乐是否在播放
    song: {}, // 音乐数据
    musicId: '', // 音乐的id
    musicLink: '', // 音乐播放链接
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

    // 动态修改窗口标题 参考文档api
    wx.setNavigationBarTitle({
      title: this.data.song.name
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
    let {musicId,musicLink} = this.data;
    this.musicControl(isPlay,musicId,musicLink);
  },

  // 封装控制音乐播放的功能函数
  async musicControl(isPlay,musicId,musicLink){
    // 播放
    if(isPlay){
      // 判断之前是否有音乐链接,就是不用再暂停后再次播放的时候,再次重复发请求
      if(!musicLink){
        // 通过音乐musicId获取音乐播放链接
        let musicLinkData = await request(`/song/url?id=${musicId}`)
        musicLink = musicLinkData.data[0].url;
        console.log(musicLinkData);
        // 更新data中的音乐链接musicLink
        this.setData({
          musicLink
        })
      }
      // 生成音乐播放的实例 ,参考文档api 
      this.backgroundAudioManager = wx.getBackgroundAudioManager()
      this.backgroundAudioManager.src = musicLink
      this.backgroundAudioManager.title = this.data.song.name;

      //r如果想在小程序隐藏继续播放歌曲就要在app.json中设置 "requiredBackgroundModes":["audio"]
    }else{ // 暂停
      this.backgroundAudioManager.pause();
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