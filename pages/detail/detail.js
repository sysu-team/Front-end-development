// pages/detail/detail.js
import Toast from '../../UI/dist/toast/toast';
const app = getApp();
const host = "http://172.26.110.154:7198/delegations";
var time = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reject: false,
    finish: false,
    imageURL: "../../source/image/detail.jpg",
    desc: "",
    money: "",
    activeNames: ['1'],
    //委托详情
    publisher: null,
    receiver: null,
    start_time: null,
    reward: null,
    description: null,
    deadline: null,
    type: null,
    delegation_state: null
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
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
    console.log(options.id)
    var descr = wx.getStorageSync('description');
    wx.setStorageSync('reject', this.data.reject);
    wx.setStorageSync('finish', this.data.finish);
    this.setData({
      desc: descr.desc,
      money: descr.money.substring(1, 3),
      reject: descr.reject,
      finish: descr.finish
    });
    //对接接口
    var url = host + "/" + options.id.toString();
    console.log(url)
    var that = this
    wx.showLoading({
      mask: true,
      title: '正在加载',
      success: function () {
        wx.request({
          url: url,
          success: res => {
            setTimeout(function () {
              wx.hideLoading()
            }, 1200);
            var result = res.data.data;
            if(result.receiver == ""){
              result.receiver_name = "暂无";
            }
            that.setData({
              name: result.name,
              publisher: result.publisher,
              receiver: result.receiver_name,
              start_time: time.formatTime(result.start_time, 'Y/M/D h:m:s'),
              deadline: time.formatTime(result.deadline, 'Y/M/D h:m:s'),
              reward: result.reward,
              description: result.description,
              type: result.type,
              delegation_state: result.state,
            })
          },
          fail: function () {
            wx.hideLoading()
            Toast.fail("加载失败,请稍后再试")
          }
        })
      },
      fail: function () {
        wx.hideLoading()
        Toast.fail("加载失败,请稍后再试")
      }
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