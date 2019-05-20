//app.js
App({
  onLaunch: function() {
    this.userLogin();
    // 登录
    var skey = wx.getStorageSync('skey')
    console.log(skey)
    var registered = wx.getStorageSync('has_registered')
    if(registered){
      this.globalData.has_registered = registered
    }
    if(skey){
      wx.checkSession({
        fail: function(){
          this.userLogin()
        } 
      })
    } else {
      this.userLogin()
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    has_registered: false,
    res_code: null,
    userName: ""
  },
  userLogin: function() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          this.globalData.res_code = res.code;
          // 发起网络请求
          wx.request({
            method: 'POST',
            url: 'https://result.eolinker.com/KfbcvQcf1c56bbf83aa178378ee348a28267771eb200000?uri=users/session',
            data: {
              code: res.code
            },
            success: res => {
              wx.setStorageSync('skey', res.header.Id)
              wx.setStorageSync('has_registered', res.data.has_registered)
              this.globalData.has_registered = res.data.has_registered
              console.log(res.header)
              console.log(res.data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})