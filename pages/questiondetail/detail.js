// pages/yaoxh6/item/item.js
import Toast from '../../UI/dist/toast/toast';
const app = getApp();
const host = "http://172.26.94.161:7198/questionnaire/";
var time = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delegation_id: null,
    delegationName: null,
    reward: null,
    currentFatherIndex: 0,
    finishQuestion: true,
    questionnaireArray: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      finishQuestion: wx.getStorageSync('finishQuestion'),
      delegation_id: wx.getStorageSync('delegateID')
    });
    console.log(this.data.delegation_id);
    var that = this;
    var url = host + this.data.delegation_id.toString();
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log("detail:" ,res.data);
        that.setData({
          delegationName: res.data.data.Title,
        })
        console.log(res.data.data.questions);
        var questions = new Array();
        for (var i = 0; i < res.data.data.questions.length; i++){
          var answers = new Array();
          for (var j = 0; j < res.data.data.questions[i].answers.length; j++){
            var answer = {
              name: res.data.data.questions[i].answers[j].option,
              isSelected: false
            }
            answers.push(answer);
          }
          var question = {
            description: res.data.data.questions[i].topic,
            options: answers
          }
          questions.push(question);
        }
        that.setData({
          questionnaireArray: questions
        })
        console.log(that.data.questionnaireArray);
      }
    });
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
      finishQuestion: wx.getStorageSync('finishQuestion'),
      delegation_id: wx.getStorageSync('delegateID')
    });
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
    for (var i in tempArray[tempFatherIndex].options) {
      if (tempArray[tempFatherIndex].options[i].name == input.detail.value) {
        tempArray[tempFatherIndex].options[i].isSelected = true;
      }
      else {
        tempArray[tempFatherIndex].options[i].isSelected = false;
      }
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  complete: function () {
    console.log(this.data.questionnaireArray[1].options.length);
    var questions = new Array();
    for(var i=0; i<this.data.questionnaireArray.length; i++){
      var choose = new Array();
      for(var j=0; j<this.data.questionnaireArray[i].options.length; j++){
        var answer;
        if (this.data.questionnaireArray[i].options[j].isSelected == true){
          answer = {
            option: this.data.questionnaireArray[i].options[j].name,
            count: 1
          }
        }else{
          answer = {
            option: this.data.questionnaireArray[i].options[j].name,
            count: 0
          }
        }
        choose.push(answer);
      }
      var question = {
        topic: this.data.questionnaireArray[i].description,
        answers: choose 
      }
      questions.push(question);
    }
    console.log(questions);
    var questionnaire = {
      title: this.data.delegationName,
      questions: questions
    }
    var that = this //创建一个名为that的变量来保存this当前的值  
    var url = host + this.data.delegation_id.toString();
    wx.request({
      url: url,
      method: 'PUT',
      data: {
          question_result: questionnaire
      },
      success: function (res) {
        that.setData({ //这里是修改data的值  
          test: res.data //test等于服务器返回来的数据  
        });
        console.log(res.data)
      }
    });
  },
})
