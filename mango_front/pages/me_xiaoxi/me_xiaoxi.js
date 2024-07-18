//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '个人消息', //导航栏 中间的标题
      height: 0
    },
    title: '加载中...', // 状态
    list: [], // 数据列表
    type: '', // 数据类型
    loading: true, // 显示等待框
    userId: "-1",
    height: app.globalData.height,
  },
  chat(event){
    let OtherUserId = parseInt(event.currentTarget.dataset.id);
    console.log(OtherUserId);
    wx.navigateTo({
      url: '/pages/user_chat/user_chat?OtherUserId='+OtherUserId,
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // options 为 board页传来的参数
    const that = this;
    that.setData({
      userId: getApp().globalData.userId

    })
   
   },
  onShow(){
    const that = this;
    var userId = getApp().globalData.userId;
      // 拼接请求url
      const url =   getApp().globalData.url  + '/getAllChatUser?userId='+userId;
      // 请求数据
      wx.request({
        url: url,
        method: "post",
        success: function(res) {
          that.setData({
            list: res.data,
            loading: false // 关闭等待框
          })
        }
      })
  },

    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },
  
    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },
  
    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection =='left'){
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },

    deleteItem(e){
      console.log(e)
      let id = e.currentTarget.dataset.id
      wx.showModal({
        title: '提示',
        content: '确定删除？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.showLoading({
              title: "删除中",
            });
            wx.request({
              url: getApp().globalData.url + '/deleteChatUser/' + this.data.userId + '/' + id,
              header: {
                "authorization": wx.getStorageSync("token")
              },
              method: 'POST',
              success: (result) => {
                if (result.data.code == 200) {
                  wx.showModal({
                    title: '提示',
                    content: "删除成功",
                    confirmText: '确定',
                    showCancel: false,
                    success(res) {
                      wx.hideLoading();
                    }
                  });
                  this.onShow()
                } else {
                  wx.showModal({
                    title: '提示',
                    content: result.data.msg,
                    confirmText: '确定',
                    showCancel: false,
                  });
                }
                wx.hideLoading();
              }
            })
          }
        },
      })
      wx.hideLoading();
    },
})