// pages/admin_message/admin_message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '校园墙管理', //导航栏 中间的标题
      height: 0
    },
    height: app.globalData.height * 2 + 20,
    isLoading: false,
    userInfo:[],
    userId: -1,
    userIsAdmin: -1, //是否为管理员


    user_message:[],
    activeIndex: 1,
    isLastPage: false, //是否最后一页
    picker: ["分享", "失物招领", "闲置交易", "校园求助", "兼职代事"],
    showDialog1: false,


    inValue:"",

    showWeiJin:false,
    weiJinCi:[
      {
        id:1,
        word: "qqq"
      }
    ],
    weijin:"",

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

    this.loadMessage(1)
    this.loadWeiJin();
  },
  loadMessage(index) {
    wx.showLoading({
      title: '加载中~',
    })
    var that = this;
    var app = getApp()
    wx.request({
      url: getApp().globalData.url + '/getMessage/getAllMessageDetail/' + index,
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
      this.loadMessageby(this.data.inValue, ++this.data.activeIndex)
    }else{
      this.loadMessage(++this.data.activeIndex);
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
        url: '/pages/message_detail/message_detail?messageId=' + that.data.user_message[that.data.currentIndex].messageId,
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
            url: getApp().globalData.url + '/deleteMessageById/' + that.data.userId + '/' + that.data.user_message[that.data.currentIndex].messageId,
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
                      user_message: [],
                      isLastPage:false,
                      activeIndex:1,
                    })
                    if(that.data.inValue.length > 0){
                      that.loadMessageby(that.data.inValue, 1)
                    }else{
                      that.loadMessage(1)
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

    // 输入
    in_value(e){
      console.log(e.detail.value)
      this.setData({
        inValue: e.detail.value
      })
    },
    endsearchList(){
      // if(this.data.inValue.length == 0){
      //   return
      // }
      // this.setData({
      //   themesNew:[],
      //   isLastPage: false,
      //   message:"getTheme",
      // })
      // // 查询
      // this.loadscore(this.data.inValue, "getTheme")
    },
    // 失去焦点
  blursearch(e){
    console.log("失去焦点")
    // if(this.data.inValue.length == 0){
    //     this.setData({
    //       isLastPage: false,
    //       activeIndex: 1,
    //       user_message: []
    //     })
    //     this.loadMessage(1)
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
        user_message: []
      })
      if(this.data.inValue.length == 0){
        this.loadMessage(1)
        return
      }
      
      this.loadMessageby(this.data.inValue, 1)
    },

    loadMessageby(keyword, index) {
      console.log("搜索"+ keyword + "  " + index)
      let that = this;
      wx.request({
        url: getApp().globalData.url + '/searchByKeyword/' + keyword + '/' + index,
        method: "post",
        success: function(e) {
          if (e.data.length == 0) {
            wx.showModal({
              title: '提示',
              content: '没有搜到噢，换个关键词吧',
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
            user_message: that.data.user_message.concat(e.data)
          })
        }
      })
    },

    // 违禁词添加
    changeshow(){
      this.setData({
        showWeiJin: !this.data.showWeiJin
      })
    },
    inWeiJin(e){
      console.log(e.detail.value)
      this.setData({
        weijin: e.detail.value
      })
    },
    addWeiJin(){
      let that = this;
      if(this.data.weijin.length < 1){
        wx.showModal({
          title: '提示',
          content: '输入内容过少',
        })
        return
      }
      wx.showModal({
        title: '提示',
        content: '确定添加么？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.showLoading({
              title: "添加中",
            });
            wx.request({
              url: getApp().globalData.url + '/SensitiveWordsPo/addWord/'+ that.data.userId,
              data: that.data.weijin,
              header: {
                "authorization": wx.getStorageSync("token")
              },
              method: 'POST',
              success: (result) => {
                wx.hideLoading();
                if (result.data.code == 200) {
                  wx.showModal({
                    title: '提示',
                    content: '成功',
                  })
                  that.setData({
                    weijin:""
                  })
                  that.loadWeiJin()
                } else {
                  wx.showModal({
                    title: '提示',
                    content: result.data.msg + '，错误码：' + result.data.code,
                    confirmText: '确定',
                    showCancel: false,
                  });
                }
              },
            });
          }
          }
        }
      )
    },

    loadWeiJin(e){
      this.setData({
        weiJinCi:[],
        weijin:""
      })
      wx.showLoading({
        title: '加载中~',
      })
      var that = this;
      var app = getApp()
      wx.request({
        url: getApp().globalData.url + '/SensitiveWordsPo/getWord',
        method: "POST",
        success: (res) => {
          that.setData({
            weiJinCi: res.data
          })
        },
        complete: function(res) {
          wx.hideLoading();
        },
      })
    },

    // 启用
    changeWeiJin(e){
      console.log(e.currentTarget.dataset.id)
      let that = this
      let id = e.currentTarget.dataset.id
            wx.request({
              url: getApp().globalData.url + '/SensitiveWordsPo/noUseWord/'+ id,
              data: 1,
              header: {
                "authorization": wx.getStorageSync("token")
              },
              method: 'POST',
              success: (result) => {
                wx.hideLoading();
                if (result.data.code == 200) {
                  that.loadWeiJin()
                } else {
                  wx.showModal({
                    title: '提示',
                    content: result.data.msg + '，错误码：' + result.data.code,
                    confirmText: '确定',
                    showCancel: false,
                  });
                }
              },
            });
    },

    // 删除
    shanchuWeiJin(e){
      console.log(e.currentTarget.dataset.id)
      let that = this
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
              title: "添加中",
            });
            wx.request({
              url: getApp().globalData.url + '/SensitiveWordsPo/deleteWord/'+ id,
              header: {
                "authorization": wx.getStorageSync("token")
              },
              method: 'POST',
              success: (result) => {
                wx.hideLoading();
                if (result.data.code == 200) {
                  wx.showModal({
                    title: '提示',
                    content: '成功',
                  })
                  that.loadWeiJin()
                } else {
                  wx.showModal({
                    title: '提示',
                    content: result.data.msg + '，错误码：' + result.data.code,
                    confirmText: '确定',
                    showCancel: false,
                  });
                }
              },
            });
          }
          }
        }
      )
    }

})