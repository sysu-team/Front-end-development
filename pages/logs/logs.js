//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    array: null,
    activeNames: ['1']
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  onLoad: function () {
    var arr = new Array();
    var task1 = { desc: "buy a basketball", money: "$20", reject: false ,id: 1};
    var task2 = { desc: "take a express in post office", money: "$10", reject: false, id:2};
    var task3 = { desc: "take me a food", money: "$10", reject: false, id:3};
    var task4 = { desc: "buy a umbrella", money: "$20", reject: false, id: 4};
    arr.push(task1);
    arr.push(task2);
    arr.push(task3);
    arr.push(task4);
    this.setData({
      array: arr
    })
    wx.setStorageSync('array', this.data.array);
  },
  viewDetail: function (e) {
    wx.setStorageSync("description", e.currentTarget.dataset.desc)
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  onShow: function (options) {
    var arr = wx.getStorageSync('array');
    var result_array = new Array();
    var index = -1;
    this.setData({
      array: arr
    })
    for (var i = 0; i < this.data.array.length; i++) {
      if (this.data.array[i].reject == false)
        result_array.push(this.data.array[i]);
    }
    this.setData({
      array: result_array
    })
    wx.setStorageSync('array', this.data.array);
  }
})
