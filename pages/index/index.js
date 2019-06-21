//index.js 
//获取应用实例
import Toast from '../../UI/dist/toast/toast';
const app = getApp()
const host = "http://172.26.94.161:7198/delegations"
Page({
  data: {
    delegations: [],
    page: 1,
    limit: 10,
    state: 0,
    img: "../../../source/image/订单.png",
    loadmore: false
  },
  generateUrl() {
    return host + "?page=" + this.data.page.toString()
      + "&limit=" + this.data.limit.toString() + "&state=0"
  },
  //事件处理函数
  onLoad: function() {
    // using new api
    var url = this.generateUrl()
    console.log(url)
    var that = this
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
            var  arr = res.data.data
            arr.forEach(obj => {
              obj.deadline = new Date(obj.deadline * 1000).toLocaleString
            })
            that.setData({
              delegations: arr,
            })
            var pagination = res.data.pagination
            if (pagination.total == that.data.limit) {
              that.setData({
                page: that.data.page + 1
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
  onShow: function(){
    wx.startPullDownRefresh({
      success: function(){
        console.log("refreshing")
      }
    })
  },
  onPullDownRefresh: function() {
    this.setData({
      page: 1,
      limit: 10,
      delegations: [],
      loadmore: false
    })
    var url = this.generateUrl()
    console.log(url)
    var that = this
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
            console.log(res.data.data)
            var arr = res.data.data
            arr.forEach(obj => {
              obj.deadline = new Date(obj.deadline * 1000).toLocaleString()
            })
            that.setData({
              delegations: arr,
            })
            var pagination = res.data.pagination
            if (pagination.total == that.data.limit) {
              that.setData({
                page: that.data.page + 1
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
    var url = this.generateUrl()
    console.log(url)
    wx.request({
      url: url,
      success: res => {
        this.setData({
          loadmore: false
        })
        console.log(res)
        var arr = res.data.data
        arr.forEach(obj => {
          obj.deadline = new Date(obj.deadline * 1000).toLocaleString()
        })
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
    var delegationIDs = new Array();
    delegationIDs = wx.getStorageSync("delegationIDs") || [];
    delegationIDs.unshift(e.target.dataset.id);
    wx.setStorageSync("delegationIDs", delegationIDs);
    if (!app.globalData.has_login){
      Toast.fail("你尚未登录,请前往\"我的->登录\"")
      return
    }
    console.log(e.target)
    var delegation_id = e.target.dataset.id
    console.log(delegation_id)
    var url = host + '/' + delegation_id.toString() +'/accept'
    console.log(url)
    wx.request({
      method: "PUT",
      url: url,
      success: res =>{
        var code = res.data.code
        console.log(code)
        if (code == 200) {
          Toast.success({
            message: "委托接受成功",
            onClose: function() {
              app.accept_del_id = delegation_id.toString()
              wx.switchTab({
                url: '../logs/logs',
              })
            }
          })
        } else if (code == 401) {
          Toast.fail({
            message: "委托接受失败",
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
  publishDelegation: function(){
    if (!app.globalData.has_login) {
      Toast.fail("你尚未登录,请前往\"我的->登录\"")
      return
    }
    wx.navigateTo({
      url: '../publish/publish',
    })
  }
})