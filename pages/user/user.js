// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    name: 'test',
    credits: 0,
    imgSrc: "../../source/image/我的.png",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options){
    if(typeof(app.globalData.userInfo.userName) != "undefined" && app.globalData.userInfo != null){
      this.setData({
        name: app.globalData.userInfo.userName
      })
    }
    if(typeof(app.globalData.has_registered) != "undefined"){
      this.setData({
        login: app.globalData.has_registered
      })
    }
  },

  onLoad: function(options) {
    this.setData({
      login: app.globalData.has_registered,
      name: app.globalData.userName
    })
    console.log(this.data.canIUse)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log("get success")
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    if(!e.detail.userInfo){
      wx.showModal({
        title: '获取权限失败',
        content: '获取权限失败,请重新授权',
        showCancel: false,
        success: res => {
          if(res.confirm){
            wx.switchTab({
              url: '../user/user',
            })
          }
        }
      })
    } else{
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  goToSignUp: function(){
    wx.navigateTo({
      url: '../signup/signup',
    })
  }
})