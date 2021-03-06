//index.js
//获取应用实例
const app = getApp()
const urls = require("../../utils/request.js")
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    hasIsAuth: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '/images/banner1.jpg',
      '/images/banner2.jpg',
      '/images/banner3.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    // 在没有 open-type=getUserInfo 版本的兼容处理
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasIsAuth: app.globalData.isAuthUser,
          hasUserInfo: true
        })
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          
        }
      })
    }
  },
  onShow: function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }

    // wx.request({
    //   url: urls.userInfo,
    //   data: { token: app.globalData.token },
    //   method: "GET",
    //   success: res => {
    //     if(res.data.data.isAuthUser == 1){
    //       this.setData({
    //         hasIsAuth:true
    //       });
    //     }else{
    //       this.setData({
    //         hasIsAuth: false
    //       });
    //     }
    //   }
    // });
    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toAuth: function(){
    wx.navigateTo({
      url: '../auth/auth'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res);
    return {
      title:"我的转发",
      imageUrl:"/images/banner1.jpg"
    }
  },
  gotoRunRecord:function(){
    wx.navigateTo({
      url: '../demo/demo'
    })
  },
  gotoRunRank:function(){
    wx.navigateTo({
      url: '../rank/rank'
    })
  }
})
