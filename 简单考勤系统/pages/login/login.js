Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    studyid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      adminid:options.adminid,
      usearname:options.usearname,
    })
  },
  nickName:function(e){
    this.setData({
      nickName:e.detail.value,
    })
  },
  studyid:function(e){
    this.setData({
      studyid:e.detail.value,
    })
  },
  //登录
  Submit:function(e){
    var that=this
    wx.request({
      url: 'http://47.97.203.22/signin/login/login.php',
      method: 'GET',
      data: {
        usearName: that.data.usearname ,
        adminid:that.data.adminid,
        nickName:that.data.nickName,
        studyid:that.data.studyid
      },
      header: {
        "Accept": "application/json;charset=utf8" //POST方式是这个
      },
      success: function (res) { //请求成功之后要做什么
        if(res.data==1&&that.data.adminid==2){
          wx.redirectTo({
            url: '../tsignin/tsignin?study='+that.data.usearName,
          })
        }else if(res.data==1&&that.data.adminid==1){
          wx.redirectTo({
            url: '../ssignin/ssignin?study='+that.data.usearName,
          })
        }else{
          wx.showToast({
            title: '登陆失败',
            icon: 'fail',
            duration: 1000
          })
        }
      },
      fail: function (err) { //请求失败之后要做什么
        console.log('请求失败')
      }
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
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (options) {

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