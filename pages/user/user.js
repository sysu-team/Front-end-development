// pages/user/user.js
import Toast from '../../UI/dist/toast/toast';
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
  onShow: function() {
    if (typeof(app.globalData.has_login) != "undefined") {
      this.setData({
        login: app.globalData.has_login
      })
    }
  },

  onLoad: function(options) {
    this.setData({
      login: app.globalData.has_login,
      //name: app.globalData.userName
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

  getUserInfo: function(e) {
    if (!e.detail.userInfo) {
      wx.showModal({
        title: '获取权限失败',
        content: '获取权限失败,请重新授权',
        showCancel: false,
        success: res => {
          if (res.confirm) {
            wx.switchTab({
              url: '../user/user',
            })
          }
        }
      })
    } else {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  //前往注册页面
  goToSignUp: function() {
    wx.navigateTo({
      url: '../signup/signup',
    })
  },
  //登录
  signIn: function() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          app.globalData.res_code = res.code;
          // 发起网络请求
          wx.request({
            method: 'POST',
            url: 'http://172.26.110.154:7198/users/session',
            data: {
              code: res.code
            },
            success: res => {
              //wx.setStorageSync('skey', res.header.Id)
              if (res.msg == "ok") {
                wx.setStorageSync('has_login', true)
                app.globalData.has_login = true
                this.setData({
                  name: res.data.name
                })
                Toast.success({
                  message: "登录成功!",
                  mask: true,
                  onClose: function(){
                    wx.switchTab({
                      url: '../user/user',
                    })
                  }
                })
              } else if (res.msg == "unregister_user	") {
                wx.showModal({
                  title: '登录失败',
                  content: '你尚未注册,请先注册',
                  showCancel: false,
                  success: res => {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../user/user',
                      })
                    }
                  }
                })
              } else {
                wx.showModal({
                  title: '登录失败',
                  content: '登录失败,请稍后再试',
                  showCancel: false,
                  success: res => {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../user/user',
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '登录失败',
            content: '登录失败,请稍后再试',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.setStorageSync('has_login', false)
                app.globalData.has_login = false
                wx.switchTab({
                  url: '../user/user',
                })
              }
            }
          })
        }
      }
    })
  },
  signOut: function(){
    wx.request({
      method: 'DELETE',
      url: 'http://172.26.110.154:7198/users/session',
      success: res => {
        if(res.msg == "ok"){
          Toast.success({
            message: "退出登录成功!",
            mask: true,
            onClose: function () {
              wx.switchTab({
                url: '../user/user',
              })
            }
          })
        } else {
          wx.showModal({
            title: '退出登录失败',
            content: '你尚未登录',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.switchTab({
                  url: '../user/user',
                })
              }
            }
          })
        }
      }
    })
  }
})