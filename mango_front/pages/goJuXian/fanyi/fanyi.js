// pages/goJuXian/fanyi/fanyi.js
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

    input:"",
    fy:"",

    pok:[  
      { id: 0, name: "简体中文（中国大陆）", code: "zh_CN" },  
      { id: 1, name: "繁体中文（台湾）", code: "zh_TW" },  
      { id: 2, name: "繁体中文（香港）", code: "zh_HK" },  
      { id: 3, name: "英语", code: "en" },  
      { id: 4, name: "韩语", code: "ko" },  
      { id: 5, name: "日语", code: "ja" }  
    ],

    yuan:"",
    mubiao:"",

    yuanindex:null,
    muindex:null,

  },

  textareaBInput(e){
    this.setData({
      input:e.detail.value
    })
  },

  yuanChange: function(e) {
    this.setData({
      yuanindex: e.detail.value
    })
  },
  muChange: function(e) {
    this.setData({
      muindex: e.detail.value
    })
  },

  fyi(e){
    let that = this
    if(this.data.yuanindex != null && this.data.muindex != null){
        wx.serviceMarket.invokeService({
          service: 'wxf5c22ebbe4ed811e',
          api: 'multilingualMT',
          data: {
            "q": that.data.input, // 待翻译的句子
            "fromLang": that.data.pok[that.data.yuanindex].code,  // 翻译目标语言
            "toLang":  that.data.pok[that.data.muindex].code//待翻译句子所属语言
          },
        }).then(res => {
          console.log('invokeService success', res)
          // wx.showModal({
          //   title: 'success',
          //   content: JSON.stringify(res),
          // })
          that.setData({
            fy:res.data.Result
          })
        }).catch(err =>{
          console.error('invokeService fail', err)
          wx.showModal({
          title: 'fail',
          content: err,
          })
        })
    }
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

  }
})