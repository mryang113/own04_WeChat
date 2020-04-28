import request from '../../utils/request'

let appInstance = getApp() //生成全局app实例,这里有app的全局状态,文档api
// console.log(appInstance);


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
    // console.log(options); //就是路由跳转过来传的对象-->id
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

    // 判断当前页面的音乐是否在播放
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId){
      // 当前页面音乐在播放
      this.setData({isPlay: true})
    }


    // 生成音乐播放的实例 ,在页面一开始加载时生产,不耽搁使用参考文档api 
    this.backgroundAudioManager = wx.getBackgroundAudioManager()

    //监听音乐播放/暂停/停止 的三种状态(播放三件套)
    //1.监听 onPlay音乐播放
    this.backgroundAudioManager.onPlay(() => {
      console.log('音乐播放---');
      this.setData({isPlay: true})
      appInstance.globalData.isMusicPlay = true; //全局也同步修改
    });
    // 2.监听 onPause音乐暂停
    this.backgroundAudioManager.onPause(() => {
      console.log('音乐暂停+++');
      this.setData({isPlay: false})
      appInstance.globalData.isMusicPlay = false; //全局也同步修改
    });
    //3.监听 onStop音乐停止
    this.backgroundAudioManager.onStop(() => {
      //这个要在真机上测试才会有显示
      console.log('音乐停止,下次再播放要从头开始');
      this.setData({isPlay: false})
      // 真正意义上停止音乐
      this.backgroundAudioManager.stop();
      appInstance.globalData.isMusicPlay = false; //全局也同步修改
    });

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
    // 全局声明音乐在播放,让状态同步
    appInstance.globalData.isMusicPlay = isPlay;
    // 播放
    if(isPlay){
      // 判断之前是否有音乐链接,就是不用再暂停后再次播放的时候,再次重复发请求
      if(!musicLink){
        // 通过音乐musicId获取音乐播放链接
        let musicLinkData = await request(`/song/url?id=${musicId}`)
        musicLink = musicLinkData.data[0].url;
        // console.log(musicLinkData);
        // 更新data中的音乐链接musicLink
        this.setData({
          musicLink
        })
      }
      
      this.backgroundAudioManager.src = musicLink
      this.backgroundAudioManager.title = this.data.song.name;

      // 全局声明播放音乐的musicId
      appInstance.globalData.musicId = musicId;

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