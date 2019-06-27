// pages/questionnaire/questionnaire.js
import Toast from '../../UI/dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: "begin",
    topic: "",
    options: [],
    questions: [],
    button: "添加选项",
    option:"",
    input: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  addQuestion: function() {
    this.setData({
      state: "add"
    })
  },
  deleteQuestion: function(e){
    console.log(e.target)
    var index = e.target.dataset.index
    var arr = this.data.questions
    arr.splice(index,1)
    this.setData({
      questions: arr
    })
  },
  addTopic: function () {
    this.setData({
      state: "topic"
    })
  },
  addOptions: function(){
    if (this.data.topic.length == 0) {
      Toast.fail("题目不能为空")
      return;
    }
    this.setData({
      state: "options"
    })
  },
  beginInput: function(){
    if(!this.data.input){
      this.setData({
        input: true,
        button: "完成"
      })  
    } else {
      if (this.data.option == 0) {
        Toast.fail("选项值不能为空")
        return;
      }
      var arr = this.data.options
      var obj = {
        option: this.data.option,
        count: 0
      }
      arr.push(obj)
      this.setData({
        option: "",
        options: arr,
        input: false,
        button: "添加选项"
      })
    }
  },
  completeInput: function(){
    if (this.data.options.length == 0) {
      Toast.fail("选项不能为空")
      return;
    }
    var question = {
      topic: this.data.topic,
      options: this.data.options
    }
    var arr = this.data.questions
    arr.push(question)
    this.setData({
      option: "",
      input: false,
      state: "begin",
      topic: "",
      options: [],
      questions: arr
    })
  },
  onChangeTopic: function(e){
    this.setData({
      topic: e.detail
    })
  },
  inputOption: function (e) {
    this.setData({
      option: e.detail
    })
  },
  completeQuestions: function(){
    if (this.data.questions.length == 0) {
      Toast.fail("问卷不能为空")
      return;
    }
    wx.setStorageSync("questions", this.data.questions)
    wx.navigateBack({
      delta: 1
    })
  },
  goBackPublish: function(){
    wx.navigateBack({
      delta: 1
    })
  }
})