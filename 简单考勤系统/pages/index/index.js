//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎进入省时签小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.request({
          url: 'http://47.97.203.22/signin/index/index.php',
          method: 'GET',
          data: {
            usearName: that.data.userInfo.nickName,
          },
          header: {
            "Accept": "application/json;charset=utf8" //POST方式是这个
          },
          success: function (res) { //请求成功之后要做什么
            if(res.data==-1){
              wx.redirectTo({
                url: "../idchoice/idchoice?usearname="+that.data.userInfo.nickName,
              })
            }else if(res.data==1){
              wx.redirectTo({
                url: "../ssignin/ssignin?usearname="+that.data.userInfo.nickName,
              })
            }else{
              wx.redirectTo({
                url: '../tsignin/tsignin?usearname='+that.data.userInfo.nickName,
              })
            }
          },
          fail: function (err) { //请求失败之后要做什么
            console.log('请求失败')
          }
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // var that = this
    // wx.request({
    //   url: 'http://47.97.203.22/signin/index/index.php',
    //   method: 'POST',
    //   data: {
    //     usearname: that.data.userInfo.nickName,
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded" //POST方式是这个
    //   },
    //   success: function (res) { //请求成功之后要做什么
    //     console.log('请求成功')
    //   },
    //   fail: function (err) { //请求失败之后要做什么
    //     console.log('请求失败')
    //   }
    // })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})