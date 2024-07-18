// pages/score/themem/themem.js
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
      title: '评分', //导航栏 中间的标题
      height: 0,
    },
    height: app.globalData.height * 2 + 20,


    userInfo:"",
    userId: "",
    themeId: "",
    theme: "",

    pingfeng: "",
    MyPingFeng: "",

    // 创建者信息
    create: "",

    show: false,
    // 添加对象
    item: [{
      name: "",
      img: "",
      intt: "",
    }],
    itemImgShow: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
console.log("监听页面加载")
    console.log(options.id)
    

    this.data.userId = wx.getStorageSync('userId')
    this.data.userInfo = wx.getStorageSync('userInfo')
    console.log(this.data.userId)
    this.setData({
      userId: this.data.userId,
      themeId: options.id,
      userInfo: this.data.userInfo
    })

    this.my_fav()

    this.loadTheme()
    // this.loadCreate()
  },

  my_fav() {
    let that = this;
    console.log("未登录")
    if (!that.data.userId > 0) {
      wx.showModal({
        title: '提示',
        content: '还没有登录噢~',
        confirmText: "去登陆",
        success: function(e) {
          if (e.confirm) {
            wx.switchTab({
              url: "/pages/me/me"
            })
          }else{
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

  // 加载数据
  loadTheme() {
    var that = this;
    var app = getApp()
    wx.showLoading({
      title: "加载中",
    });
    wx.request({
      url: getApp().globalData.url + '/score/' + "getTheme" + '/' + that.data.userId + '/' + that.data.themeId,
      method: "POST",
      success: (res) => {
        console.log(res)
        that.setData({
          theme: res.data.data[0],
          'nvabarData.title': res.data.data[0].name,
          create: res.data.create
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })
  },

  // 添加对象
  changShow() {
    this.setData({
      show: true
    })
  },
  changShowFalse() {
    this.setData({
      show: false
    })
  },
  tianJia() {
    var that = this;
    var app = getApp()
    wx.showLoading({
      title: "加载中",
    });
    wx.request({
      url: getApp().globalData.url + '/score/' + "getTheme" + '/' + that.data.userId + '/' + that.data.themeId,
      method: "POST",
      success: (res) => {
        console.log(res)
        that.setData({
          theme: res.data.data[0],
          'nvabarData.title': res.data.data[0].name
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })
  },
  inp_name(e) {
    this.data.item[0].name = e.detail
    this.setData({
      item: this.data.item,
    })
  },
  inp_In(e) {
    this.data.item[0].intt = e.detail
    this.setData({
      item: this.data.item,
    })
  },
  afterReadItem(e) {
    this.data.item[0].img = e.detail.file.url
    this.setData({
      item: this.data.item,
    })
    this.data.itemImgShow.splice(0, 0, {
      url: e.detail.file.url
    })
    this.setData({
      itemImgShow: this.data.itemImgShow
    })
  },
  delItemImg(e) {
    this.data.item[0].img = ""
    this.setData({
      item: this.data.item,
    })
    this.data.itemImgShow.splice(0, 1)
    this.setData({
      itemImgShow: this.data.itemImgShow
    })
  },

  // 评分
  pingfeng(itemId, val) {
    var that = this;
    var app = getApp()
    wx.request({
      url: getApp().globalData.url + '/score/' + "PingFen" + '/' + that.data.userId + '/' + that.data.themeId + '/' + itemId,
      data: val,
      method: "POST",
      success: (res) => {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            theme: res.data.data[0],
          })
        }
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })
  },

  // 评分
  onChange(event) {
    console.log(event)
    let itemId = event.currentTarget.dataset.id
    let val = event.detail
    this.pingfeng(itemId, val)
  },

  // 图片上传
  img_upload: function (res) {
    let that = this;

    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var path = 'www/wwwroot/liy/message_detail/images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

    uploadImage(this.data.item[0].img, path,
      function (result) {
        console.log(result)
        that.data.item[0].img = result;
        that.setData({
          item: that.data.item,
        })
      },
    )
  },
  tiJiao() {
    let that = this
    // 检查
    if (this.data.item[0].name.length == 0 ||
      this.data.item[0].intt.length == 0 ||
      this.data.item[0].img.length == 0) {
      wx.showToast({
        title: '信息不完整',
        icon: "error"
      })
    } else {
      // 上传Theme先
      this.img_upload();
      wx.showModal({
        title: '提示',
        content: '确定发布么？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.showLoading({
              title: "发布中",
            });
            wx.request({
              url: getApp().globalData.url + '/score/addItems/' + this.data.userId + '/' + that.data.themeId,
              data: {
                mangoScoreItemPos: that.data.item,
              },
              header: {
                "authorization": wx.getStorageSync("token")
              },
              method: 'POST',
              success: (result) => {
                if (result.data.code == 200) {
                  wx.showModal({
                    title: '提示',
                    content: "发布成功",
                    confirmText: '确定',
                    showCancel: false,
                    success(res) {
                      wx.hideLoading();
                    }
                  });
                  that.changShowFalse();
                  this.loadTheme()
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
          }
        },
      })

    }
    wx.hideLoading();
  },


  // 预览图片
  seeImg(e){
    console.log(e)
    let src = e.currentTarget.dataset.src
    wx.previewImage({
      urls: [src],
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    if(this.data.userInfo.userIsAdmin == 1){
      return
    }
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    if(this.data.userInfo.userIsAdmin == 1){
      return
    }
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if(this.data.userInfo.userIsAdmin == 1){
      return
    }
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

  // 删除对象
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
            url: getApp().globalData.url + '/score/deleteItems/' + this.data.userId + '/' + id,
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
                this.loadTheme()
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
        }
      },
    })
    wx.hideLoading();
  },


})