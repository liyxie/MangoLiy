// pages/score/create/create.js
const app = getApp()
var time = require('../../../utils/util.js');
var uploadImage = require('../../../utils/uploadFile');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '创建评分', //导航栏 中间的标题
      height: 0,
    },
    height: app.globalData.height * 2 + 20,

    themeName: "",
    themeIn: "",
    themeImg: "",
    themeImgShow: [],

    items: [{
      name: "",
      img: "",
      intt: "",
    }],

    itemImgShow: [
      [],
    ],

    userId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var id = wx.getStorageSync('userId')
    this.setData({
      userId: id
    })

    this.my_fav()

  },

  my_fav() {
    let that = this;
    console.log("未登录")
    if (!that.data.userId > 0) {
      wx.showModal({
        title: '提示',
        content: '还没有登录噢~',
        confirmText: "去登陆",
        success: function (e) {
          if (e.confirm) {
            wx.switchTab({
              url: "/pages/me/me"
            })
          } else {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
      return;
    }
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

  ZaiJia() {
    let num = this.data.items.length
    if (this.data.items[num - 1].name.length == 0 ||
      this.data.items[num - 1].intt.length == 0 ||
      this.data.items[num - 1].img.length == 0) {
      wx.showToast({
        title: '先填写完上一个',
        icon: 'error'
      })
    } else {
      this.data.items.push({
        name: "",
        intt: "",
        img: ""
      })
      this.setData({
        items: this.data.items
      })
    }
  },
  sanChu(e) {
    if (this.data.items.length == 1) {
      return
    }
    this.data.items.splice(this.data.items.length - 1, 1)
    this.setData({
      items: this.data.items,
    })
    this.data.itemImgShow.splice(this.data.itemImgShow.length - 1, 1)
    this.setData({
      itemImgShow: this.data.itemImgShow
    })
  },

  afterRead(event) {
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    console.log(event)
    console.log(event.detail)
    this.setData({
      themeImg: event.detail.file.url,
    })
    this.data.themeImgShow.push({
      url: event.detail.file.url
    })
    this.setData({
      themeImgShow: this.data.themeImgShow
    })
  },
  delThemeImg(e) {
    this.setData({
      themeImg: "",
    })
    this.setData({
      themeImgShow: []
    })
  },
  afterReadItem(e) {
    console.log(e.currentTarget)
    let index = e.currentTarget.dataset.id
    this.data.items[index].img = e.detail.file.url

    this.setData({
      items: this.data.items,
    })
    this.data.itemImgShow.splice(index, 0, [{
      url: e.detail.file.url
    }])
    this.setData({
      itemImgShow: this.data.itemImgShow
    })
  },
  delItemImg(e) {
    console.log(e.currentTarget)
    let index = e.currentTarget.dataset.id
    this.data.items[index].img = ""
    this.setData({
      items: this.data.items,
    })
    this.data.itemImgShow[index].splice(0, 1)
    this.setData({
      itemImgShow: this.data.itemImgShow
    })
  },
  inp_name(e) {
    console.log(e.currentTarget)
    let index = e.currentTarget.dataset.id
    this.data.items[index].name = e.detail
    this.setData({
      items: this.data.items,
    })
  },
  inp_In(e) {
    console.log(e.currentTarget)
    let index = e.currentTarget.dataset.id
    this.data.items[index].intt = e.detail
    this.setData({
      items: this.data.items,
    })
  },

  // 图片上传
  // img_upload(callback) {
  //   let that = this;

  //   var date = new Date();
  //   var seperator1 = "-";
  //   var year = date.getFullYear();
  //   var month = date.getMonth() + 1;
  //   var strDate = date.getDate();
  //   var currentdate = year + seperator1 + month + seperator1 + strDate;
  //   var path = 'www/wwwroot/liy/message_detail/images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

  //   console.log("上传图片")
  //   uploadImage(this.data.themeImg, path,
  //     function (result) {
  //       console.log(result)
  //       that.data.themeImg = result;
  //       that.setData({
  //         themeImg: that.data.themeImg,
  //       })
  //       wx.hideLoading();
  //     },
  //     function (result) {
  //       wx.hideLoading()
  //     }
  //   )

  //   //由于图片只能一张一张地上传，所以用循环
  //   for (let i = 0; i < that.data.items.length; i++) {
  //     var tempFilePaths = that.data.items[i].img;
  //     var date = new Date();
  //     var seperator1 = "-";
  //     var year = date.getFullYear();
  //     var month = date.getMonth() + 1;
  //     var strDate = date.getDate();
  //     var currentdate = year + seperator1 + month + seperator1 + strDate;
  //     var path = 'www/wwwroot/liy/message_detail/images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
  //     //支持多图上传

  //     //显示消息提示框
  //     wx.showLoading({
  //       title: '上传中',
  //       mask: true
  //     })

  //     //上传图片
  //     //你的域名下的/images/文件下的/当前年月日文件下的/图片.png
  //     //图片路径可自行修改
  //     uploadImage(tempFilePaths, path,
  //       function (result) {
  //         console.log(result)
  //         that.data.items[i].img = result
  //         wx.hideLoading();
  //         that.setData({
  //           items: that.data.items
  //         })
  //       },
  //       function () {
  //         wx.hideLoading()
  //       }
  //     )
  //   }
  //   console.log("上传完毕")
  // },

  // tiJiao() {
  //   let that = this
  //   // 检查
  //   if (this.data.themeName.length == 0 ||
  //     this.data.themeIn.length == 0 ||
  //     this.data.themeImg == 0 ||
  //     !this.cheakItem()) {
  //     wx.showToast({
  //       title: '信息不完整',
  //       icon: "error"
  //     })
  //   } else {
  //     wx.showModal({
  //       title: '提示',
  //       content: '确定发布么？',
  //       showCancel: true,
  //       cancelText: '取消',
  //       cancelColor: '#000000',
  //       confirmText: '确定',
  //       confirmColor: '#3CC51F',
  //       success: (result) => {
  //         wx.showLoading({
  //           title: "发布中",
  //         });
  //         if (result.confirm) {
  //           // 上传Theme
  //             that.img_upload()
  //             let index = that.data.index + 1
  //             wx.request({
  //               url: getApp().globalData.url + '/score/addTheme/' + this.data.userId,
  //               data: {
  //                 name: that.data.themeName,
  //                 introduction: that.data.themeIn,
  //                 imgUrl: that.data.themeImg,
  //               },
  //               header: {
  //                 "authorization": wx.getStorageSync("token")
  //               },
  //               method: 'POST',
  //               success: (result) => {
  //                 if (result.data.code == 200) {
  //                   let id = result.data.id
  //                   // 上传items
  //                   console.log("建立对象")
  //                   wx.request({
  //                     url: getApp().globalData.url + '/score/addItems/' + this.data.userId + '/' + id,
  //                     data: {
  //                       mangoScoreItemPos: that.data.items,
  //                     },
  //                     header: {
  //                       "authorization": wx.getStorageSync("token")
  //                     },
  //                     method: 'POST',
  //                     success: (result) => {
  //                       wx.hideLoading();
  //                       if (result.data.code == 200) {
  //                         wx.showModal({
  //                           title: '提示',
  //                           content: "发布成功",
  //                           confirmText: '确定',
  //                           showCancel: false,
  //                           success(res) {
  //                             if (res.confirm) {
  //                               wx.navigateBack({
  //                                 delta: '1',
  //                               })
  //                             }
  //                           }
  //                         });

  //                       } else {
  //                         wx.showModal({
  //                           title: '提示',
  //                           content: result.data.msg,
  //                           confirmText: '确定',
  //                           showCancel: false,
  //                         });
  //                       }
  //                     }
  //                   })
  //                   wx.hideLoading();
  //                 } else {
  //                   wx.showModal({
  //                     title: '提示',
  //                     content: result.data.msg + '，错误码：' + result.data.code,
  //                     confirmText: '确定',
  //                     showCancel: false,
  //                   });
  //                 }
  //               },
  //             });
  //         }
  //       },
  //     })
  //   }
  //   wx.hideLoading();
  // },
  img_upload(callback) {
    let that = this;

    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var path = 'www/wwwroot/liy/message_detail/images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

    console.log("上传图片")
    uploadImage(this.data.themeImg, path,
      function (result) {
        console.log(result)
        that.data.themeImg = result;
        that.setData({
          themeImg: that.data.themeImg,
        })
        wx.hideLoading();
        // 图片上传完成后执行回调函数
        if (callback) {
          callback();
        }
      },
      function (result) {
        wx.hideLoading()
      }
    )
  },

  async img_upload2(callback) {
    let that = this;
    const uploadPromises = []; // 用于存储所有图片上传的 Promise

    // 由于图片只能一张一张地上传，所以用循环
    for (let i = 0; i < that.data.items.length; i++) {
        var tempFilePaths = that.data.items[i].img;
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        var path = 'www/wwwroot/liy/message_detail/images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

        // 显示消息提示框
        wx.showLoading({
            title: '上传中',
            mask: true
        });

        // 使用 Promise 包装图片上传操作
        const uploadPromise = new Promise((resolve, reject) => {
            uploadImage(tempFilePaths, path,
                function (result) {
                    console.log(result);
                    that.data.items[i].img = result;
                    wx.hideLoading();
                    that.setData({
                        items: that.data.items
                    });
                    resolve(); // 标记当前图片上传完成
                },
                function () {
                    wx.hideLoading();
                    reject(); // 标记当前图片上传失败
                }
            );
        });
        uploadPromises.push(uploadPromise); // 将当前图片上传操作的 Promise 存入数组
    }

    try {
        // 等待所有图片上传完成
        await Promise.all(uploadPromises);
        console.log("所有图片上传完成");
        // 所有图片上传完成后执行回调函数
        if (callback) {
            callback();
        }
    } catch (error) {
        console.error("图片上传失败:", error);
    }
},
  tiJiao() {
    let that = this
    // 检查
    if (this.data.themeName.length == 0 ||
      this.data.themeIn.length == 0 ||
      this.data.themeImg == 0 ||
      !this.cheakItem()) {
      wx.showToast({
        title: '信息不完整',
        icon: "error"
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定发布么？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          wx.showLoading({
            title: "发布中",
          });
          if (result.confirm) {
            // 调用 img_upload() 方法时传入回调函数
            that.img_upload(function () {
              let index = that.data.index + 1
              wx.request({
                url: getApp().globalData.url + '/score/addTheme/' + that.data.userId,
                data: {
                  name: that.data.themeName,
                  introduction: that.data.themeIn,
                  imgUrl: that.data.themeImg,
                },
                header: {
                  "authorization": wx.getStorageSync("token")
                },
                method: 'POST',
                success: (result) => {
                  if (result.data.code == 200) {
                    let id = result.data.id
                    // 上传items
                    that.img_upload2(function () {
                      console.log("建立对象")
                      wx.request({
                        url: getApp().globalData.url + '/score/addItems/' + that.data.userId + '/' + id,
                        data: {
                          mangoScoreItemPos: that.data.items,
                        },
                        header: {
                          "authorization": wx.getStorageSync("token")
                        },
                        method: 'POST',
                        success: (result) => {
                          wx.hideLoading();
                          if (result.data.code == 200) {
                            wx.showModal({
                              title: '提示',
                              content: "发布成功",
                              confirmText: '确定',
                              showCancel: false,
                              success(res) {
                                if (res.confirm) {
                                  wx.navigateBack({
                                    delta: '1',
                                  })
                                }
                              }
                            });

                          } else {
                            wx.showModal({
                              title: '提示',
                              content: result.data.msg,
                              confirmText: '确定',
                              showCancel: false,
                            });
                          }
                        }
                      })
                    })

                    wx.hideLoading();
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
            });
          }
        },
      })
    }
    wx.hideLoading();
  },

  cheakItem() {
    console.log("cheakItem")
    let f = true;
    this.data.items.forEach(i => {
      if (i.name.length == 0 || i.intt.length == 0 || i.img.length == 0) {
        console.log("false")
        f = false
        return false;
      }
    });
    return f;
  }


})