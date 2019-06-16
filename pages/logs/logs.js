//logs.js
const time = require('../../utils/util.js');
const app = getApp();
import Toast from '../../UI/dist/toast/toast';
const host = "http://172.26.110.154:7198/delegations";
Page({
  data: {
    allArray: null,
    unfinishedArray: null,
    finished: null,
    myPublishArray: null,
    activeNames: ['1'],
    img: "../../../source/image/订单.png",
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  onLoad: function (options) {
    if (!app.globalData.has_login) {
      Toast.fail("你尚未登录,请前往\"我的->登录\"")
      return
    }

    //link for accept task
    var delegationIDs = wx.getStorageSync("delegationIDs");
    var acceptedTasks = new Array();
    if(delegationIDs.length == 0){
      return;
    }
    console.log(delegationIDs.length);
    for(var i=0; i<delegationIDs.length; i++){
      var url = host + "/" + delegationIDs[i];
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
              console.log(result.delegation_name);
              var task = {
                name: result.delegation_name,
                reward: result.reward,
                deadline: time.formatTime(result.deadline, 'Y/M/D h:m:s'),
                description: result.description,
                id: delegationIDs[i]
              }
              acceptedTasks.push(task);
              that.setData({
                unfinishedArray: acceptedTasks
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
    }

    //link for finished task

  },
  // viewDetail: function (e) {
  //   wx.setStorageSync("description", e.currentTarget.dataset.desc)
  //   wx.navigateTo({
  //     url: '../detail/detail',
  //   })
  // },
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

    //link for accept task
    var delegationIDs = wx.getStorageSync("delegationIDs");
    var acceptedTasks = new Array();
    if (delegationIDs.length == 0) {
      return;
    }
    console.log(delegationIDs.length);
    for (var i = 0; i < delegationIDs.length; i++) {
      var url = host + "/" + delegationIDs[i];
      app.globalData.accept_del_id = delegationIDs[i];
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
              console.log(result.delegation_name);
              var task = {
                name: result.delegation_name,
                reward: result.reward,
                deadline: time.formatTime(result.deadline, 'Y/M/D h:m:s'),
                description: result.description,
                id: app.globalData.accept_del_id
              }
              console.log("taskID: ",task.id);
              acceptedTasks.push(task);
              that.setData({
                unfinishedArray: acceptedTasks
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
    }
  }
})
