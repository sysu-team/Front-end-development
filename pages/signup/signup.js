// pages/signup/signup.js
import Toast from '../../UI/dist/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    id: "",
    error_user: "",
    error_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '注册'
    })
  },
  nameChange: function(e) {
    this.setData({
      error_user: ""
    })
  },
  nameConfirm: function(e) {
    var reg = /\s+/;
    if (e.detail.value == "") {
      this.setData({
        error_user: "不能为空"
      })
    } else if (e.detail.value.match(reg)) {
      this.setData({
        error_user: "不能含有空格"
      })
    } else {
      this.setData({
        username: e.detail.value
      })
    }
  },
  nameHelp: function() {
    Toast('用户名格式:不能含有空格,最长12位')
  },
  idHelp: function() {
    Toast('学号格式:不能含有空格,8位数字')
  },
  idChange: function() {
    this.setData({
      error_id: ""
    })
  },
  idConfirm: function(e) {
    var reg = /\s+/;
    if (e.detail.value == "") {
      this.setData({
        error_id: "不能为空"
      })
    } else if (e.detail.value.length != 8) {
      this.setData({
        error_id: "应当含有8位"
      })
    } else if (e.detail.value.match(reg)) {
      this.setData({
        error_id: "不能含有空格"
      })
    } else {
      this.setData({
        id: e.detail.value
      })
    }
  },
  signUp: function() {
    if (this.data.error_user != "" || this.data.error_id != "" || this.data.username == "" || this.data.id == "") {
      Toast.fail({
        message: "格式不正确!",
        mask: true
      })
      return
    }
    //app.globalData.userName = this.data.username;
    wx.login({
      success: res => {
        app.globalData.res_code = res.code
        console.log(app.globalData.res_code,res.code,"signup")
        wx.request({
          url: 'http://172.26.110.154:7198/users',
          method: 'POST',
          data: {
            code: res.code,
            name: this.data.username,
            student_number: this.data.id
          },
          success: res => {
            var code = res.data.code
            console.log(res)
            if (code == 200) {
              Toast.success({
                message: '注册成功',
                mask: true,
                onClose: function() {
                  app.globalData.has_login = true;
                  wx.setStorageSync('has_login', true)
                  wx.switchTab({
                    url: '../user/user',
                  })
                }
              })
            } else if (code == 401) {
              Toast.fail({
                message: '用户名重复',
                mask: true,
                onClose: function() {
                  app.globalData.has_login = false;
                  this.setData({
                    username: ""
                  })
                }
              })
            } else if (code == 402){
              Toast.fail({
                message: '学号重复',
                mask: true,
                onClose: function () {
                  app.globalData.has_login = false;
                  this.setData({
                    id: ""
                  })
                }
              })
            } else {
              Toast.fail({
                message: '注册失败,请稍后重试',
                mask: true
              })
              app.globalData.has_login = false;
            }
          }
        })
      }
    })
  },
  cancelSignUp: function() {
    wx.navigateBack({
      delta: 1,
    })
  }
})