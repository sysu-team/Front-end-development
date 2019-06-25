//logs.js
const time = require('../../utils/util.js');
const app = getApp();
import Toast from '../../UI/dist/toast/toast';
const host = "http://172.26.94.161:7198/users/delegations";
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
  // deleteTask: function(e){
  //   var arr = wx.getStorageSync('array');
  //   this.setData({
  //     allArray: arr
  //   });
  //   console.log("listName: ", e.currentTarget.dataset.desc);
  //   var deleteListName = e.currentTarget.dataset.desc;
  //   var new_array = new Array();
  //   var unfinish_array = new Array();
  //   var finished_array = new Array();
  //   var index = -1;
  //   for (var i = 0; i < this.data.allArray.length; i++) {
  //     if (this.data.allArray[i].id != deleteListName.id)
  //       new_array.push(this.data.allArray[i]);
  //     if (this.data.allArray[i].id != deleteListName.id && this.data.allArray[i].finish == false)
  //       unfinish_array.push(this.data.allArray[i]);
  //     if (this.data.allArray[i].id != deleteListName.id && this.data.allArray[i].finish == true)
  //       finished_array.push(this.data.allArray[i]);
  //   }
  //   this.setData({
  //     allArray: new_array,
  //     unfinishedArray: unfinish_array,
  //     finished: finished_array
  //   });
  //   wx.setStorageSync('array', this.data.allArray);
  // },
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
