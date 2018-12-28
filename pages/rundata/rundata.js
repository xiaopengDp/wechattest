// pages/rundata/rundata.js
const urls = require("../../utils/request.js")
const utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      // { "code": "01", "text": "text1", "type": "type1" },
      // { "code": "02", "text": "text2", "type": "type2" },
      // { "code": "03", "text": "text3", "type": "type3" },
      // { "code": "04", "text": "text4", "type": "type4" },
      // { "code": "05", "text": "text5", "type": "type5" },
      // { "code": "06", "text": "text6", "type": "type6" },
      // { "code": "07", "text": "text7", "type": "type7" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listData: []
    });
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
    var that = this;
    that.setData({
      listData: []
    });
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        wx.getSetting({
          success(res) {
            //console.log("rundata---" + res.authSetting['scope.werun']);
            if (!res.authSetting['scope.werun']) {
              //console.log("rundata---werun");
              wx.authorize({
                scope: 'scope.werun',
                success() {
                  // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                  //wx.startRecord()
                  console.log("rundata---success");
                  wx.getWeRunData({
                    success(res) {
                      const encryptedData = res.encryptedData
                      //console.log(encryptedData);
                      wx.request({
                        url: urls.encryRunData,
                        data: { encryptedData: encryptedData, code: code, iv: res.iv },
                        method: "GET",
                        success: res => {
                          //console.log(res)
                          var listTemp = res.data.stepInfoList;
                          for (var i = 0; i < listTemp.length; i++) {
                            //console.log(listTemp[i].timestamp)
                            listTemp[i].timestamp = utils.formatDate(listTemp[i].timestamp)
                            //console.log(listTemp[i].timestamp)
                          }
                          that.setData({
                            listData: listTemp
                          });

                          wx.hideLoading();
                        }
                      })
                    }
                  })
                },
                fail(res){
                  wx.hideLoading();
                  console.log(res)
                  // 显示提示弹窗
                  wx.showModal({
                    title: '提示标题',
                    content: '是否需要重新设置',
                    success: function (res) {
                      if (res.confirm) {
                        wx.openSetting({
                          success: function (data) {
                            console.log(data);
                          },
                          fail: function () {
                            console.info("设置失败返回数据");
                          }
                        });
                      } else if (res.cancel) {
                        console.log("cancel");
                      }
                    }
                  });
                }
              })
            } else {
              wx.getWeRunData({
                success(res) {
                  const encryptedData = res.encryptedData
                  //console.log(encryptedData);
                  wx.request({
                    url: urls.encryRunData,
                    data: { encryptedData:encryptedData,code: code,iv:res.iv },
                    method: "GET",
                    success: res => {
                      //console.log(res)
                      var listTemp = res.data.stepInfoList;
                      for(var i = 0;i<listTemp.length;i++){
                        //console.log(listTemp[i].timestamp)
                        listTemp[i].timestamp = utils.formatDate(listTemp[i].timestamp)
                        //console.log(listTemp[i].timestamp)
                      }
                      that.setData({
                        listData: listTemp
                      });
                      wx.hideLoading();
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.werun']) {
    //       wx.authorize({
    //         scope: 'scope.werun',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           //wx.startRecord()
    //           wx.getWeRunData({
    //             success(res) {
    //               const encryptedData = res.encryptedData
    //               console.log(encryptedData);
    //               wx.request({
    //                 url: urls.encryRunData,
    //                 method: "GET",
    //                 data: { code: res.code },
    //                 success: res => {
    //                   console.log(res)
    //                 }
    //               })
    //             }
    //           })
    //         }
    //       })
    //     }else{
    //       wx.getWeRunData({
    //         success(res) {
    //           const encryptedData = res.encryptedData
    //           console.log(encryptedData);
    //           wx.request({
    //             url: urls.encryRunData,
    //             data: { code: res.code },
    //             method: "GET",
    //             success: res => {
    //               console.log(res)
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
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