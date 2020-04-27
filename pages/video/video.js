import request from '../../utils/request'


Page({
  data: {
    videoGroupList: [], // 导航列表
    navId: '', // 视频标签id标识
    videoList: [], // 视频列表数据
    triggered: false // 标识下拉刷新是否被触发
  },

  // 生命周期函数--监听页面加载
  onLoad: async function (options) {
    // 一上来先判断用户是否登录
    let userInfo = wx.getStorageSync('cookies');
    if(!userInfo){
      // 用户没有登录
      wx.showLoading({
        title: '请先登录',
        success: () => {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      })
    }

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
      navId: e.currentTarget.id>>>0,
      videoList: [], // 修改前清空原有数据,就是在切换的一瞬间,让页面先空白一下,更好体验
    })

    //在切换对应视频时,有个loading加载的动作,更好的用户体验
    wx.showLoading({
      title: '正在加载',
      mask: true //要不要都可以,就是在切换的时候,防止用户再次点击原有得视频,遮罩一下
    })

    //点击导航列表时,对应的显示该视频数据
    this.getVideoList(this.data.navId)
  },

  // 获取视频列表数
  async getVideoList(navId){
    let videoListData = await request('/video/group',{id: navId})

    // Loading需要自己手动关闭,一旦请求数据成功回来,先关闭消息提示
    wx.hideLoading(); //文档api

    // console.log(videoListData);
    // 更新至data中的videoList
    this.setData({
      videoList: videoListData.datas,
      triggered: false,  // 关闭下拉刷新
    })
  },

  // scroll-view下拉刷新的回调
  handleRefresher(){
    // console.log('下拉刷新时被触发');
    // 发送请求，更新数据
    this.getVideoList(this.data.navId);
  },

  // scroll-view滑动到底部(就是向上滑动)的事件回调
  handleScrollLower(){
    // 事件对应的wxml文件里,在对应的开发文档可见
    console.log('滑动到scroll-view的底部了。。。');
    wx.showLoading({
      title: "正在努力加载"
    })

    // 1. 往上滑到底部,模拟一份数据(就是同样的videoList数据一份,8条再累加一下),真实的是要发送请求获取数据
    let newVideoList = [
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_15F456DD5D7BAA5333613E58453DBC29",
              "coverUrl": "https://p2.music.126.net/bmlz7pEOjbpg29OljQ9Zlw==/109951164715101906.jpg",
              "height": 1080,
              "width": 1920,
              "title": "Manta（Cover：刘柏辛）",
              "description": "第一次唱rap...!唱的不好还请谅解555\n我真的是太喜欢刘柏辛了呜呜呜简直就是宝藏女孩",
              "commentCount": 48,
              "shareCount": 44,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 17069248
                  },
                  {
                      "resolution": 480,
                      "size": 25600614
                  },
                  {
                      "resolution": 720,
                      "size": 34687194
                  },
                  {
                      "resolution": 1080,
                      "size": 68118992
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 440000,
                  "authStatus": 1,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/pRTbPx-5clr_mTWGJ4koNQ==/109951164549363124.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 441900,
                  "birthday": 1040918400000,
                  "userId": 305393117,
                  "userType": 4,
                  "nickname": "玄铃知几许",
                  "signature": "不好听没让你听",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951164549363120,
                  "backgroundImgId": 109951164452583360,
                  "backgroundUrl": "http://p1.music.126.net/RHkJvIzspxbgrGQDhMSFhA==/109951164452583356.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 10,
                  "vipType": 11,
                  "remarkName": null,
                  "avatarImgIdStr": "109951164549363124",
                  "backgroundImgIdStr": "109951164452583356",
                  "avatarImgId_str": "109951164549363124"
              },
              "urlInfo": {
                  "id": "15F456DD5D7BAA5333613E58453DBC29",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/0D4WPA94_2908719072_uhd.mp4?ts=1587978837&rid=C9763BACC882C6BFCFDB2EDF1996A5B6&rl=3&rs=ExgZHwdHlZmPCFbjExWGslzGAdFTsQvg&sign=01660c536b6253cfe1edc3289de7676d&ext=RYwO7tsH5lISidpSmqhzlv7gevK7KF2k%2Fip9YFCzP1PVytMA%2FAzKxxheP1gkM%2BnmE2HY%2FIIB9VnKdIW47ktriXGfNiqH8sTWrpfHdqtfoHi%2F2mX%2FGidKmNX4GRrP%2BmlSr9zDEcv2QeM764PopLdFjPIN1cP7%2BJ9V4pjEMfRUNW4wmdiU9yeiTZhLyVeu4Bcs61TNWPsY4%2F4TbT4dW5dSRM7ikGqsSfm9S3Vo3JmDXfYNmFjK%2FlZuivtI7agqsbVV",
                  "size": 68118992,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": 243125,
                      "name": "#歌手#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 4107,
                      "name": "说唱",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "Manta (Live)",
                      "id": 1422989732,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 1124151,
                              "name": "刘柏辛Lexie",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": "",
                      "fee": 8,
                      "v": 1,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 85684430,
                          "name": "歌手·当打之年 第2期",
                          "picUrl": "http://p1.music.126.net/OBY8dfbP-Q002e4OECrqJA==/109951164703135281.jpg",
                          "tns": [],
                          "pic_str": "109951164703135281",
                          "pic": 109951164703135280
                      },
                      "dt": 202180,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 8089965,
                          "vd": -37363
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 4853997,
                          "vd": -34767
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 3236013,
                          "vd": -33134
                      },
                      "a": null,
                      "cd": "01",
                      "no": 6,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 0,
                      "s_id": 0,
                      "mv": 0,
                      "cp": 1416682,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 0,
                      "privilege": {
                          "id": 1422989732,
                          "fee": 8,
                          "payed": 0,
                          "st": 0,
                          "pl": 128000,
                          "dl": 0,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 128000,
                          "toast": false,
                          "flag": 68,
                          "preSell": false
                      }
                  },
                  {
                      "name": "Manta",
                      "id": 1409329965,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 1124151,
                              "name": "刘柏辛Lexie",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": "",
                      "fee": 8,
                      "v": 5,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 84074626,
                          "name": "Manta",
                          "picUrl": "http://p1.music.126.net/U1cEFusbO0qFyGBJleH5EA==/109951164546416875.jpg",
                          "tns": [],
                          "pic_str": "109951164546416875",
                          "pic": 109951164546416880
                      },
                      "dt": 202061,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 8085464,
                          "vd": -58503
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 4851296,
                          "vd": -55928
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 3234212,
                          "vd": -54289
                      },
                      "a": null,
                      "cd": "01",
                      "no": 1,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 1,
                      "s_id": 0,
                      "mv": 10907250,
                      "cp": 1400821,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 1576512000000,
                      "privilege": {
                          "id": 1409329965,
                          "fee": 8,
                          "payed": 0,
                          "st": 0,
                          "pl": 128000,
                          "dl": 0,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 128000,
                          "toast": false,
                          "flag": 0,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "15F456DD5D7BAA5333613E58453DBC29",
              "durationms": 234240,
              "playTime": 321846,
              "praisedCount": 725,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_40C0A09AFB3F55D7D09F0C491415788E",
              "coverUrl": "https://p1.music.126.net/HaW_Rko7ZYLN1wvD-KJkYQ==/109951163573812393.jpg",
              "height": 720,
              "width": 1280,
              "title": "高清翡翠台.周日狂热夜.F.I.R.月牙湾",
              "description": "高清翡翠台.周日狂热夜.F.I.R.月牙湾",
              "commentCount": 84,
              "shareCount": 49,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 26303455
                  },
                  {
                      "resolution": 480,
                      "size": 41090163
                  },
                  {
                      "resolution": 720,
                      "size": 70542038
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 330000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/fwh9wnNorHNlyPegR33_Bg==/7717472116235588.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 330100,
                  "birthday": 824461949746,
                  "userId": 10086046,
                  "userType": 201,
                  "nickname": "小明喽",
                  "signature": "棠梨煎雪岁岁年年，却已是从前",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 7717472116235588,
                  "backgroundImgId": 109951163239855040,
                  "backgroundUrl": "http://p1.music.126.net/6QeakB_Vs6j_3uU-iyLiOA==/109951163239855048.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": {
                      "1": "影视视频达人"
                  },
                  "djStatus": 0,
                  "vipType": 0,
                  "remarkName": null,
                  "avatarImgIdStr": "7717472116235588",
                  "backgroundImgIdStr": "109951163239855048"
              },
              "urlInfo": {
                  "id": "40C0A09AFB3F55D7D09F0C491415788E",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/s6V89tI1_1710611125_shd.mp4?ts=1587978837&rid=C9763BACC882C6BFCFDB2EDF1996A5B6&rl=3&rs=qrXCyFAExlboOmSMUrLPNlmxKcxxVmqc&sign=7207923a6f65a1c5377d2d5a82612b92&ext=RYwO7tsH5lISidpSmqhzlv7gevK7KF2k%2Fip9YFCzP1PVytMA%2FAzKxxheP1gkM%2BnmE2HY%2FIIB9VnKdIW47ktriXGfNiqH8sTWrpfHdqtfoHi%2F2mX%2FGidKmNX4GRrP%2BmlSr9zDEcv2QeM764PopLdFjPIN1cP7%2BJ9V4pjEMfRUNW4wmdiU9yeiTZhLyVeu4Bcs61TNWPsY4%2F4TbT4dW5dSRM7ikGqsSfm9S3Vo3JmDXfYNmFjK%2FlZuivtI7agqsbVV",
                  "size": 70542038,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 720
              },
              "videoGroup": [
                  {
                      "id": -25051,
                      "name": "#KTV女生必点歌曲【惊艳】#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 243125,
                      "name": "#歌手#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 59101,
                      "name": "华语现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 59108,
                      "name": "巡演现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 57108,
                      "name": "流行现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "月牙湾",
                      "id": 354352,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 11562,
                              "name": "F.I.R.",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": "",
                      "fee": 1,
                      "v": 24,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 34961,
                          "name": "爱.歌姬",
                          "picUrl": "http://p1.music.126.net/Gzty3RTKN6Vf96IcjYC3lw==/109951164219313436.jpg",
                          "tns": [],
                          "pic_str": "109951164219313436",
                          "pic": 109951164219313440
                      },
                      "dt": 308546,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 12344467,
                          "vd": -9200
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 7406697,
                          "vd": -6700
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 4937812,
                          "vd": -5100
                      },
                      "a": null,
                      "cd": "1",
                      "no": 7,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 1,
                      "s_id": 0,
                      "mv": 5324056,
                      "cp": 7002,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 1190908800000,
                      "privilege": {
                          "id": 354352,
                          "fee": 1,
                          "payed": 0,
                          "st": 0,
                          "pl": 0,
                          "dl": 0,
                          "sp": 0,
                          "cp": 0,
                          "subp": 0,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 0,
                          "toast": false,
                          "flag": 1028,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "40C0A09AFB3F55D7D09F0C491415788E",
              "durationms": 182454,
              "playTime": 234150,
              "praisedCount": 544,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_F8CEAB83235DB439D7146F91E779652A",
              "coverUrl": "https://p1.music.126.net/vM5UpZ-SFOB6Oy-tXxASGg==/109951164777820185.jpg",
              "height": 1080,
              "width": 1920,
              "title": "吉他弹唱动力火车《第一滴泪》一首经典老歌",
              "description": "吉他弹唱动力火车《第一滴泪》一首经典老歌",
              "commentCount": 4,
              "shareCount": 3,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 8871294
                  },
                  {
                      "resolution": 480,
                      "size": 14350292
                  },
                  {
                      "resolution": 720,
                      "size": 22057600
                  },
                  {
                      "resolution": 1080,
                      "size": 48852421
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 110000,
                  "authStatus": 1,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/uXsVL3CqjO-khRTBRiKSqQ==/3431575791962674.jpg",
                  "accountStatus": 0,
                  "gender": 1,
                  "city": 110101,
                  "birthday": -2209017600000,
                  "userId": 37155928,
                  "userType": 4,
                  "nickname": "大铭铭爱吉他",
                  "signature": "用音乐记录生活",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 3431575791962674,
                  "backgroundImgId": 109951164051826540,
                  "backgroundUrl": "http://p1.music.126.net/Ub_8Gj9lQFdIwOvi_J8beQ==/109951164051826550.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": {
                      "1": "音乐原创视频达人"
                  },
                  "djStatus": 10,
                  "vipType": 11,
                  "remarkName": null,
                  "avatarImgIdStr": "3431575791962674",
                  "backgroundImgIdStr": "109951164051826550"
              },
              "urlInfo": {
                  "id": "F8CEAB83235DB439D7146F91E779652A",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/UO7wT7nI_2928838276_uhd.mp4?ts=1587978837&rid=C9763BACC882C6BFCFDB2EDF1996A5B6&rl=3&rs=mtKqCimYFdzrZijVQfIrfuMAXJPfMSWD&sign=12bab3247118a0dd4dd6a05cb65a4c9d&ext=RYwO7tsH5lISidpSmqhzlv7gevK7KF2k%2Fip9YFCzP1PVytMA%2FAzKxxheP1gkM%2BnmE2HY%2FIIB9VnKdIW47ktriXGfNiqH8sTWrpfHdqtfoHi%2F2mX%2FGidKmNX4GRrP%2BmlSr9zDEcv2QeM764PopLdFjPIN1cP7%2BJ9V4pjEMfRUNW4wmdiU9yeiTZhLyVeu4Bcs61TNWPsY4%2F4TbT4dW5dSRM7ikGqsSfm9S3Vo3JmDXfYNmFjK%2FlZuivtI7agqsbVV",
                  "size": 48852421,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": 243125,
                      "name": "#歌手#",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "第一滴泪 (Live)",
                      "id": 1425818689,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 6557,
                              "name": "曾一鸣",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": "",
                      "fee": 8,
                      "v": 1,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 85967630,
                          "name": "歌手·当打之年 第4期",
                          "picUrl": "http://p1.music.126.net/OuL80LuI347696oR98b3SA==/109951164738867906.jpg",
                          "tns": [],
                          "pic_str": "109951164738867906",
                          "pic": 109951164738867900
                      },
                      "dt": 321877,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 12877485,
                          "vd": -39184
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 7726509,
                          "vd": -36584
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 5151021,
                          "vd": -34905
                      },
                      "a": null,
                      "cd": "01",
                      "no": 5,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 0,
                      "s_id": 0,
                      "mv": 0,
                      "cp": 1416682,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 0,
                      "privilege": {
                          "id": 1425818689,
                          "fee": 8,
                          "payed": 0,
                          "st": 0,
                          "pl": 128000,
                          "dl": 0,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 128000,
                          "toast": false,
                          "flag": 68,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "F8CEAB83235DB439D7146F91E779652A",
              "durationms": 165716,
              "playTime": 12852,
              "praisedCount": 41,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_57B499E912DF45ADF5F844D8EF0503D0",
              "coverUrl": "https://p1.music.126.net/MYcUMzs6ieH1TyQpMVZJiw==/109951164538996143.jpg",
              "height": 720,
              "width": 1280,
              "title": "华晨宇 | 新世界「11/16 海口演唱会」",
              "description": null,
              "commentCount": 28,
              "shareCount": 19,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 60452408
                  },
                  {
                      "resolution": 480,
                      "size": 108160941
                  },
                  {
                      "resolution": 720,
                      "size": 156421080
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 1000000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/I-3wQ-2ctrf0EHs0Hi_77A==/109951163205288420.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 1010000,
                  "birthday": -2209017600000,
                  "userId": 354331837,
                  "userType": 0,
                  "nickname": "奶盐虾滑",
                  "signature": "Sad",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951163205288420,
                  "backgroundImgId": 109951163205297330,
                  "backgroundUrl": "http://p1.music.126.net/FYDqEB8dstZTkSCR4vQe1g==/109951163205297321.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 0,
                  "vipType": 11,
                  "remarkName": null,
                  "avatarImgIdStr": "109951163205288420",
                  "backgroundImgIdStr": "109951163205297321",
                  "avatarImgId_str": "109951163205288420"
              },
              "urlInfo": {
                  "id": "57B499E912DF45ADF5F844D8EF0503D0",
                  "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/d93xEKp5_2831010891_shd.mp4?ts=1587978837&rid=C9763BACC882C6BFCFDB2EDF1996A5B6&rl=3&rs=xWHpUAllpkDSMzdfnZwuWVnmInfRkjZh&sign=b08ac05a36170df7fc8b3cbcd22a55e4&ext=RYwO7tsH5lISidpSmqhzlv7gevK7KF2k%2Fip9YFCzP1PVytMA%2FAzKxxheP1gkM%2BnmE2HY%2FIIB9VnKdIW47ktriXGfNiqH8sTWrpfHdqtfoHi%2F2mX%2FGidKmNX4GRrP%2BmlSr9zDEcv2QeM764PopLdFjPIN1cP7%2BJ9V4pjEMfRUNW4wmdiU9yeiTZhLyVeu4Bcs61TNWPsY4%2F4TbT4dW5dSRM7ikGqsSfm9S3Vo3JmDXfYNmFjK%2FlZuivtI7agqsbVV",
                  "size": 156421080,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 720
              },
              "videoGroup": [
                  {
                      "id": 243125,
                      "name": "#歌手#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 23118,
                      "name": "华晨宇",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 9102,
                      "name": "演唱会",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "57B499E912DF45ADF5F844D8EF0503D0",
              "durationms": 360000,
              "playTime": 87439,
              "praisedCount": 312,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_481F47A269D5665008086170DEB82E0C",
              "coverUrl": "https://p1.music.126.net/8FClmq5o5NgFxQgX67Em3A==/109951164764641515.jpg",
              "height": 1080,
              "width": 1920,
              "title": "连名带姓",
              "description": "连名带姓 弹唱",
              "commentCount": 17,
              "shareCount": 7,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 12998029
                  },
                  {
                      "resolution": 480,
                      "size": 19383508
                  },
                  {
                      "resolution": 720,
                      "size": 26747088
                  },
                  {
                      "resolution": 1080,
                      "size": 52762678
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 1000000,
                  "authStatus": 1,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/fxv8TRuD4c9MKb1szHt-Hg==/109951164801358695.jpg",
                  "accountStatus": 0,
                  "gender": 1,
                  "city": 1003100,
                  "birthday": 706942800000,
                  "userId": 117099940,
                  "userType": 4,
                  "nickname": "MrQ长颈鹿",
                  "signature": "著名音乐听众。",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951164801358690,
                  "backgroundImgId": 109951163751823800,
                  "backgroundUrl": "http://p1.music.126.net/n9sbmloqApfzuk0Zb8SqCg==/109951163751823808.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 10,
                  "vipType": 0,
                  "remarkName": null,
                  "avatarImgIdStr": "109951164801358695",
                  "backgroundImgIdStr": "109951163751823808",
                  "avatarImgId_str": "109951164801358695"
              },
              "urlInfo": {
                  "id": "481F47A269D5665008086170DEB82E0C",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/IfdHYh6a_2922888337_uhd.mp4?ts=1587978837&rid=C9763BACC882C6BFCFDB2EDF1996A5B6&rl=3&rs=vowvwKmleTcFABzifayWweuQYrELIZKc&sign=3b265d71de19803d223214f752a5250b&ext=RYwO7tsH5lISidpSmqhzlv7gevK7KF2k%2Fip9YFCzP1PVytMA%2FAzKxxheP1gkM%2BnmE2HY%2FIIB9VnKdIW47ktriXGfNiqH8sTWrpfHdqtfoHi%2F2mX%2FGidKmNX4GRrP%2BmlSr9zDEcv2QeM764PopLdFjPIN1cP7%2BJ9V4pjEMfRUNW4wmdiU9yeiTZhLyVeu4Bcs61TNWPsY4%2F4TbT4dW5dSRM7ikGqsSfm9S3Vo3JmDXfYNmFjK%2FlZuivtI7agqsbVV",
                  "size": 52762678,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": 243125,
                      "name": "#歌手#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "481F47A269D5665008086170DEB82E0C",
              "durationms": 197363,
              "playTime": 54490,
              "praisedCount": 95,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_1A63499FE48BF235F888AD692039FBC4",
              "coverUrl": "https://p1.music.126.net/viU4E-UX2JTRXoDoDB83ow==/109951164785627052.jpg",
              "height": 1080,
              "width": 1920,
              "title": "当打之年 周深《怪兽》我愿抓住此生辽阔 赠你满天星火",
              "description": "我愿抓住此生辽阔，然后赠你满天星火。\n\nBGM：Monsters — 周深（歌手·当打之年 第5期）",
              "commentCount": 48,
              "shareCount": 131,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 21512254
                  },
                  {
                      "resolution": 480,
                      "size": 38222508
                  },
                  {
                      "resolution": 720,
                      "size": 58543566
                  },
                  {
                      "resolution": 1080,
                      "size": 112407820
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 1000000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/wR46DNUWFRgxI66xxhlhlg==/109951164819463875.jpg",
                  "accountStatus": 0,
                  "gender": 0,
                  "city": 1010000,
                  "birthday": 1546272000000,
                  "userId": 36817742,
                  "userType": 201,
                  "nickname": "召唤小冰",
                  "signature": "请你一定不要停下来 成为你想成为的人",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951164819463870,
                  "backgroundImgId": 109951164819841630,
                  "backgroundUrl": "http://p1.music.126.net/tUPti53OkcjIeygNOb5qCA==/109951164819841624.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": {
                      "1": "音乐视频达人"
                  },
                  "djStatus": 10,
                  "vipType": 11,
                  "remarkName": null,
                  "avatarImgIdStr": "109951164819463875",
                  "backgroundImgIdStr": "109951164819841624",
                  "avatarImgId_str": "109951164819463875"
              },
              "urlInfo": {
                  "id": "1A63499FE48BF235F888AD692039FBC4",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/ovcNvMJN_2929133191_uhd.mp4?ts=1587978837&rid=C9763BACC882C6BFCFDB2EDF1996A5B6&rl=3&rs=QMKExTbhqNEayhHjnyATWxaRzBBKDRjF&sign=e62cc08cb88b62602672ee8d295f07b1&ext=RYwO7tsH5lISidpSmqhzlv7gevK7KF2k%2Fip9YFCzP1PVytMA%2FAzKxxheP1gkM%2BnmE2HY%2FIIB9VnKdIW47ktriXGfNiqH8sTWrpfHdqtfoHi%2F2mX%2FGidKmNX4GRrP%2BmlSr9zDEcv2QeM764PopLdFjPIN1cP7%2BJ9V4pjEMfRUNW4wmdiU9yeiTZhLyVeu4Bcs61TNWPsY4%2F4TbT4dW5dSRM7ikGqsSfm9S3Vo3JmDXfYNmFjK%2FlZuivtI7agqsbVV",
                  "size": 112407820,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": 243125,
                      "name": "#歌手#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 13211,
                      "name": "周深",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 3102,
                      "name": "二次元",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 23116,
                      "name": "音乐推荐",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "Monsters (Live)",
                      "id": 1428598981,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 1030001,
                              "name": "周深",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": "",
                      "fee": 8,
                      "v": 1,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 86269349,
                          "name": "歌手·当打之年 第5期",
                          "picUrl": "http://p1.music.126.net/8CBeG0BF2C0dPiA1FDflGQ==/109951164773621591.jpg",
                          "tns": [],
                          "pic_str": "109951164773621591",
                          "pic": 109951164773621580
                      },
                      "dt": 246698,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 9870765,
                          "vd": -41208
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 5922477,
                          "vd": -38621
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 3948333,
                          "vd": -37011
                      },
                      "a": null,
                      "cd": "01",
                      "no": 2,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 0,
                      "s_id": 0,
                      "mv": 0,
                      "cp": 1416682,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 0,
                      "privilege": {
                          "id": 1428598981,
                          "fee": 8,
                          "payed": 0,
                          "st": 0,
                          "pl": 128000,
                          "dl": 0,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 128000,
                          "toast": false,
                          "flag": 68,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "1A63499FE48BF235F888AD692039FBC4",
              "durationms": 246784,
              "playTime": 138881,
              "praisedCount": 773,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_44E734ADF9494F76DED353CFB14BA456",
              "coverUrl": "https://p2.music.126.net/iz-AOTbpNG-zHamIIdjwCw==/109951163631019373.jpg",
              "height": 360,
              "width": 640,
              "title": "王梵瑞——鼓楼先生，10.27在水星，糖果三层",
              "description": null,
              "commentCount": 5,
              "shareCount": 4,
              "resolutions": [
                  {
                      "resolution": 720,
                      "size": 80891565
                  },
                  {
                      "resolution": 480,
                      "size": 50535251
                  },
                  {
                      "resolution": 240,
                      "size": 26457253
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 110000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/viC7Sc-QQR36i3KOnM0BaA==/2910407281057262.jpg",
                  "accountStatus": 0,
                  "gender": 2,
                  "city": 110101,
                  "birthday": 656265600000,
                  "userId": 74493088,
                  "userType": 0,
                  "nickname": "觅灵感",
                  "signature": "每人牵手 我就揣兜",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 2910407281057262,
                  "backgroundImgId": 7784542325594668,
                  "backgroundUrl": "http://p1.music.126.net/nTvqDBgFEjNbElUSZGiNYA==/7784542325594668.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": null,
                  "djStatus": 0,
                  "vipType": 0,
                  "remarkName": null,
                  "avatarImgIdStr": "2910407281057262",
                  "backgroundImgIdStr": "7784542325594668"
              },
              "urlInfo": {
                  "id": "44E734ADF9494F76DED353CFB14BA456",
                  "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/RxBlpB92_2080765629_shd.mp4?ts=1587978837&rid=C9763BACC882C6BFCFDB2EDF1996A5B6&rl=3&rs=hgcWGVVdzCAkHDPnbCVReWlsZfrCRAXi&sign=e48b6d8fdc4abe866e570e1007b7afc3&ext=RYwO7tsH5lISidpSmqhzlv7gevK7KF2k%2Fip9YFCzP1PVytMA%2FAzKxxheP1gkM%2BnmE2HY%2FIIB9VnKdIW47ktriXGfNiqH8sTWrpfHdqtfoHi%2F2mX%2FGidKmNX4GRrP%2BmlSr9zDEcv2QeM764PopLdFjPIN1cP7%2BJ9V4pjEMfRUNW4wmdiU9yeiTZhLyVeu4Bcs61TNWPsY4%2F4TbT4dW5dSRM7ikGqsSfm9S3Vo3JmDXfYNmFjK%2FlZuivtI7agqsbVV",
                  "size": 80891565,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 720
              },
              "videoGroup": [
                  {
                      "id": -11471,
                      "name": "#「诗酒趁民谣」#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 243125,
                      "name": "#歌手#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 57109,
                      "name": "民谣现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 59101,
                      "name": "华语现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 57110,
                      "name": "饭拍现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 1100,
                      "name": "音乐现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 58100,
                      "name": "现场",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "鼓楼先生",
                      "id": 38679583,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 5352,
                              "name": "王梵瑞",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": null,
                      "fee": 0,
                      "v": 3,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 3427653,
                          "name": "鼓楼先生",
                          "picUrl": "http://p1.music.126.net/B-361-fhnmOghRW9kM9AFA==/3261151495589919.jpg",
                          "tns": [],
                          "pic": 3261151495589919
                      },
                      "dt": 277105,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 11086410,
                          "vd": -2.68
                      },
                      "m": {
                          "br": 160000,
                          "fid": 0,
                          "size": 5543227,
                          "vd": -2.26
                      },
                      "l": {
                          "br": 96000,
                          "fid": 0,
                          "size": 3325954,
                          "vd": -2.28
                      },
                      "a": null,
                      "cd": "1",
                      "no": 1,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 2,
                      "s_id": 0,
                      "mv": 0,
                      "cp": 36009,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 1450061231105,
                      "privilege": {
                          "id": 38679583,
                          "fee": 0,
                          "payed": 0,
                          "st": 0,
                          "pl": 320000,
                          "dl": 999000,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 320000,
                          "toast": false,
                          "flag": 128,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "44E734ADF9494F76DED353CFB14BA456",
              "durationms": 251000,
              "playTime": 10277,
              "praisedCount": 30,
              "praised": false,
              "subscribed": false
          }
      },
      {
          "type": 1,
          "displayed": false,
          "alg": "onlineHotGroup",
          "extAlg": null,
          "data": {
              "alg": "onlineHotGroup",
              "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
              "threadId": "R_VI_62_86076058A86523E0C86829D96DF73D25",
              "coverUrl": "https://p1.music.126.net/9JEW-3mAzFQ6YaQunbKLEw==/109951164224935950.jpg",
              "height": 1080,
              "width": 1920,
              "title": "（乐队的夏天）旅行团《Bye Bye》燃炸现场架子鼓版",
              "description": "喜欢的朋友请点赞、评论、转发、关注！感谢！\n\n架子鼓教学咨询、合作，请发网易云私信~\n\n#旅行团##鼓手李昊##架子鼓##乐队的夏天#",
              "commentCount": 11,
              "shareCount": 50,
              "resolutions": [
                  {
                      "resolution": 240,
                      "size": 52780101
                  },
                  {
                      "resolution": 480,
                      "size": 59353873
                  },
                  {
                      "resolution": 720,
                      "size": 121168791
                  },
                  {
                      "resolution": 1080,
                      "size": 190327430
                  }
              ],
              "creator": {
                  "defaultAvatar": false,
                  "province": 120000,
                  "authStatus": 0,
                  "followed": false,
                  "avatarUrl": "http://p1.music.126.net/I-W7j3_-K-s8DuiyRSzQ0A==/109951163177205268.jpg",
                  "accountStatus": 0,
                  "gender": 1,
                  "city": 120101,
                  "birthday": -1574323200000,
                  "userId": 106962974,
                  "userType": 201,
                  "nickname": "鼓手李昊",
                  "signature": "感谢您的关注，架子鼓教学、合作请发私信（坐标天津）",
                  "description": "",
                  "detailDescription": "",
                  "avatarImgId": 109951163177205260,
                  "backgroundImgId": 2002210674180201,
                  "backgroundUrl": "http://p1.music.126.net/o3G7lWrGBQAvSRt3UuApTw==/2002210674180201.jpg",
                  "authority": 0,
                  "mutual": false,
                  "expertTags": null,
                  "experts": {
                      "1": "音乐原创视频达人"
                  },
                  "djStatus": 0,
                  "vipType": 10,
                  "remarkName": null,
                  "avatarImgIdStr": "109951163177205268",
                  "backgroundImgIdStr": "2002210674180201",
                  "avatarImgId_str": "109951163177205268"
              },
              "urlInfo": {
                  "id": "86076058A86523E0C86829D96DF73D25",
                  "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/T72rJjVK_2599520243_uhd.mp4?ts=1587978837&rid=C9763BACC882C6BFCFDB2EDF1996A5B6&rl=3&rs=iThuuwtVcPrQfbzMBGIfVMqaZPrzcqWt&sign=02191483814240699fc15fa1c6564cf7&ext=RYwO7tsH5lISidpSmqhzlv7gevK7KF2k%2Fip9YFCzP1PVytMA%2FAzKxxheP1gkM%2BnmE2HY%2FIIB9VnKdIW47ktriXGfNiqH8sTWrpfHdqtfoHi%2F2mX%2FGidKmNX4GRrP%2BmlSr9zDEcv2QeM764PopLdFjPIN1cP7%2BJ9V4pjEMfRUNW4wmdiU9yeiTZhLyVeu4Bcs61TNWPsY4%2F4TbT4dW5dSRM7ikGqsSfm9S3Vo3JmDXfYNmFjK%2FlZuivtI7agqsbVV",
                  "size": 190327430,
                  "validityTime": 1200,
                  "needPay": false,
                  "payInfo": null,
                  "r": 1080
              },
              "videoGroup": [
                  {
                      "id": -35955,
                      "name": "#民谣 |岁月缱绻时光，愿你依旧从前模样#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 243125,
                      "name": "#歌手#",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 13213,
                      "name": "架子鼓",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 23116,
                      "name": "音乐推荐",
                      "alg": "groupTagRank"
                  },
                  {
                      "id": 5100,
                      "name": "音乐",
                      "alg": "groupTagRank"
                  }
              ],
              "previewUrl": null,
              "previewDurationms": 0,
              "hasRelatedGameAd": false,
              "markTypes": null,
              "relateSong": [
                  {
                      "name": "Bye Bye (Live版)",
                      "id": 553534119,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 12111,
                              "name": "旅行团",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": null,
                      "fee": 8,
                      "v": 7,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 38388032,
                          "name": "旅行团＆魏如萱·专场",
                          "picUrl": "http://p1.music.126.net/7R0LJIe_2S4CGb2x4KH4hw==/109951163252089347.jpg",
                          "tns": [],
                          "pic_str": "109951163252089347",
                          "pic": 109951163252089340
                      },
                      "dt": 250269,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 10013301,
                          "vd": -20400
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 6007998,
                          "vd": -17900
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 4005346,
                          "vd": -16300
                      },
                      "a": null,
                      "cd": "01",
                      "no": 9,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 0,
                      "s_id": 0,
                      "mv": 0,
                      "cp": 723012,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 1523980800007,
                      "privilege": {
                          "id": 553534119,
                          "fee": 8,
                          "payed": 0,
                          "st": 0,
                          "pl": 128000,
                          "dl": 0,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 128000,
                          "toast": false,
                          "flag": 256,
                          "preSell": false
                      }
                  },
                  {
                      "name": "逝去的歌",
                      "id": 36199725,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 12111,
                              "name": "旅行团",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [],
                      "pop": 100,
                      "st": 0,
                      "rt": null,
                      "fee": 8,
                      "v": 28,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 3421297,
                          "name": "10 DAY'S",
                          "picUrl": "http://p1.music.126.net/R1wF5dI7IZo_5UU3bY-9og==/3274345633602742.jpg",
                          "tns": [],
                          "pic": 3274345633602742
                      },
                      "dt": 294366,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 11777088,
                          "vd": -8500
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 7066270,
                          "vd": -6000
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 4710861,
                          "vd": -4400
                      },
                      "a": null,
                      "cd": "1",
                      "no": 3,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 2,
                      "s_id": 0,
                      "mv": 0,
                      "cp": 22031,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 1446566400007,
                      "privilege": {
                          "id": 36199725,
                          "fee": 8,
                          "payed": 0,
                          "st": 0,
                          "pl": 128000,
                          "dl": 0,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 128000,
                          "toast": false,
                          "flag": 0,
                          "preSell": false
                      }
                  },
                  {
                      "name": "奔跑在孤傲的路上",
                      "id": 39436490,
                      "pst": 0,
                      "t": 0,
                      "ar": [
                          {
                              "id": 12111,
                              "name": "旅行团",
                              "tns": [],
                              "alias": []
                          }
                      ],
                      "alia": [
                          "电视剧《旋风十一人》插曲"
                      ],
                      "pop": 100,
                      "st": 0,
                      "rt": null,
                      "fee": 8,
                      "v": 6,
                      "crbt": null,
                      "cf": "",
                      "al": {
                          "id": 3421297,
                          "name": "10 DAY'S",
                          "picUrl": "http://p1.music.126.net/R1wF5dI7IZo_5UU3bY-9og==/3274345633602742.jpg",
                          "tns": [],
                          "pic": 3274345633602742
                      },
                      "dt": 236772,
                      "h": {
                          "br": 320000,
                          "fid": 0,
                          "size": 9473088,
                          "vd": -23699
                      },
                      "m": {
                          "br": 192000,
                          "fid": 0,
                          "size": 5683870,
                          "vd": -21099
                      },
                      "l": {
                          "br": 128000,
                          "fid": 0,
                          "size": 3789261,
                          "vd": -19300
                      },
                      "a": null,
                      "cd": "1",
                      "no": 8,
                      "rtUrl": null,
                      "ftype": 0,
                      "rtUrls": [],
                      "djId": 0,
                      "copyright": 0,
                      "s_id": 0,
                      "mv": 0,
                      "cp": 1400821,
                      "rurl": null,
                      "rtype": 0,
                      "mst": 9,
                      "publishTime": 1450663760292,
                      "privilege": {
                          "id": 39436490,
                          "fee": 8,
                          "payed": 0,
                          "st": 0,
                          "pl": 128000,
                          "dl": 0,
                          "sp": 7,
                          "cp": 1,
                          "subp": 1,
                          "cs": false,
                          "maxbr": 999000,
                          "fl": 128000,
                          "toast": false,
                          "flag": 0,
                          "preSell": false
                      }
                  }
              ],
              "relatedInfo": null,
              "videoUserLiveInfo": null,
              "vid": "86076058A86523E0C86829D96DF73D25",
              "durationms": 174824,
              "playTime": 53398,
              "praisedCount": 235,
              "praised": false,
              "subscribed": false
          }
      }
  ]

    // 2. 将获取到数据同之前的数据合并
    setTimeout(() => {
      // 模拟一下
      let videoList = this.data.videoList;
      videoList = videoList.concat(newVideoList); //数组的拼接方法,有返回值要接下,没有改变原数组
      wx.hideLoading(); // 关闭loading

      // 3更新状态 , 可以再appData里看到,应该是8+8=16条视频数据
      this.setData({
        videoList
      })

    }, 2000);


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
    // 缺点： 针对于整个页面的 ,就是当页面高度大的时候,超出部分,有滚动条了,会触发,可以吧wxml页面的底部测试view打开看下
    console.log('页面滑到底部了。。。');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //就是自定义button转发分享三个点... 那个按钮,的一些样式设置
    console.log('用户转发分享'); 
    // 这些操作如果在真机上操作要去小程序开发权限里设置 添加开发人员...
    return {
      title: "这是我自定义的转发内容",
      path: '/pages/video/video',
      imageUrl: '/static/images/02.jpg' //图片路径一定要绝对路径
    }

  }
})