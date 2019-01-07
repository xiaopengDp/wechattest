// pages/auth/auth.js
const app = getApp()
const urls = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    name:"",
    mobile:""
  },
  showTopTips:function(){
    wx.request({
      url: urls.authUser,
      data: { token: app.globalData.token,name:this.data.name,mobile:this.data.mobile },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res);
      }
    });
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  binNameInput:function(e){
    this.setData(
      {
        name:e.detail.value
      }
    );
  },
  binMobileInput: function (e) {
    this.setData(
      {
        mobile: e.detail.value
      }
    );
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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