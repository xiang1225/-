Page({

  /**
   * 页面的初始数据
   */
  data: {
    usearname:''
  },
  // 学生登陆
  clicks: function (e) {
    var that =this
    wx.redirectTo({
      url: '../login/login?adminid=2&&usearname='+that.data.usearname,
    })
  },

  clickt: function (e) {
    var that =this
    wx.redirectTo({
      url: '../../pages/login/login?adminid=2&&usearname='+that.data.usearname,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      usearname:options.usearname
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