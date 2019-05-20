//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    array: null
  },
  onLoad: function () {
    var arr = new Array();
    var task1 = { desc: "buy a basketball", money: "$20"};
    var task2 = { desc: "take a express in post office", money: "$10" };
    var task3 = { desc: "take me a food", money: "$10" };
    var task4 = { desc: "buy a umbrella", money: "$20" };
    arr.push(task1);
    arr.push(task2);
    arr.push(task3);
    arr.push(task4);
    this.setData({
      array: arr
    })
  },
  viewDetail: function(e){
    console.log(e.currentTarget.dataset.desc);
    wx.setStorageSync("description", e.currentTarget.dataset.desc)
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})
