// pages/publish/publish.js
import Toast from '../../UI/dist/toast/toast';
const host = "http://172.26.94.161:7198/delegations"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    error_name: "",
    description: "",
    error_desc: "",
    deadline: "",
    type: "",
    reward: 5,
    input_type: false,
    input_deadline: false,
    types: ["填写问卷","取快递","拿外卖","买东西"],
    min_minute: (new Date().getMinutes()+15)%60,
    min_hour: (new Date().getMinutes() + 15 >= 60) ? new Date().getHours() + 1 : new Date().getHours(),
    title: "",
    number: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布委托'
    })
    var minute = (new Date().getMinutes() +15)%60
    var hour = (new Date().getMinutes() + 15 >= 60) ? new Date().getHours() + 1 : new Date().getHours()
    this.setData({
      deadline: hour.toString() + ":" + ((minute < 10) ? "0" : "") + minute.toString()
    })
  },

  nameHelp: function () {
    Toast('委托名格式:不能含有空格,最长12位')
  },
  nameChange: function (e) {
    this.setData({
      error_name: ""
    })
  },
  nameConfirm: function (e) {
    var reg = /\s+/;
    if (e.detail.value == "") {
      this.setData({
        error_name: "不能为空"
      })
    } else if (e.detail.value.match(reg)) {
      this.setData({
        error_name: "不能含有空格"
      })
    } else {
      this.setData({
        name: e.detail.value
      })
    }
  },
  descriptionHelp: function() {
    Toast('学号格式:不能超过120字')
  },
  descriptionChange: function () {
    this.setData({
      error_desc: ""
    })
  },
  descriptionConfirm: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  selectDeadline: function(){
    this.setData({
      input_deadline: true
    })
  },
  inputDeadlineCancel: function(){
    this.setData({
      input_deadline: false
    })
  },
  deadlineConfirm: function(e){
    console.log(e)
    this.setData({
      deadline: e.detail,
      input_deadline: false
    })
  },
  selectType: function(){
    this.setData({
      input_type: true
    })
  },
  inputTypeCancel: function(){
    this.setData({
      input_type: false
    })
  },
  typeConfirm: function(e){
    console.log(e.detail.value)
    this.setData({
      type: e.detail.value,
      input_type: false
    })
  },
  rewardChange: function(e){
    this.setData({
      reward: e.detail
    })
  },
  titleChange: function(e){
    this.setData({
      title: e.detail
    })
  },
  numberChange: function (e) {
    this.setData({
      number: e.detail
    })
    console.log(this.data.number)
  },
  publish: function(){
    if (this.data.error_desc != "" || this.data.error_name != "" || this.data.name == ""||this.data.type==""
    ||this.data.title==""){
      Toast.fail("格式错误")
      return
    }
    var questions = wx.getStorageSync("questions")
    if (this.data.type == "填写问卷" && questions.length==0){
      Toast.fail("发布问卷时,问卷不能为空")
      return
    }
    var questionnaire = {
      title: this.data.title,
      questions: questions
    }
    var hour = parseInt(this.data.deadline.slice(0,2))
    var minute = parseInt(this.data.deadline.slice(3))
    var date = new Date()
    date.setHours(hour)
    date.setMinutes(minute)
    wx.request({
      method: "POST",
      url: host,
      data: {
        name: this.data.name,
        description: this.data.description,
        reward: this.data.reward,
        deadline: parseInt(date.getTime()/1000),
        type: this.data.type,
        questionnaire: questionnaire,
        number: this.data.number
      },
      success: res=>{
        wx.removeStorageSync("questions")
        var code = res.data.code
        if(code == 200){
          Toast.success({
            mask:true,
            message: "发布成功",
            onClose: function(){
              wx.switchTab({
                url: '../index/index',
              })
            }
          })
        }
        else {
          Toast.fail("发布失败,请稍后再试")
        }
      },
      fail: function () {
        Toast.fail("发布失败,请稍后再试")
      }
    })
  },
  cancelPublish: function(){
    wx.removeStorageSync("questions")
    wx.switchTab({
      url: '../index/index',
    })
  },
  goToQuestions: function(){
    wx.navigateTo({
      url: '../questionnaire/questionnaire',
    })
  } 
})