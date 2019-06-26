// pages/help/help.js
const comi = require('../../UI/comi/comi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getFileSystemManager().readdir({
      dirPath: `${wx.env.USER_DATA_PATH}/help.md`,
      success: res => {
        var md = wx.getFileSystemManager().readFileSync(`${wx.env.USER_DATA_PATH}/help.md`, 'utf-8')
        comi(md, that)
      },
      fail: res => {
        console.log(res.errMsg)
        wx.downloadFile({
          url: 'https://raw.githubusercontent.com/sysu-team/Front-end-development/master/source/help.md',
          success(res) {
            if (res.statusCode === 200) {
              console.log(res.tempFilePath)
              wx.getFileSystemManager().saveFile({
                tempFilePath: res.tempFilePath,
                filePath: `${wx.env.USER_DATA_PATH}/help.md`,
                success: res => {
                  var md = wx.getFileSystemManager().readFileSync(`${wx.env.USER_DATA_PATH}/help.md`, 'utf-8')
                  console.log(md)
                  comi(md, that)
                },
                fail: res => {
                  console.log(res.errMsg)
                }
              })
            }
          }
        })
      }
    })
  },


})