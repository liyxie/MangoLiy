// pages/admin_score/admin_score.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '评分管理', //导航栏 中间的标题
      height: 0
    },
    height: app.globalData.height * 2 + 20,
    isLoading: false,
    userInfo:[],
    userId: "-1",
    userIsAdmin: -1, //是否为管理员

    user_theme:[],
    activeIndex: 1,
    isLastPage: false, //是否最后一页
    showDialog1: false,
    inValue:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userId: getApp().globalData.userId
    })

    if (this.data.userId == -1) {
      wx.showModal({
        title: '提示',
        content: '出现错误，请稍后再试~',
      })
      return;
    }

    this.loadScore(1);
  },
  loadScore(index) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var app = getApp()
    wx.request({
      url: getApp().globalData.url + '/score/getAllScore/' + index,
      method: "POST",
      success: (res) => {
        if (res.data == 200) {
          that.setData({
            isLastPage: true
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
    // 最后一页了，取消下拉功能
    if (this.data.isLastPage) {
      return
    }
    if(this.data.inValue.length > 0){
      this.loadScoreby(this.data.inValue, ++this.data.activeIndex)
    }else{
      this.loadScore(++this.data.activeIndex);
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
  toggleDialog1(e) {
    console.log("toggleDialog1"+e)
    this.setData({
      showDialog1: !this.data.showDialog1
    });
    this.setCurrentIndex(e.currentTarget.id)
  },
  setCurrentIndex(id) {
    console.log(id)
    this.setData({
      currentIndex: id
    })
  },
      //查看详情
      to_look_detail(e) {
        let that = this
        this.setData({
          showDialog1: !this.data.showDialog1
        });
        wx.navigateTo({
          url: '/pages/score/themem/themem?id=' + that.data.user_theme[that.data.currentIndex].id,
        })
      },
        //删除信息
  delete_message() {
    let that = this
    if (that.data.currentIndex == -1) {
      wx.showModal({
        title: '提示',
        content: '出现错误，请稍后再试~',
      })
      return;
    }

    wx.showModal({
      title: '提示',
      content: '是否删除?',
      confirmColor: "#f00",
      success: function(e) {
        if (e.confirm) {
          wx.showLoading({
            title: '稍等',
          })
          that.setData({
            showDialog1: !that.data.showDialog1
          });
          wx.request({
            url: getApp().globalData.url + '/score/deleteThemeById/' + that.data.userId + '/' + that.data.user_theme[that.data.currentIndex].id,
            method: "post",
            success: function(e) {
              wx.hideLoading()
              if (e.statusCode != 200) {
                wx.showModal({
                  title: '提示',
                  content: '服务器出现错误，请稍后再试',
                  showCancel: false
                })
                return;
              }
              if (e.data.code == 200) {
                wx.showModal({
                  title: '提示',
                  content: '删除成功',
                  showCancel: false,
                  success: function() {
                    that.setData({
                      user_theme: [],
                      isLastPage: false,
                      activeIndex: 1,
                    })
                    if(that.data.inValue.length > 0){
                      that.loadScoreby(that.data.inValue, 1)
                    }else{
                      that.loadScore(1)
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
    // 输入
    in_value(e){
      console.log(e.detail.value)
      this.setData({
        inValue: e.detail.value
      })
    },
  // 失去焦点
  blursearch(e){
    console.log("失去焦点")
    // if(this.data.inValue.length == 0){
    //     this.setData({
    //       isLastPage: false,
    //       activeIndex: 1,
    //       user_theme: []
    //     })
    //     this.loadScore(1)
    //   }
    // else{
    //   this.souSuo();
    // }
  },
    // 搜索
    souSuo(e){
      console.log("搜索  " + this.data.inValue)
      this.setData({
        isLastPage: false,
        activeIndex: 1,
        user_theme: []
      })
      if(this.data.inValue.length == 0){
        this.loadScore(1)
        return
      }
      
      this.loadScoreby(this.data.inValue, 1)
    },

    loadScoreby(keyword, index){
      console.log("搜索"+ keyword + "  " + index)
      let that = this;
      wx.request({
        url: getApp().globalData.url + '/score/getThemeByname/' + keyword + '/' + index,
        method: "post",
        success: function(e) {
          if (e.data.length == 0) {
            wx.showModal({
              title: '提示',
              content: '没有搜到，换个关键词吧',
            })
            return;
          }
          if (e.data == 200) {
            that.setData({
              isLastPage: true
            })
            return;
          }
          that.setData({
            user_theme: that.data.user_theme.concat(e.data)
          })
        }
      })
    },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})