// pages/yaoxh6/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentFatherIndex: 0,
    finishQuestion: false,
    questionnaireArray: [
      {
        "type": "SCQ",
        "content": {
          "description": "Which fruit do you like best?",
          "options":
            [
              { "name": "Lua", "isSelected": false },
              {  "name": "Java", "isSelected": false },
              { "name": "C++", "isSelected": false },
              { "name": "A++", "isSelected": false }
            ]
        }
      },
      {
        "type": "MCQ",
        "content": {
          "description": "Which fruit do you like?",
          "options":
            [
              { "id": 1, "name": "OK", "isSelected": false },
              { "id": 2, "name": "Java", "isSelected": false },
              { "id": 3, "name": "C++", "isSelected": false }
            ]
        }
      },
      {
        "type": "SAQ",
        "content": {
          "description": "What's your name?",
          "answer": "i dont know"
        }
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      finishQuestion: wx.getStorageSync('finishQuestion')
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
  onShow: function () {
    this.setData({
      finishQuestion: wx.getStorageSync('finishQuestion')
    })
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

  },

  getTempFatherIndex: function (input) {
    var tempFatherIndex = input.currentTarget.dataset.id;
    //console.log('currentFatherIndex: ' + tempFatherIndex);
    this.setData({
      currentFatherIndex: tempFatherIndex,
    });
  },

  radioChangeSCQ: function (input) {
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempArray = this.data.questionnaireArray;
    for (var i in tempArray[tempFatherIndex].content.options) {
      if (tempArray[tempFatherIndex].content.options[i].name == input.detail.value) {
        tempArray[tempFatherIndex].content.options[i].isSelected = true;
      }
      else {
        tempArray[tempFatherIndex].content.options[i].isSelected = false;
      }
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  checkboxChangeMCQ: function (input) {
    // console.log(input.detail.value);
    var flag = false;
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempArray = this.data.questionnaireArray;
    for (var i in tempArray[tempFatherIndex].content.options) {
      flag = false;
      for (var j in input.detail.value) {
        if (tempArray[tempFatherIndex].content.options[i].name == input.detail.value[j]) {
          flag = true;
        }
      }
      if (flag == true) {
        tempArray[tempFatherIndex].content.options[i].isSelected = true;
      }
      else {
        tempArray[tempFatherIndex].content.options[i].isSelected = false;
      }
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurAnswerOfSAQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.answer = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  complete: function () {
    console.log(this.data.questionnaireArray[0].content.options.length);
  },
})
