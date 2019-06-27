// pages/questionresult/result.js
import Toast from '../../UI/dist/toast/toast';
const app = getApp();
const host = "http://172.26.94.161:7198/questionnaire/";
var time = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: null,
    title: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = host + this.data.delegation_id.toString() + "/result" ;
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.questions);
        that.setData({
          title: res.data.data.title,
          questions: res.data.data.questions
        })
        console.log(that.data.data);
      }
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