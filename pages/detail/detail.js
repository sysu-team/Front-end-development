// pages/detail/detail.js
import Toast from '../../UI/dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reject: false,
    finish: false,
    imageURL: "../../source/image/detail.jpg",
    desc: "",
    money: ""
  },

  rejectOrder: function () {
    this.setData({
      reject: true
    })

    wx.setStorageSync('reject', this.data.reject);
    var array = wx.getStorageSync('array');
    for (var i = 0; i < array.length; i++) {
      if (array[i].desc == this.data.desc) {
        array[i].reject = this.data.reject;
        break;
      }
    }
    wx.setStorageSync('array', array);
    Toast.success({
      message: '取消成功',
      mask: true,
      onClose: function () {
        wx.switchTab({
          url: '../logs/logs',
        })
      }
    })
  },
  finishOrder: function(){
    this.setData({
      finish: true
    })

    wx.setStorageSync('finish', this.data.finish);
    var array = wx.getStorageSync('array');
    for (var i = 0; i < array.length; i++) {
      if (array[i].desc == this.data.desc) {
        array[i].finish = this.data.finish;
        break;
      }
    }
    wx.setStorageSync('array', array);
    Toast.success({
      message: '完成订单',
      mask: true,
      onClose: function () {
        wx.switchTab({
          url: '../logs/logs',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var descr = wx.getStorageSync('description');
    wx.setStorageSync('reject', this.data.reject);
    wx.setStorageSync('finish', this.data.finish);
    this.setData({
      desc: descr.desc,
      money: descr.money.substring(1, 3),
      reject: descr.reject,
      finish: descr.finish
    })
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
    wx.setStorageSync('reject', this.data.reject);
    wx.setStorageSync('finish', this.data.finish);
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