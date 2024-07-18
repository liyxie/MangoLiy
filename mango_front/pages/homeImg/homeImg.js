// pages/homeImg/homeImg.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '轮播图管理', //导航栏 中间的标题
      height: 0
    },
    imageList:[],
    fileList:[],

    imgNum: 1,
    showDialog1: false,
    xuanZho:'',

    shezhilianjei:false,
    in_linajieId:'',
    tuIndex:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    wx.request({
      url: getApp().globalData.url + '/getMessage/getAllSwiperMessage',
      method:"POST",
      success(res){
          that.setData({
            imageList:res.data,
          })
      }
    })
    wx.request({
      url: getApp().globalData.url + '/getMessage/getAllSwiperMessageShu',
      method:"POST",
      success(res){
          that.setData({
            imgNum:res.data,
          })
      }
    })
  },

  setNum(){
    let num = this.data.imageList.lenght
    console.log("this.data.imageList.lenght : " + this.data.imageList.lenght)
    this.setData({
        imgNum: num
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
    // this.setNum()
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

  updataImg: function(e) {
    var id = this.data.xuanZho;

    let that = this;
    console.log(" 选择图片");
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles
        // 开始上传图片
        wx.uploadFile({
          url: getApp().globalData.url+'/updateSwiperMessage?id='+id, // 你的上传图片API的地址
          filePath: tempFilePaths[0].tempFilePath,
          name: 'file',
          success (res){
            if(res.data ==401){
              wx.showToast({
                title: '文件为空',
                icon: 'error', // 可选值：success, loading, none
                duration: 2000, // 持续时间，单位为毫秒
              });
            }
            else if(res.data ==402){
              wx.showToast({
                title: '文件过大',
                icon: 'error', // 可选值：success, loading, none
                duration: 2000, // 持续时间，单位为毫秒
              });
            }
            else if(res.data == 200){
            wx.showToast({
              title: '更改成功',
              icon: 'success', // 可选值：success, loading, none
              duration: 2000, // 持续时间，单位为毫秒
            });
            that.onLoad();
           }else {
            wx.showToast({
              title: '服务器故障！',
              icon: 'error', // 可选值：success, loading, none
              duration: 2000, // 持续时间，单位为毫秒
            });
           }
          
            //do something
          }
        })
      }
    })    
  },

  changeImg: function(e) {
    let that = this;
    console.log(e.detail.file.url);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = e.detail.file.url
        // 开始上传图片
        wx.uploadFile({
          url: getApp().globalData.url+'/newSwiperMessage', // 你的上传图片API的地址
          filePath: tempFilePaths,
          name: 'file',
          success (res){
            if(res.data ==401){
              wx.showToast({
                title: '文件为空',
                icon: 'error', // 可选值：success, loading, none
                duration: 2000, // 持续时间，单位为毫秒
              });
            }
            else if(res.data ==402){
              wx.showToast({
                title: '文件过大',
                icon: 'error', // 可选值：success, loading, none
                duration: 2000, // 持续时间，单位为毫秒
              });
            }
            else if(res.data == 200){
            wx.showToast({
              title: '上传成功',
              icon: 'success', // 可选值：success, loading, none
              duration: 2000, // 持续时间，单位为毫秒
            });
            that.onLoad();
           }else {
            wx.showToast({
              title: '服务器故障！',
              icon: 'error', // 可选值：success, loading, none
              duration: 2000, // 持续时间，单位为毫秒
            });
           }
          
            //do something
          }
        })
  },

  delete_img(){
    var id = this.data.xuanZho;
    let that = this;
    console.log(" 删除图片");
        wx.request({
          url: getApp().globalData.url+'/deleteSwiperMessage?id='+id, // 你的上传图片API的地址
          method:"POST",
          success (res){
            that.change(-1);
            if(res.data ==401){
              wx.showToast({
                title: '文件为空',
                icon: 'error', // 可选值：success, loading, none
                duration: 2000, // 持续时间，单位为毫秒
              });
            }
            else if(res.data ==402){
              wx.showToast({
                title: '文件过大',
                icon: 'error', // 可选值：success, loading, none
                duration: 2000, // 持续时间，单位为毫秒
              });
            }
            else if(res.data == 200){
            wx.showToast({
              title: '删除成功',
              icon: 'success', // 可选值：success, loading, none
              duration: 2000, // 持续时间，单位为毫秒
            });
            that.onLoad();
           }else {
            wx.showToast({
              title: '服务器故障！',
              icon: 'error', // 可选值：success, loading, none
              duration: 2000, // 持续时间，单位为毫秒
            });
           }
          
            //do something
          }
        })  
  },

  // 设置连接
  change_img(e){
    console.log(e)
    this.setData({
      shezhilianjei: !this.data.shezhilianjei,
      in_linajieId:''
    })
    this.change(-1)
  },
  quXiaoAdd(e){
    console.log(e)
    this.setData({
      shezhilianjei: !this.data.shezhilianjei,
      in_linajieId:''
    })
  },
  InputUrl(e){
    console.log(e.detail)
    this.setData({
      in_linajieId:e.detail.value
    })
  },
  // 修改链接
  addlianjie(e){
    let that = this;
    console.log(this.data.in_linajieId);
    // if(typeof this.data.in_linajieId == 'undefined'|| this.data.in_linajieId.length == 0){
    //   this.setData({
    //     in_linajieId:0
    //   })
    // }
        // 开始上传图片
        wx.request({
          url: getApp().globalData.url+'/newSwiperUrl/'+ that.data.xuanZho, 
          data:that.data.in_linajieId.length == 0 ? "0":that.data.in_linajieId,
          header: {
            "authorization": wx.getStorageSync("token")
          },
          method: 'POST',
          success (res){
            if(res.data ==401){
              wx.showToast({
                title: '帖子id错误',
                icon: 'error', // 可选值：success, loading, none
                duration: 2000, // 持续时间，单位为毫秒
              });
            }
            else if(res.data ==402){
              wx.showToast({
                title: '文件过大',
                icon: 'error', // 可选值：success, loading, none
                duration: 2000, // 持续时间，单位为毫秒
              });
            }
            else if(res.data == 200){
            wx.showToast({
              title: '修改成功',
              icon: 'success', // 可选值：success, loading, none
              duration: 2000, // 持续时间，单位为毫秒
            });
            that.onLoad();
           }else {
            wx.showToast({
              title: '服务器故障！',
              icon: 'error', // 可选值：success, loading, none
              duration: 2000, // 持续时间，单位为毫秒
            });
           } 
            //do something
          }
        })
  },

  change: function(e){
    console.log(e)
    this.setData({
      showDialog1: !this.data.showDialog1,
    })
    if(e != -1){
      let id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index
      console.log(index)
      this.setData({
        xuanZho: id,
        tuIndex: index
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },


})