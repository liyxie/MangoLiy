// pages/score/score.js
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
            // 组件所需的参数
        nvabarData: {
          showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
          title: '评分', //导航栏 中间的标题
          height: 0,
        },
        height: app.globalData.height * 2 + 20,
        value:2.5,

        themesNew:[],
        isLastPage: false, //是否最后一页
        activeIndex:1,
        message:"getAllScore",

        themesHeat:[],

        inValue:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: "加载中",
    });

    // this.loadscore(1, "getAllScore")
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
    this.setData({
      themesNew:[]
    })
    this.loadscore(1, "getAllScore")
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
        // 最后一页了，取消下拉功能
        if (this.data.isLastPage) {
          return
        }
        // 最新
        if(this.data.message == "getAllScore"){
          this.loadscore(++this.data.activeIndex,this.data.message);
        }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppscore() {

  },

  // 加载初始数据


// 请求数据
  loadscore(index,score) {
    var that = this;
    var app = getApp()
    wx.request({
      url: getApp().globalData.url + '/score/'+ score + '/' + index,
      method: "POST",
      success: (res) => {
        if (res.data == 200) {
          that.setData({
            isLastPage: true
          })
          return;
        }
        that.setData({
          themesNew: that.data.themesNew.concat(res.data)
        })
      },
      complete: function(res) {
        wx.hideLoading();
      },
    })
  },


  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },

  toChuangJian(){
    wx.navigateTo({
      url: '/pages/score/create/create',
    })
  },

  // 搜索
  souSuo(e){
    if(this.data.inValue.length == 0){
      return
    }

  },
  endsearchList(){
    this.setData({
      themesNew:[],
      isLastPage: false,
    })
    if(this.data.inValue.length == 0){
      this.loadscore(1, "getAllScore")
      return
    }
    this.setData({
      themesNew:[],
      isLastPage: false,
      message:"getTheme",
    })
    // 查询
    this.loadscore(this.data.inValue, "getTheme")
  },

  InputFocus(e){
    console.log(e)
  },

  // 跳转纤细
  to_theme(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/score/themem/themem?id='+e.currentTarget.id,
    })
  },

  // 输入
  in_value(e){
    this.setData({
      inValue: e.detail.value
    })
  },
// 失去焦点
  blursearch(e){
    // if(this.data.inValue.length == 0){
    //     this.setData({
    //       themesNew:[],
    //       isLastPage: false,
    //       message:"getAllScore",
    //     })
    //     this.loadscore(1, "getAllScore")
    //   }
    // else{
    //   this.setData({
    //     message:"getTheme",
    //   })
    //   this.endsearchList();
    // }
  },

})