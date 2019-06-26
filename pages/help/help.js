// pages/help/help.js
const comi = require('../../UI/comi/comi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var md = wx.getFileSystemManager().readFileSync('source/help.md','utf-8')
    comi(md,this)
  },

  
})