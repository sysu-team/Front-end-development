// pages/detail/detail.js
import Toast from '../../UI/dist/toast/toast';
const app = getApp();
const host = "http://172.26.94.161:7198/delegations";
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
    img: "../../../source/image/订单.png",
    //委托详情
    publisher: null,
    receiver: null,
    start_time: null,
    reward: null,
    description: null,
    deadline: null,
    type: null,
    delegation_state: null,
    delegation_id: null,
    delegation_button: "",
    isPublisher: false
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  //取消委托
  rejectOrder: function () {
    console.log("cancel id : ", this.data.delegation_id);
    var url = host + "/" + this.data.delegation_id.toString() + "/cancel";
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
  //完成委托
  finishOrder: function(){
    console.log("finish id : ", this.data.delegation_id);
    var url = host + "/" + this.data.delegation_id.toString() + "/finish";
    wx.showModal({
      title: '完成委托',
      content: '是否确认完成委托',
      success: function(res){
        if(res.confirm){
          console.log("用户点击了确定")
          wx.request({
            method: "PUT",
            url: url,
            success: res => {
              var code = res.data.code
              console.log(code)
              if (code == 200) {
                Toast.success({
                  message: "委托完成成功",
                  onClose: function () {
                    wx.switchTab({
                      url: '../logs/logs',
                    })
                  }
                })
              } else if (code == 401) {
                Toast.fail({
                  message: "委托完成失败",
                })
              }
            },
            fail: function () {
              Toast.fail({
                message: "委托完成失败",
              })
            }
          })
        }
        else{
          console.log("用户点击了取消")
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      delegation_id: options.id
    });
    if(options.isPublish == "yes"){
      this.setData({
        delegation_button: "确认委托完成",
        isPublisher: true
      })
    }
    else{
      this.setData({
        delegation_button: "完成委托",
        isPublisher: false
      })
    }
    console.log("from: logs: ", options);
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
            console.log(result);
            if(result.receiver_id == ""){
              result.receiver_name = "暂无";
            }
            that.setData({
              name: result.delegation_name,
              publisher: result.publisher_name,
              receiver: result.receiver_name,
              start_time: time.formatTime(result.start_time, 'Y/M/D h:m:s'),
              deadline: time.formatTime(result.deadline, 'Y/M/D h:m:s'),
              reward: result.reward,
              description: result.description,
              type: result.delegation_type,
              delegation_state: result.delegation_state,
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
  glanceQuestion: function(){
    wx.setStorageSync("finishQuestion", false);
    wx.setStorageSync("delegateID", this.data.delegation_id);
    wx.navigateTo({
      url: '../questiondetail/detail',
    })
  },
  finishQuestion: function(){
    wx.setStorageSync("finishQuestion", true);
    wx.setStorageSync("delegateID", this.data.delegation_id);
    wx.navigateTo({
      url: '../questiondetail/detail',
    })
  },
  glanceResult: function () {
    wx.setStorageSync("delegateID", this.data.delegation_id);
    wx.navigateTo({
      url: '../questionresult/result',
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
  onShow: function (options) {

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