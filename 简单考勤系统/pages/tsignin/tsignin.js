var util = require('../../utils/util.js');
Page({
  data: {
    date: '',
    airtime: '',
    endtime: '',
    hiddenmodalput: true,
    listData: []
  },
  onLoad: function (options) {
    this.setData({
      usearName: options.usearname,
    })
    var that = this
    wx.request({
      url: 'http://47.97.203.22/signin/tsignin/updata.php',
      method: 'GET',
      data: {
      },
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
            item.state = "还未开始"
          } else if (start_date < currenTime) {
            if (end_date <= currenTime) {
              item.state = "已结束"
            } else {
              item.state = "正在进行"
            }
          } else {
            item.state = "正在进行"
          }
        })
        that.setData({
          listData: pageData
        })
      },
      fail: function (err) { //请求失败之后要做什么
        console.log('请求失败')
      }
    })
  },
  leave: function (e) {
    wx.redirectTo({
      url: "../leave/leave?usearname="+this.data.usearName,
    })
  },
  search: function (e) {
    wx.redirectTo({
      url: "../search/search?usearname="+this.data.usearName,
    })
  },

  signin: function (e) {
    wx.redirectTo({
      url: "../tsignin/tsignin?usearname="+this.data.usearName,
    })
  },
  add: function (e) {
    this.setData({
      hiddenmodalput: false,
    })
  },
  cancelM: function (e) {
    this.setData({
      hiddenmodalput: true,
    })
  },
  
  datea: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  airtime: function (e) {
    this.setData({
      airtime: e.detail.value
    })
  },
  endtime: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  confirmM:function(e){
    var that=this
    that.setData({
      hiddenmodalput:true
    }),
    wx.request({
      url: 'http://47.97.203.22/signin/tsignin/add.php',
      method:'GET',
      data:{
        usearName:that.data.usearName,
        data:that.data.date,
        airtime:that.data.airtime,
        endtime:that.data.endtime
      },
      header:{
        "Accept":"application/json;charset=utf8"
      },
      success:function(res){
        if(res.data==1){
          wx.showToast({
            title: '添 加 成 功',
            icon:'success',
            duration:1000
          })
          wx.navigateTo({
            url: '../tsignin/tsignin',
          })
        }else{
          wx.showToast({
            title: '添 加 失 败',
            icon:'failue',
            duration:1000
          })
        }
      },
      fail:function(err){
        console.log('请求失败')
      },
    })
  }
})