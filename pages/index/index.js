//index.js
//获取应用实例
const app = getApp()
const host = "http://172.26.110.154:7198/delegations"
Page({
  data: {
    delegations: [{name: "test", reward: 10.00, id: 0, description: "test"}],
    page: 0,
    limit: 10,
    img: "../../../source/image/订单.png"
  },
  //事件处理函数

  onLoad: function() {
    var url = host + "?page=" + this.data.page.toString() + "&limit=" + this.data.limit.toString()
    console.log(url)
    /*wx.request({
      url: url,
      success: res => {
        console.log(res)
        var arr = this.data.delegations.concat(res.data.data)
        console.log(arr)
        this.setData({
          delegations: arr,
        })
        var pagination = res.data.pagination
        if ( pagination.total == this.data.limit) {
          this.setData({
            page: page + 1
          })
        }
      }
    })*/
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