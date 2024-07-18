// pages/goJuXian/gojuxian.js
const app = getApp()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '工具箱', //导航栏 中间的标题
      height: 0
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },


  toDianl(){
    wx.navigateTo({
      url: '/pages/goJuXian/sushedianliang/sushedianliang',
    })
  },


  tofanyi(){
    wx.navigateTo({
      url: '/pages/goJuXian/fanyi/fanyi',
    })
  }
})