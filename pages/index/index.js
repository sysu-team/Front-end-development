//index.js
//获取应用实例
import Toast from '../../UI/dist/toast/toast';
const app = getApp()
const host = "http://172.26.110.154:7198/delegations"
Page({
  data: {
    delegations: [{
      name: "test",
      reward: 10.00,
      id: 0,
      description: "test"
    }],
    page: 0,
    limit: 10,
    img: "../../../source/image/订单.png",
    loadmore: false
  },
  //事件处理函数

  onLoad: function() {
    var url = host + "?page=" + this.data.page.toString() + "&limit=" + this.data.limit.toString()
    console.log(url)
    wx.showLoading({
      mask: true,
      title: '正在加载',
      success: function() {
        wx.request({
          url: url,
          success: res => {
            setTimeout(function() {
              wx.hideLoading()
            }, 1200)
            console.log(res)
            var arr = this.data.delegations.concat(res.data.data)
            console.log(arr)
            this.setData({
              delegations: arr,
            })
            var pagination = res.data.pagination
            if (pagination.total == this.data.limit) {
              this.setData({
                page: this.data.page + 1
              })
            }
          },
          fail: function() {
            wx.hideLoading()
            Toast.fail("加载失败,请稍后再试")
          }
        })
      },
      fail: function() {
        wx.hideLoading()
        Toast.fail("加载失败,请稍后再试")
      }
    })
  },
  onPullDownRefresh: function() {
    this.setData({
      page: 0,
      limit: 10,
      delegations: [],
      loadmore: false
    })
    var url = host + "?page=" + this.data.page.toString() + "&limit=" + this.data.limit.toString()
    console.log(url)
    wx.showLoading({
      mask: true,
      title: '正在加载',
      success: function() {
        wx.request({
          url: url,
          success: res => {
            setTimeout(function() {
              wx.hideLoading()
              wx.stopPullDownRefresh()
            }, 1200)
            console.log(res)
            var arr = this.data.delegations.concat(res.data.data)
            console.log(arr)
            this.setData({
              delegations: arr,
            })
            var pagination = res.data.pagination
            if (pagination.total == this.data.limit) {
              this.setData({
                page: this.data.page + 1
              })
            }
          },
          fail: function() {
            wx.hideLoading()
            wx.stopPullDownRefresh()
            Toast.fail("加载失败,请稍后再试")
          }
        })
      },
      fail: function() {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        Toast.fail("加载失败,请稍后再试")
      },
    })
  },
  onReachBottom: function() {
    this.setData({
      loadmore: true,
      limit: this.data.limit * 2,
    })
    var url = host + "?page=" + this.data.page.toString() + "&limit=" + this.data.limit.toString()
    console.log(url)
    wx.request({
      url: url,
      success: res => {
        this.setData({
          loadmore: false
        })
        console.log(res)
        var arr = this.data.delegations.concat(res.data.data)
        console.log(arr)
        this.setData({
          delegations: arr,
        })
        var pagination = res.data.pagination
        if (pagination.total == this.data.limit) {
          this.setData({
            page: this.data.page + 1
          })
        }
      },
      fail: function() {
        this.setData({
          loadmore: false
        })
        Toast.fail("加载失败,请稍后再试")
      }
    })
  },
  acceptDelegation: function(e) {
    console.log(e.target)
    var delegation_id = e.target.dataset.id
    console.log(delegation_id)
    wx.request({
      url: host + '/{' + delegation_id.toString() + '}',
      success: res => function() {
        var code = res.data.code
        if (code == 200) {
          Toast.success({
            message: "委托接受成功",
            onClose: function() {
              wx.switchTab({
                url: '../logs',
              })
            }
          })
        } else if (code == 401) {
          Toast.fail({
            message: "委托接受失败,该委托已被他人接受或过期",
            onClose: function() {
              wx.startPullDownRefresh()
            }
          })
        }
      },
      fail: function() {
        Toast.fail({
          message: "委托接受失败,该委托已被他人接受或过期",
          onClose: function() {
            wx.startPullDownRefresh()
          }
        })
      }
    })
  },
  //搜索框
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})