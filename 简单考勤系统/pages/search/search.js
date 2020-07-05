Page({
  data: {
    airtime:'',
    endtime:'',
    listData: [
    ]
  },
  onLoad: function (option) {
    var that=this;
    this.setData({
      usearName:option.usearname
    })
    wx.request({
      url: 'http://47.97.203.22/signin/search/updata.php',
      method: 'GET',
      data: {
      },
      header: {
        "Accept": "application/json;charset=utf8" //POST方式是这个
      },
      success: function (res) { //请求成功之后要做什么
        that.setData({
          listData:res.data
        })
      },
      fail: function (err) { //请求失败之后要做什么
        console.log('请求失败')
      }
    })
  },
  leave:function(e){
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

  searchs:function(e){
    var that=this;
    wx.request({
      url: 'http://47.97.203.22/signin/search/search.php',
      method: 'GET',
      data: {
        airtime:this.data.airtime,
        endtime:this.data.endtime
      },
      header: {
        "Accept": "application/json;charset=utf8" //POST方式是这个
      },
      success: function (res) { //请求成功之后要做什么
        that.setData({
          listData:res.data
        })
        console.log(that.data.listData);
      },
      fail: function (err) { //请求失败之后要做什么
        console.log('请求失败')
      }
    })
  },

  airtime:function(e){
    this.setData({
      airtime:e.detail.value
    })
  },

  endtime:function(e){
    this.setData({
      endtime:e.detail.value
    })
  }

})