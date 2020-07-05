// pages/ssignin/ssign.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    userName: '',
    listData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userName: options.usearname
    })
    wx.request({
      url: 'http://47.97.203.22/signin/ssignin/updata.php',
      method: 'GET',
      data: {},
      header: {
        "Accept": "application/json;charset=utf8" //POST方式是这个
      },
      success: function (res) { //请求成功之后要做什么
        var pageData = res.data
        pageData.forEach(function (item, index) {
          var start_date = item.data.concat(' ' + item.airtime);
          var end_date = item.data.concat(' ' + item.endtime);
          var currenTime = util.formatTime(new Date());
          // var ms = currenTime.getTime() - start_date.getTime();
          if (start_date > currenTime) {
            item.state = 0
          } else if (start_date < currenTime) {
            if (end_date <= currenTime) {
              item.state = 2
            } else {
              // item.state=1
              wx.request({
                url: 'http://47.97.203.22/signin/ssignin/sign.php',
                method: 'GET',
                data: {
                  username: that.data.userName,
                  signid: item.id
                },
                async: false,
                header: {
                  "Accept": "application/json;charset=utf8" //POST方式是这个
                },
                success: function (res) { //请求成功之后要做什么
                  if (res.data == 1) {
                    item.state = 3
                  } else if (res.data == 2) {
                    item.state = 1
                  }
                }
              })
            }
          } else {
            item.state = 1
          }
        })
        setTimeout(function () {
          that.setData({
            listData: pageData
          })
        }, 2000)
      },
      fail: function (err) { //请求失败之后要做什么
        console.log('请求失败')
      }
    })
  },
  signin: function (e) {
    this.setData({
      id: e.currentTarget.dataset.id,
      hiddenmodalput: false,
    })
  },
  confirmM: function (e) {
    var that = this
    console.log(that.data.listData[that.data.id - 1])
    wx.request({
      url: 'http://47.97.203.22/signin/ssignin/signin.php',
      method: 'GET',
      data: {
        username: that.data.userName,
        signid: that.data.id,
        date: that.data.listData[that.data.id - 1].data,
        airtime: that.data.listData[that.data.id - 1].airtime,
        endtime: that.data.listData[that.data.id - 1].endtime
      },
      async: false,
      header: {
        "Accept": "application/json;charset=utf8" //POST方式是这个
      },
      success: function (res) { //请求成功之后要做什么
        if (res.data == 1) {
          wx.showToast({
            title: '签 到 成 功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateTo({
            url: '../ssignin/ssignin',
            })
        } else if (res.data == 2) {
          wx.showToast({
            title: '签 到 失 败',
            icon: 'failure',
            duration: 1000
          })
        }
      }
    })
    this.setData({
      hiddenmodalput: true,
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
  onShow: function () {},

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