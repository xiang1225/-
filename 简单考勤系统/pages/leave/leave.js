Page({
  data: {
    hiddenmodalput: true,
    hiddenmodalput1:true,
    studentname:'',
    airtime:'',
    endtime:'',
    listData: []
  },
  onLoad: function (options) {
    this.setData({
      usearName: options.usearname,
    })
    var that = this
    wx.request({
      url: 'http://47.97.203.22/signin/leave/updata.php',
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
  studentname:function(e){
    this.setData({
      studentname:e.detail.value
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
  },
  leave:function(e){
    var that=this
    wx.redirectTo({
      url: "../leave/leave?usearname="+that.data.usearName,
    })
  },

  search: function (e) {
    var that=this
    wx.redirectTo({
      url: "../search/search?usearname="+that.data.usearName,
    })
  },
  signin: function (e) {
    var that=this
    wx.redirectTo({
      url: "../tsignin/tsignin?usearname="+that.data.usearName,
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
  confirmM: function (e) {
    var that=this
    that.setData({
      hiddenmodalput:true
    }),
    wx.request({
      url: 'http://47.97.203.22/signin/leave/add.php',
      method:'GET',
      data:{
        studentname:that.data.studentname,
        state:'1',
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
            url: '../leave/leave',
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
    this.setData({
        hiddenmodalput: true,
      })
  },
  terminate:function(e){
    wx.showModal({
      title: '提 示',
      content: '确定销假吗？',
      success (res) {
        wx.request({
          url: 'http://47.97.203.22/signin/leave/xiaoj.php',
          method:'GET',
          data:{
            id:e.target.id
          }, header:{
            "Accept":"application/json;charset=utf8"
          },
          success:function(res){
            if(res.data==2){
              wx.showToast({
                title: '销 假 成 功',
                icon: 'success',
                duration: 1000,
              })
              wx.navigateTo({
                url: '../leave/leave',
              })
            }else{
              wx.showToast({
                title: '销 假 失 败',
                icon: 'failure',
                duration: 1000
              })
            }
          },
          fail:function(err){
            console.log('请求失败')
          },


        })
      }
    })
  },
  extend:function(e){
    this.setData({
      hiddenmodalput1:false,
      extendid:e.currentTarget.dataset.id
    })
  },
  extendtime:function(e){
    this.setData({
      extendtime:e.detail.value
    })
  },
  confirm:function(e){
    var that=this
    wx.request({
      url: 'http://47.97.203.22/signin/leave/extend.php',
      method:'GET',
      data:{
        extendid:that.data.extendid,
        extendtime:that.data.extendtime
      }, header:{
        "Accept":"application/json;charset=utf8"
      },
      success:function(res){
        if(res.data==1){
          wx.showToast({
            title: '续 假 成 功',
            icon: 'success',
            duration: 1000,
          })
          wx.navigateTo({
            url: '../leave/leave',
          })
        }else{
          wx.showToast({
            title: '销 假 失 败',
            icon: 'failure',
            duration: 1000
          })
        }
      },
      fail:function(err){
        console.log('请求失败')
      },
    })
  },
  cancel:function(e){
    this.setData({
      hiddenmodalput1:true
    })
  }
})