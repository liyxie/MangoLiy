//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的发布', //导航栏 中间的标题
      height: 0
    },
    imageUrl: "",
    allCategoryMessage: [],
    showDialog1: false,
    showDialog2: false,
    currentIndex: -1,
    userId: -1,
    user_message: [],
    floorstatus: "none",
    activeIndex: 1,
    isLastPage: false, //是否最后一页
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    updateMessage: "",
    isLoading: false,
    picker: ["分享", "失物招领", "闲置交易", "校园求助", "兼职代事"],
    send: ["校园墙", "评分"],
    sendIndex: 0,

    isThemeLastPage: false,
    user_theme: [],
    activeThemeIndex: 1,

    inValue: "",
  },

  temUpdateMessage(e) {
    this.setData({
      updateMessage: e.detail.value
    })
  },

  updateMessage() {
    let that = this
    if (this.data.updateMessage == this.data.user_message[this.data.currentIndex].messageDetail) {
      wx.showModal({
        title: '提示',
        content: '好像没有什么变化噢~',
      })
      return;
    }
    if (this.data.userId == -1) {
      wx.showModal({
        title: '提示',
        content: '好像出问题啦，退出去重新试试吧~',
      })
      return;
    }
    wx.showLoading({
      title: '更新中~',
    })
    wx.request({
      url: getApp().globalData.url + '/updateMessageById/' + that.data.userId + '/' + that.data.user_message[that.data.currentIndex].messageId,
      method: "post",
      data: that.data.updateMessage,
      success: function (e) {
        if (e.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '好像出问题啦，退出去重新试试吧~',
          })
          return;
        }
        wx.hideLoading()
        if (e.data.code == 200) {
          wx.showModal({
            title: '提示~',
            content: '更新成功啦~',
          })
          that.updateAllMessage();
          that.setData({
            user_message: [],
            showDialog1: false,
            showDialog2: false,
          })
          that.loadMessage(1)
        }
      }
    })

  },
  //一键返回顶部
  onPageScroll: function (e) { //判断滚轮位置
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
  goTop: function (e) { // 一键回到顶部
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

  toggleDialog2() {
    this.setData({
      showDialog2: !this.data.showDialog2,
    });
  },

  toggleDialog1(e) {
    console.log("toggleDialog1" + e)
    this.setData({
      showDialog1: !this.data.showDialog1
    });
    this.setCurrentIndex(e.currentTarget.id)
  },

  //设置当前索引值
  setCurrentIndex(id) {
    console.log(id)
    this.setData({
      currentIndex: id
    })
    if (this.data.sendIndex == 0) {
      this.setData({
        updateMessage: this.data.user_message[id].messageDetail
      })
    }

  },

  //查看详情
  to_look_detail(e) {
    let that = this
    console.log(that.data.currentIndex)

    wx.navigateTo({
      url: '/pages/message_detail/message_detail?messageId=' + that.data.user_message[that.data.currentIndex].messageId,
    })
  },
  to_look_theme(e) {
    let that = this
    wx.navigateTo({
      url: '/pages/score/themem/themem?id=' + that.data.currentIndex,
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
      success: function (e) {
        if (e.confirm) {
          wx.showLoading({
            title: '稍等噢~',
          })
          that.setData({
            showDialog1: !that.data.showDialog1
          });
          wx.request({
            url: getApp().globalData.url + '/deleteMessageById/' + that.data.userId + '/' + that.data.user_message[that.data.currentIndex].messageId,
            method: "post",
            success: function (e) {
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
                  success: function () {
                    that.setData({
                      user_message: [],
                      activeIndex: 1,
                      isLastPage: false
                    })
                    if (that.data.inValue.length > 0) {
                      that.loadMessageby(that.data.inValue, 1)
                    } else {
                      that.loadMessage(1)
                    }
                  }
                })

                that.updateAllMessage();

              } else {
                wx.showModal({
                  title: '提示',
                  content: '非法操作，请联系管理员',
                  showCancel: false,
                  success: function () {
                    that.setData({
                      isLastPage: false
                    })
                    wx.request({
                      url: getApp().globalData.url + '/getMessage/getMessageDetailByUserId/' + that.data.userId + '/' + index,
                      method: "POST",
                      success: (res) => {
                        if (res.data == 200) {
                          that.setData({
                            isLastPage: true
                          })
                          return;
                        }
                        that.setData({
                          user_message: res.data
                        })
                      },
                      complete: function (res) {
                        wx.hideLoading();
                      },
                    })
                  },

                })
              }
            }
          })
        }
      }
    })
  },
  updateAllMessage() {
    let that = this;
    /**
     * 获取最新失物招领
     */
    wx.request({
      url: getApp().globalData.url + '/getMessage/getLostMessage',
      method: "post",
      success: function (e) {
        getApp().globalData.lost_new = e.data
      }
    })
    wx.request({
      url: getApp().globalData.url + '/getMessage/getAllMessageDetail/' + 1,
      method: "POST",
      success: (res) => {
        getApp().globalData.messageDetail = res.data
      },
    })
    getApp().globalData.isUpdate = 1;
  },
  delete_theme() {
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
      success: function (e) {
        if (e.confirm) {
          wx.showLoading({
            title: '稍等',
          })
          that.setData({
            showDialog1: !that.data.showDialog1
          });
          wx.request({
            url: getApp().globalData.url + '/score/deleteThemeById/' + that.data.userId + '/' + that.data.currentIndex,
            method: "post",
            success: function (e) {
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
                  success: function () {
                    that.setData({
                      user_theme: [],
                      isThemeLastPage: false,
                      activeThemeIndex: 1,
                    })
                    if (that.data.inValue.length > 0) {
                      that.loadScoreby(that.data.inValue, 1)
                    } else {
                      that.loadScore(1)
                    }
                  }
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '非法操作，请联系管理员',
                  showCancel: false,
                  // success: function() {
                  //   that.setData({
                  //     isThemeLastPage: false
                  //   })
                  //   wx.request({
                  //     url: getApp().globalData.url + '/score/getTheme/getAllThemeByUserId/' + that.data.userId + '/' + index,
                  //     method: "POST",
                  //     success: (res) => {
                  //       if (res.data == 200) {
                  //         that.setData({
                  //           isThemeLastPage: true
                  //         })
                  //         return;
                  //       }
                  //       that.setData({
                  //         user_theme: res.data
                  //       })
                  //     },
                  //     complete: function(res) {
                  //       wx.hideLoading();
                  //     },
                  //   })
                  // },

                })
              }
            }
          })
        }
      }
    })
  },


  onLoad(e) {
    let that = this
    this.setData({
      allCategoryMessage: getApp().globalData.categoryMessage,
      imageUrl: getApp().globalData.imageUrl,
    })
    this.setData({
      height: app.globalData.height
    })

    this.setData({
      userId: getApp().globalData.userId
    })

    if (that.data.userId == -1) {
      wx.showModal({
        title: '提示',
        content: '出现错误，请稍后再试~',
      })
      return;
    }
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
      url: getApp().globalData.url + '/getMessage/getMessageDetailByUserId/' + that.data.userId + '/' + index,
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
      complete: function (res) {
        wx.hideLoading();
      },
    })
  },

  loadMessageby(keyword, index) {
    console.log("搜索" + keyword + "  " + index)
    let that = this;
    wx.request({
      url: getApp().globalData.url + '/searchByKeyword/getMessageDetailByUserId/' + that.data.userId + '/' + keyword + '/' + index,
      method: "post",
      success: function (e) {
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

  loadScore(index) {
    wx.showLoading({
      title: '加载中~',
    })
    var that = this;
    var app = getApp()
    wx.request({
      url: getApp().globalData.url + '/score/getTheme/getAllThemeByUserId/' + that.data.userId + '/' + index,
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
      complete: function (res) {
        wx.hideLoading();
      },
    })
  },

  loadScoreby(keyword, index) {
    console.log("搜索" + keyword + "  " + index)
    let that = this;
    wx.request({
      url: getApp().globalData.url + '/score/getThemeByname/getAllThemeByUserId/' + that.data.userId + '/' + keyword + '/' + index,
      method: "post",
      success: function (e) {
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

  onReady() {
    let that = this
    setTimeout(function () {
      that.setData({
        isLoading: true
      })
    }, 500)
  },
  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function () {
    // 最后一页了，取消下拉功能
    if (this.data.isLastPage && this.data.sendIndex == 0) {
      return
    }
    if (this.data.isThemeLastPage && this.data.sendIndex == 1) {
      return
    }
    if (this.data.sendIndex == 1) {
      if (this.data.inValue.length > 0) {
        this.loadScoreby(this.data.inValue, ++this.data.activeThemeIndex)
      } else {
        this.loadScore(++this.data.activeThemeIndex)
      }

    } else {
      if (this.data.inValue.length > 0) {
        this.loadMessageby(this.data.inValue, ++this.data.activeIndex)
      } else {
        this.loadMessage(++this.data.activeIndex)
      }

    }
  },

  onShareAppMessage() {
    let that = this
    return {
      title: "观看下",
      path: '/pages/message_detail/message_detail?messageId=' + that.data.user_message[that.data.currentIndex].messageId
    }
  },

  // 切换分类
  sendChange(e) {
    this.setData({
      sendIndex: e.detail.value,
      isLastPage: false,
      isThemeLastPage: false,
      inValue: "",
    })
  },

  // 输入
  in_value(e) {
    console.log(e.detail.value)
    this.setData({
      inValue: e.detail.value
    })

  },
  blursearch(e) {
    console.log("失去焦点")
    if (this.data.inValue.length == 0) {
      // 校园墙
      if (this.data.sendIndex == 0) {}
      this.setData({
        isLastPage: false,
        activeIndex: 1,
        user_message: []
      })
      // 评分
      this.setData({
        isThemeLastPage: false,
        user_theme: [],
        activeThemeIndex: 1,
      })
      if (this.data.sendIndex == 0) {
        this.loadMessage(1)
      } else {
        this.loadScore(1)
      }
    } else {
      this.souSuo();
    }
  },
  // 搜索
  souSuo(e) {
    console.log("搜索  " + this.data.inValue)
    if (this.data.inValue.length == 0) {
      if (this.data.sendIndex == 0) {
        this.setData({
          isLastPage: false,
          activeIndex: 1,
          user_message: []
        })
        this.loadMessage(1)
      }else{
        this.setData({
          isThemeLastPage: false,
          user_theme: [],
          activeThemeIndex: 1,
        })
        this.loadScore(1)
      }
      return
    }
    if (this.data.sendIndex == 0) {
      this.setData({
        isLastPage: false,
        activeIndex: 1,
        user_message: []
      })
      this.loadMessageby(this.data.inValue, 1)
    } else {
      this.setData({
        isThemeLastPage: false,
        user_theme: [],
        activeThemeIndex: 1,
      })
      this.loadScoreby(this.data.inValue, 1)
    }
  },

})