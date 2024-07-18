//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的参与', //导航栏 中间的标题
      height: 0
    },
    imageUrl:"",
    allCategoryMessage: [],
    userId: -1,
    activeIndex: 1,
    floorstatus: "none",
    user_message: [],

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    isLoading: false,
    picker: ["分享", "失物招领", "闲置交易", "校园求助", "兼职代事"],

    send: ["校园墙", "评分"],
    sendIndex: 0,

    user_theme: [],
    isThemeLastPage: false,
    activeThemeIndex: 1
  },
  onReady() {
    let that = this
    setTimeout(function () {
      that.setData({
        isLoading: true
      })
    }, 500)
  },
  //一键返回顶部
  onPageScroll: function(e) { //判断滚轮位置
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: "block"
      });
    } else {
      this.setData({
        floorstatus: "none"
      });
    }
  },
  goTop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onLoad() {
    let that = this
    this.setData({
      allCategoryMessage: getApp().globalData.categoryMessage,
      imageUrl:getApp().globalData.imageUrl,
    })
    this.setData({
      height: app.globalData.height
    })
    this.setData({
      userId: getApp().globalData.userId
    })
    this.loadMessage(1)
    this.loadScore(1)
  },
  loadMessage(index) {
    wx.showLoading({
      title: '加载中~',
    })
    var that = this;
    var app = getApp()
    wx.request({
      url: getApp().globalData.url + '/getMessage/getAttendMessageByUserId/' + that.data.userId + '/' + index,
      method: "POST",
      success: (res) => {
        if (res.data == 200) {
          that.setData({
            isLastPage: true
          })
          return;
        }
        that.setData({
          user_message: that.data.user_message.concat(res.data)
        })
      },
      complete: function(res) {
        wx.hideLoading();
      },
    })
  },
  loadScore(index) {
    wx.showLoading({
      title: '加载中~',
    })
    var that = this;
    var app = getApp()
    wx.request({
      url: getApp().globalData.url + '/score/getTheme/getAllThemeByUiId/' + that.data.userId + '/' + index,
      method: "POST",
      success: (res) => {
        if (res.data == 200) {
          that.setData({
            isThemeLastPage: true
          })
          return;
        }
        that.setData({
          user_theme: that.data.user_theme.concat(res.data)
        })
      },
      complete: function(res) {
        wx.hideLoading();
      },
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 最后一页了，取消下拉功能
    if (this.data.isLastPage && this.data.sendIndex == 0) {
      return
    }
    if (this.data.isThemeLastPage && this.data.sendIndex == 1) {
      return
    }
    if (this.data.sendIndex == 1){
      this.loadScore(++this.data.activeThemeIndex)
    }else{
      this.loadMessage(++this.data.activeIndex)
    }
  },

  //跳转到详情页
  to_message_detail: function(e) {
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?messageId=' + e.currentTarget.id,
    })
  },

    // 切换分类
    sendChange(e){
      this.setData({
        sendIndex : e.detail.value,
        isLastPage: false,
        isThemeLastPage: false,
      })
    },

    to_look_theme(e) {
      let that = this
      wx.navigateTo({
        url: '/pages/score/themem/themem?id='+e.currentTarget.id,
      })
    },
})