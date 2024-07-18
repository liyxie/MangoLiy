//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: "添加", //导航栏 中间的标题
      height: 0,

      // add_detail_1
      navTop: "",
      windowHeight: "",
      windowWidth: ""
    },
    userId: -1,
    agree: false,

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
  },

  onLaunch: function () {
    // wx.setEnableDebug({
    //   enableDebug: true,
    // })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth
      },
      fail(err) {
        console.log(err);
      }
    })
  },


  onLoad() {
    let that = this
    this.setData({
      height: app.globalData.height,
      userId: getApp().globalData.userId
    })



  },

  to_add() {
    let that = this;


    if (that.data.userId == -1) {
      wx.showModal({
        title: '提示',
        content: '还没有登录噢~',
        confirmText: "去登陆",
        success: function(e) {
          if (e.confirm) {
            wx.switchTab({
              url: "/pages/me/me"
            })
          }
        }
      })
      return;
    }

    if (this.data.agree) {

      

      wx.navigateTo({
        url: '/pages/add_detail_1/index/index',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先阅读约定',
        showCancel: false,
        confirmText: '去查看',
        success: function(e) {
          wx.navigateTo({
            url: '/pages/agreement/agreement',
          })
        }
      })
    }

  },
  look_agreement(e) {
        console.log(this.data.agree)
    this.setData({
      agree: !this.data.agree
    })

  },
  onShow() {
    let that = this
    this.setData({
      userId: getApp().globalData.userId
    })
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        })
      },
    })
  }

})