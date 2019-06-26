//logs.js
const time = require('../../utils/util.js');
const app = getApp();
import Toast from '../../UI/dist/toast/toast';
const host = "http://172.26.94.161:7198/users/delegations";
const host2 = "http://172.26.94.161:7198/delegations";
Page({
  data: {
    page: 1,
    limit: 10,
    allArray: null,
    acceptedArray: [],
    finished: [],
    myPublishArray: [],
    activeNames: ['1'],
    img: "../../../source/image/订单.png",
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  generateUrl(state) {
    return host + "?page=" + this.data.page.toString()
      + "&limit=" + this.data.limit.toString() + "&query_type="+state.toString();
  },
  deleteTask: function(){
    
  },

  onLoad: function (options) {
    if (!app.globalData.has_login) {
      Toast.fail("你尚未登录,请前往\"我的->登录\"")
      return
    }

    //link for accepted task
    var acceptedTasks = new Array();
    var url = this.generateUrl(1);
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
            console.log("1: ", result);
            result.forEach(obj => {
              obj.deadline = time.formatTime(obj.deadline, 'Y/M/D h:m:s')
            })
            that.setData({
              acceptedArray: result
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
    });

    //link for finished task
    var finishedTasks = new Array();
    var url2 = this.generateUrl(2);
    var that = this
    wx.showLoading({
      mask: true,
      title: '正在加载',
      success: function () {
        wx.request({
          url: url2,
          success: res => {
            setTimeout(function () {
              wx.hideLoading()
            }, 1200);
            var result = res.data.data;
            if(result.length == 0) return;
            console.log("2: ", result);
            result.forEach(obj => {
              obj.deadline = time.formatTime(obj.deadline, 'Y/M/D h:m:s')
            })
            that.setData({
              finished: result
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
    });

    //link for published task
    var publishedTasks = new Array();
    var url3 = this.generateUrl(0);
    var that = this
    wx.showLoading({
      mask: true,
      title: '正在加载',
      success: function () {
        wx.request({
          url: url3,
          success: res => {
            setTimeout(function () {
              wx.hideLoading()
            }, 1200);
            var result = res.data.data;
            if(result.length == 0) return;
            console.log("0: ", result[0].name);
            result.forEach(obj => {
              obj.deadline = time.formatTime(obj.deadline, 'Y/M/D h:m:s')
            })
            that.setData({
              myPublishArray: result
            })
            console.log("data: ", that.data.myPublishArray[0].name);
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
    });
  },
  //取消委托
  deleteTask: function(e){
    var id = e.currentTarget.dataset.id;
    console.log("cancel id: ", id);
    var url = host2 + "/" + id.toString() + "/cancel";
    wx.showModal({
      title: '取消委托',
      content: '是否确认取消委托',
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          console.log('用户点击了确定')
          wx.request({
            method: "PUT",
            url: url,
            success: res => {
              var code = res.data.code
              console.log(code)
              if (code == 200) {
                Toast.success({
                  message: "委托取消成功",
                  onClose: function () {
                    wx.switchTab({
                      url: '../logs/logs',
                    })
                  }
                })
              } else if (code == 401) {
                Toast.fail({
                  message: "委托取消失败",
                })
              }
            },
            fail: function () {
              Toast.fail({
                message: "委托取消失败",
              })
            }
          })
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },

  onShow: function (options) {
    if (!app.globalData.has_login) {
      Toast.fail("你尚未登录,请前往\"我的->登录\"")
      return
    }

    //link for accepted task
    var acceptedTasks = new Array();
    var url = this.generateUrl(1);
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
            console.log("1: ", result);
            result.forEach(obj => {
              obj.deadline = time.formatTime(obj.deadline, 'Y/M/D h:m:s')
            })
            that.setData({
              acceptedArray: result
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
    });

    //link for finished task
    var finishedTasks = new Array();
    var url2 = this.generateUrl(2);
    var that = this
    wx.showLoading({
      mask: true,
      title: '正在加载',
      success: function () {
        wx.request({
          url: url2,
          success: res => {
            setTimeout(function () {
              wx.hideLoading()
            }, 1200);
            var result = res.data.data;
            if (result.length == 0) return;
            console.log("2: ", result);
            result.forEach(obj => {
              obj.deadline = time.formatTime(obj.deadline, 'Y/M/D h:m:s')
            })
            that.setData({
              finished: result
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
    });

    //link for published task
    var publishedTasks = new Array();
    var url3 = this.generateUrl(0);
    var that = this
    wx.showLoading({
      mask: true,
      title: '正在加载',
      success: function () {
        wx.request({
          url: url3,
          success: res => {
            setTimeout(function () {
              wx.hideLoading()
            }, 1200);
            var result = res.data.data;
            if (result.length == 0) return;
            console.log("0: ", result[0].name);
            result.forEach(obj => {
              obj.deadline = new Date(obj.deadline * 1000).toLocaleString()
            })
            that.setData({
              myPublishArray: result
            })
            console.log("data: ", that.data.myPublishArray[0].name);
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
    });
    
    
  }
})
