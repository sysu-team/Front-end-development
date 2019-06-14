//app.js
import './miniprogram_npm/weapp-cookie/index'
App({
  onLaunch: function() {
    //this.userLogin();
    // 登录
    //var skey = wx.getStorageSync('skey')
    //console.log(skey)
    var login = wx.getStorageSync('has_login')
    if(login){
      this.globalData.has_login = login
    }
    // if(skey){
    //   wx.checkSession({
    //     fail: function(){
    //       this.userLogin()
    //     } 
    //   })
    // } else {
    //   this.userLogin()
    // }
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
    has_login: false,
    res_code: null,
    first_login: false,
    accept_del_id: ""
  },
  /*userLogin: 
  }*/
})