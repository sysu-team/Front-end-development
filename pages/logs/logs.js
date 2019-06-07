//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    allArray: null,
    unfinishedArray: null,
    finished: null,
    activeNames: ['1']
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  onLoad: function () {
    var arr = new Array();
    var unfinish_array = new Array();
    var finished_array = new Array();
    var task1 = { desc: "buy a basketball", money: "$20", reject: false ,id: 1, finish: false};
    var task2 = { desc: "take a express in post office", money: "$10", reject: false, id: 2, finish: false};
    var task3 = { desc: "take me a food", money: "$10", reject: false, id: 3, finish: false};
    var task4 = { desc: "buy a umbrella", money: "$20", reject: false, id: 4, finish: false};
    arr.push(task1);
    arr.push(task2);
    arr.push(task3);
    arr.push(task4);
    this.setData({
      allArray: arr
    });
    console.log(this.data.allArray[0]);
    for (var i = 0; i < this.data.allArray.length; i++) {
      if (this.data.allArray[i].finish == false)
        unfinish_array.push(this.data.allArray[i]);
      if (this.data.allArray[i].finish == true)
        finished_array.push(this.data.allArray[i]);
    }
    this.setData({
      unfinishedArray: unfinish_array,
      finished: finished_array
    })
    wx.setStorageSync('array', this.data.allArray);
  },
  viewDetail: function (e) {
    wx.setStorageSync("description", e.currentTarget.dataset.desc)
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  deleteTask: function(e){
    var arr = wx.getStorageSync('array');
    this.setData({
      allArray: arr
    });
    console.log("listName: ", e.currentTarget.dataset.desc);
    var deleteListName = e.currentTarget.dataset.desc;
    var new_array = new Array();
    var unfinish_array = new Array();
    var finished_array = new Array();
    var index = -1;
    for (var i = 0; i < this.data.allArray.length; i++) {
      if (this.data.allArray[i].id != deleteListName.id)
        new_array.push(this.data.allArray[i]);
      if (this.data.allArray[i].id != deleteListName.id && this.data.allArray[i].finish == false)
        unfinish_array.push(this.data.allArray[i]);
      if (this.data.allArray[i].id != deleteListName.id && this.data.allArray[i].finish == true)
        finished_array.push(this.data.allArray[i]);
    }
    this.setData({
      allArray: new_array,
      unfinishedArray: unfinish_array,
      finished: finished_array
    });
    wx.setStorageSync('array', this.data.allArray);
  },
  onShow: function (options) {
    var arr = wx.getStorageSync('array');
    var new_array = new Array();
    var result_array = new Array();
    var finish_array = new Array();
    var index = -1;
    this.setData({
      allArray: arr
    });
    for (var i = 0; i < this.data.allArray.length; i++) {
      if (this.data.allArray[i].reject == false)
        new_array.push(this.data.allArray[i]);
      if (this.data.allArray[i].reject == false && this.data.allArray[i].finish == false)
        result_array.push(this.data.allArray[i]);
      if (this.data.allArray[i].reject == false && this.data.allArray[i].finish == true)
        finish_array.push(this.data.allArray[i]);
    }
    this.setData({
      allArray: new_array,
      unfinishedArray: result_array,
      finished: finish_array
    });
    wx.setStorageSync('array', this.data.allArray);
  }
})
