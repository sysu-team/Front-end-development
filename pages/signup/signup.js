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
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '注册'
    })
  },
  nameChange: function(e){
    this.setData({
      error_user: ""
    })
  },
  nameConfirm: function(e){
    var reg = /\s+/;
    if(e.detail.value == ""){
      this.setData({
        error_user: "不能为空"
      })
    } else if(e.detail.value.match(reg)){
      this.setData({
        error_user: "不能含有空格"
      })
    }
  },
  nameHelp: function(){
    Toast('用户名格式:不能含有空格,最长12位')
  },
  idHelp: function () {
    Toast('学号格式:不能含有空格,8位数字')
  },
  idChange: function(){
    this.setData({
      error_id: ""
    })
  },
  idConfirm: function(e){
    var reg = /\s+/;
    if (e.detail.value == "") {
      this.setData({
        error_id: "不能为空"
      })
    } else if (e.detail.value.length != 8){
      this.setData({
        error_id: "应当含有8位"
      })
    } else if (e.detail.value.match(reg)) {
      this.setData({
        error_id: "不能含有空格"
      })
    }
  },
  signUp: function () {
    app.globalData.userName = this.data.username;
    wx.request({
      url: 'https://result.eolinker.com/KfbcvQcf1c56bbf83aa178378ee348a28267771eb200000?uri=users/',
      method: 'POST',
      data: {
        code: app.globalData.res_code,
        name: this.data.username,
        student_number: this.data.id
      },
      success: res => {
        var msg = res.data.msg
        if (msg == 'ok') {
          Toast.success({
            message: '注册成功',
            mask: true,
            onClose: function () {
              app.globalData.has_registered = true;
              wx.switchTab({
                url: '../user/user',
              })
            }
          })
        } else if (msg == 'duplicated_usename') {
          Toast.fail({
            message: '用户名重复',
            mask: true,
            onClose: function () {
              this.setData({
                username: ""
              })
            }
          })
        }
      }
    })
  },
  cancelSignUp: function () {
    wx.navigateBack({
      delta: 1,
    })
  }
})