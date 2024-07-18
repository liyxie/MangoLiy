const app = getApp()
var bmap = require('../../utils/bmap-wx.min.js');
var util = require('../../utils/util.js');
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '加载中', //导航栏 中间的标题
      height: 0
    },
    height: app.globalData.height * 2 + 20,

    active: 0,
    first_active:0,
    imageUrl:"",
    allCategoryMessage: [],
    userId: -1,
    activeIndex: 1,
    heat_activeIndex: 1,
    floorstatus: "none",

    // 帖子
    user_message: [],
    heat_message: [],
    isLastPage: false, //是否最后一页
    isHeatPage: false,
    message:'',
    //标签处于的位置
    page:0,
    page1:0,
    page2:0,

    navTop: 58,

    picker: ["日常", "失物招领", "闲置交易", "校园求助", "兼职代事"],
    pickerIndex: 0,
  },

// 切换标签栏
  titleOnChange(event){
    console.log("切换标签栏")
    console.log(event.detail)
    // this.selectComponent('#tabs').resize();
    if(event.detail.name==0){
      this.data.page=0;
      // this.switchTitlePage(0,this.data.page1);
    }
    if(event.detail.name==1){
      this.data.page=1;
      // this.switchTitlePage(1,this.data.page2)
      if(this.data.heat_message.length == 0){
        wx.showLoading({
          title: '加载中...',
          mask: true
          });
        this.loadMessage(1,"getAllHotMessageDetail"); 
        wx.hideLoading();
      }

    }
    this.setData({
      page: this.data.page
    })
    
  },

  onChange(event) {
    console.log("onChange : " + event.detail)
    var pages;
    if(event.detail.name==0){
      pages=0;
      this.data.page2=0;
      this.switchTitlePage(0,pages);
    }
    if(event.detail.name==1){
      pages=1;
      this.data.page2=1;
      this.switchTitlePage(0,pages);
    }
    if(event.detail.name==2){
      pages=2;
      this.data.page2=2;
      this.switchTitlePage(0,pages);
    }
    this.data.page1=pages;
  },

  onSecondChange(event) {
    var pages;

    if(event.detail.name==0){
      pages=0;
      this.switchTitlePage(1,pages);
    }
    if(event.detail.name==1){
      pages=1;
      this.switchTitlePage(1,pages);
    }
    if(event.detail.name==2){
      pages=2;
      this.switchTitlePage(1,pages);
    }
    this.data.page2=pages;
  
},

// 切换标签栏后加载
  switchTitlePage(title,page){
    console.log("切换标签栏后加载")
    this.data.isLastPage=false;
    // this.data.activeIndex=1;
    this.data.user_message=[];
    wx.showLoading({
      title: '加载中...',
      mask: true
      });
      setTimeout(() => {
        wx.hideLoading();
        var message;
        if(title == 1){
        if(page==0)
          message="getAllHotMessageDetail";  
        if(page==1)
        message="getAllHotMessageDetail/5";
        if(page==2){
          message="getAllHotMessageDetail/3";
        }
        }
        if(title == 0){
        if(page==0)
          message="getAllMessageDetail";  
        if(page==1)
          message="getAllMessageDetail/5";
        if(page==2){
          this.data.userId=getApp().globalData.userId;
          this.my_fav();
          message="getAllCollectionMessageByUserId/"+this.data.userId;
        }
        }
        this.loadMessage(1,message);  
        this.data.message=message;
        }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    console.log(options.index)
    this.data.pickerIndex = parseInt(options.index)+1
    this.data.message="getAllMessageDetail";  

    this.data.nvabarData.title = this.data.picker[parseInt(options.index)],
    this.setData({
      nvabarData: this.data.nvabarData,
      navTop: getApp().globalData.navTop,
      imageUrl:getApp().globalData.imageUrl,
      allCategoryMessage: getApp().globalData.categoryMessage,
      height: getApp().globalData.height,
      pickerIndex: this.data.pickerIndex,
    })
    this.setData({
      height: app.globalData.height
    })
    this.setData({
      userId: getApp().globalData.userId
    })
    // this.loadMessage(1,"getAllMessageDetail");
  },

  // 未登录
  my_fav() {
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
  },
  onClick(e) {
    this.selectComponent('#tabs').resize();
  },

// 增加帖子
  loadMessage(index,message) {
    console.log("获得帖子")
    console.log(index + "  " + message)
    var that = this;
    var app = getApp()
    wx.request({
      url: getApp().globalData.url + '/getMessage/'+ message + '/' + that.data.pickerIndex + '/' + index,
      method: "POST",
      success: (res) => {
        if (res.data == 200) {
          if(that.data.page == 1){
            that.setData({
              HeatisPage: true
            })
          }else{
            that.setData({
              isLastPage: true
            })
          }
          return;
        }
        if(that.data.page == 1){
            that.setData({
              heat_message: that.data.heat_message.concat(res.data)
            })
        }else{
          that.setData({
            user_message: that.data.user_message.concat(res.data)
          })
        }

      },
      complete: function(res) {
        wx.hideLoading();
      },
    })
  },
  /**
   * 下拉刷新
   */
  onReachBottom: function() {
    console.log("onReachBottom")
    // 最后一页了，取消下拉功能
    if ((this.data.isLastPage && this.data.page == 0) || (this.data.page == 1 && this.data.HeatisPage)) {
      return
    }

    // 最新
    if(this.data.page == 0){
      this.loadMessage(++this.data.activeIndex,this.data.message);
    }
    // 最热
    else if(this.data.page == 1){
      this.loadMessage(++this.data.heat_activeIndex,"getAllHotMessageDetail");
    }else{
      this.loadMessage(++this.data.activeIndex,this.data.message);
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("监听页面显示")
    this.setData({
      user_message:[],
      heat_message:[],
      isLastPage:false,
      HeatisPage:false,
      activeIndex:1
    })
    if(this.data.page == 0){
      this.loadMessage(1,"getAllMessageDetail");
    }
    // 最热
    else if(this.data.page == 1){
      this.loadMessage(1,"getAllHotMessageDetail");
    }else{
      this.loadMessage(1,"getAllMessageDetail");
    }
    // this.data.user_message=[];
    // var pages = 0;
    // if(this.data.page == 0)
    //   pages = this.data.page1;
    // if (this.data.page == 1) 
    //   pages = this.data.page2;
    // this.switchTitlePage(this.data.page,pages);
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
      // 在这里编写数据更新的逻辑
    
    
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


  // 查看详细
  to_message_detail: function(e) {
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?messageId=' + e.currentTarget.id,
    })
  },
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})