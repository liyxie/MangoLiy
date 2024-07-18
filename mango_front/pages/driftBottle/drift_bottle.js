// pages/driftBottle/drift_bottle.js

//获取应用实例
const app = getApp()
// const myAudio = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {
        // 组件所需的参数
        nvabarData: {
          showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
          title: '漂流瓶', //导航栏 中间的标题
          height: 0,
        },
        isLoading: false, //页面是否渲染完毕
        height: app.globalData.height * 2 + 20,
        userInfo:"",
        userId: -1,

        // 抛出漂流瓶弹窗
        show:false,
        actions: [
          {
            id: 0,
            name: '发送文字',
            subname: '描述写一段文字发送',
          },
          {
            id: 1,
            name: '文件',
            subname: '可发送 图片/音乐/视频 文件',
          },
        ],

        // 发送类型
        sendType: "",
        show1: false,
        title: "",
        con:"",

        show2: false,

        show3: false,

        // 是否发送成功
        isSendSucceed: false,

        // 上传文件名
        FileName: "请选择上传文件名",
        myAudio:"",
        // 是否发送成功(函数)
        checkIsSucceed(action) {
          return new Promise((resolve) => {
            console.log(action)
            if(action === "confirm"){
              if(this.data.title.length == 0 || this.data.con.length == 0){
                resolve(false);
              }
              if(!this.data.isSendSucceed){
                resolve(false)
              } 
            }
            if(action === "cancel"){
              resolve(true)
            }
            resolve(true)
          })
        },

        // 获取的漂流瓶
        bottle:"",
        showBottle: false,
        cishu:1,

        // 音乐
        current: 0,
        forNowTime: '0', //当前播放时间
        forAllTime: '0', //总时长
        duration: 0, //总时间 秒

        id:'',
        idshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      height: app.globalData.height,
    })
    let that = this
    // 弹窗函数绑定 this
    this.setData({
      checkIsSucceed: this.data.checkIsSucceed.bind(this),
    })

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res)
        that.setData({
          userInfo: res.data
        })
      },
    })
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        })
      },
    })

    this.my_fav
    console.log(options.id)
    if(options.id.length != 0){
      this.setData({
        id: options.id,
        showBottle: true,
        idshow: true
      })
      this.getPiaoById()
    }
  },

  my_fav() {
    let that = this;
    console.log("未登录")
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log("onReady")
    let that = this;
    /**页面渲染完毕 */
    setTimeout(function() {
      that.setData({
        isLoading: true
      })
    }, 500)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this;
    /**页面渲染完毕 */
    setTimeout(function() {
      that.setData({
        isLoading: true
      })
    }, 500)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log("监听页面隐藏")
    this.data.myAudio.destroy()

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
console.log("监听页面卸载")
this.data.myAudio.destroy()
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

  // 获取漂流瓶
  closeBottle(e){
    console.log("closeBottle")
    let that = this;
    wx.showModal({
        title: '提示',
        content: '退出后无法再查看！',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success(result){
          if(result.confirm){
            that.setData({
              showBottle: false,
              bottle: "",
              title: "",
              con: ""
            })
          }
          that.data.myAudio.destroy() // 释放音频资源
        }
    })
  },
  
  getPiao(e){
    let that = this;
    // 发送请求
      wx.showModal({
        title: '确定打捞吗',
        // content: '每个用户每日打捞次数为'+ this.data.cishu +'次',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.showLoading({
              title: "打捞中",
            });
            wx.request({
              url: getApp().globalData.url + '/mangoDriftBottle/getMangoDriftBottle/'+this.data.userId,
              header: {
                "authorization": wx.getStorageSync("token")
              },
              method: 'GET',
              success: (result) => {
                wx.hideLoading();
                if (result.data.code == 200) {
                  wx.showModal({
                    title: '提示',
                    content: "打捞成功",
                    showCancel: true,
                  });
                  that.setData({
                    bottle: result.data.res,
                    title: result.data.res.title,
                    con: result.data.res.content,
                    showBottle: true,
                  })
                  if(result.data.res.type == 1){
                    this.music(result.data.res);
                  }
                }
                else if(result.data.code == 300){
                  wx.showModal({
                    title: '提示',
                    content: "打捞失败，请重新尝试",
                    showCancel: true,
                  });
                }
                else {
                  wx.showModal({
                    title: '提示',
                    content: result.data.msg,
                    confirmText: '确定',
                    showCancel: false,
                  });
                }
              },
            });
          }
        },
      })
  },
  getPiaoById(e){
    let that = this;
    // 发送请求
            wx.showLoading({
              title: "打捞中",
            });
            wx.request({
              url: getApp().globalData.url + '/mangoDriftBottle/getDriftBottle/'+this.data.id,
              header: {
                "authorization": wx.getStorageSync("token")
              },
              method: 'GET',
              success: (result) => {
                wx.hideLoading();
                if (result.data.code == 200) {
                  that.setData({
                    bottle: result.data.res,
                    title: result.data.res.title,
                    con: result.data.res.content,
                    showBottle: true,
                  })
                  if(result.data.res.type == 1){
                    this.music(result.data.res);
                  }
                }
                else if(result.data.code == 300){
                  wx.showModal({
                    title: '提示',
                    content: "打捞失败，请重新尝试",
                    showCancel: true,
                  });
                }
                else {
                  wx.showModal({
                    title: '提示',
                    content: result.data.msg,
                    confirmText: '确定',
                    showCancel: false,
                  });
                }
              },
            });
  },
 //音频处理
 music(e){
   this.data.myAudio = wx.createInnerAudioContext();
   console.log("音频处理----------------------------------------")
   this.data.myAudio.src = e.content;
    console.log(this.data.myAudio)
    this.data.myAudio.onCanplay(() => {
      this.data.myAudio.duration
  })
  // 播放时长更新监听
  this.data.myAudio.onTimeUpdate(() => {
    // 监听播放进度，更新页面播放时长和进度条进度
       this.setData({
         forNowTime: parseInt(this.data.myAudio.currentTime),
         forAllTime: parseInt(this.data.myAudio.duration),
         current: this.data.myAudio.currentTime,
         duration: this.data.myAudio.duration
       })
  })
  // 播放出错监听
  this.data.myAudio.onError((res) => {
    console.log("播放出错监听------------------------------------")
    console.log(res)
    console.log(res.errMsg)
    console.log(res.errCode)
  })
  console.log(this.data.myAudio)
  console.log(this.data.myAudio.src)
 },

  // 查看文件
  seeFile(e){
    if(this.data.con.length == 0){
      wx.showToast({
        title: '文件信息丢失',
        icon: 'error',
        duration: 2000
      })
    }
    wx.showLoading({
      title: "加载中",
    });
    // 单次下载允许的最大文件为 200MB
      wx.downloadFile({
        url: this.data.con, // 
        success: function (res) {
            console.log(res, "wx.downloadFile success res")
            if(res.statusCode != 200) {
                return false
            }
            var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
            wx.openDocument({
                filePath: Path,
                showMenu: true,
                success: function (res) {
                    console.log('打开成功');
                    wx.hideLoading();
                }
            })
            wx.hideLoading();
        },
        fail: function (err) {
            console.log(err, "wx.downloadFile fail err");
            wx.hideLoading();
        }
        
      })
  },

  // 飘出漂流瓶
  setPiao(e){
    console.log("飘出漂流瓶 "+e)
    this.setData({
      show: true,
      FileName: "请选择上传文件名"
    })
  },

  // 关闭弹窗
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
    
    if(event.detail.id == 0){
      this.setData({
        show1: true,
        sendType: 0
      })
    }
    if(event.detail.id == 1){
      this.setData({
        show2: true,
        sendType:1
      })
    }
    if(event.detail.id == 2){
      this.setData({
        show3: true,
        sendType:1
      })
    }
  },

  // 取消发送
  onClose1() {
    this.setData({ 
      show1: false,
      show2: false,
      show3: false,
      title: "",
      con: ""
     });
  },


  // 发送文本漂流瓶
  sendText(e){
    if(this.data.title.length == 0 || this.data.con.length == 0){
      this.lackInput(1)
      return;
    }
    let that = this;
    // 发送请求
      wx.showModal({
        title: '提示',
        content: '确定抛出吗，抛出后无法撤回！',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.showLoading({
              title: "抛出中",
            });
            wx.request({
              url: getApp().globalData.url + '/mangoDriftBottle/addMangoDriftBottle/'+this.data.userId,
              data: {
                content: that.data.con,
                title: that.data.title,
                type: "0",
                createId: that.data.userId
              },
              header: {
                "authorization": wx.getStorageSync("token")
              },
              method: 'POST',
              success: (result) => {
                wx.hideLoading();
                this.onClose1();
                if (result.data.code == 200) {
                  wx.showModal({
                    title: '提示',
                    content: "抛出成功",
                    showCancel: true,
                  });
                  that.setData({
                    title: "",
                    con: ""
                  })
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
        },
      })
  },
    // 发送文件漂流瓶（二段）
    sendFlie2(e){
      let that = this;
      // 发送请求
              wx.request({
                url: getApp().globalData.url + '/mangoDriftBottle/addMangoDriftBottle/'+this.data.userId,
                data: {
                  content: e,
                  title: that.data.title,
                  type: "3",
                  createId: that.data.userId
                },
                header: {
                  "authorization": wx.getStorageSync("token")
                },
                method: 'POST',
                success: (result) => {
                  wx.hideLoading();
                  this.onClose1();
                  if (result.data.code == 200) {
                    wx.showModal({
                      title: '提示',
                      content: "抛出成功",
                      showCancel: true,
                    });
                    that.setData({
                      title: "",
                      con: ""
                    })
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
    sendFlie(e){
      if(this.data.title.length == 0 || this.data.con.length == 0){
        this.lackInput(1)
        return;
      }
      let that = this;
      // 发送请求
        wx.showModal({
          title: '提示',
          content: '确定抛出吗，抛出后无法撤回！',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if (result.confirm) {
              wx.showLoading({
                title: "抛出中",
              });
              wx.uploadFile({
                filePath: that.data.con,
                name: 'file',
                url: getApp().globalData.url + '/mangoDriftBottle/addMangoDriftBottleFile/',
                success: (res) => {
                  const data = JSON.parse(res.data)
                  if (data.code == 200) {
                    const avatarUrl = data.url;
                    that.setData({
                      con : avatarUrl
                    })
                    that.sendFlie2(avatarUrl)
                  } else {
                    wx.showToast({
                      icon: 'error',
                      title: '上传失败'
                    })}
                  }
              })
            }
          },
        })
    },
    // 选择文件
    onUpload(){
      let that =this;
      // headers: 真机测试时需要
      let headers = {
         'Content-Type': "multipart/form-data"
      };
      wx.chooseMessageFile({
        count: 1,
          success: function (res) {				       					
            that.tempFilePaths = res.tempFiles[0].path
            that.filename = res.tempFiles[0].name
            that.setData({
              con: res.tempFiles[0].path,
              FileName: res.tempFiles[0].name,
            })
         },				
      });			
    },

    // 少输入
    lackInput(e){
      if(e == 1){
        wx.showToast({
          title: '输入点东西吧',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
        });
        return
      }
    },

    // 视频
    videoErrorCallback(e) {
      console.log('视频错误信息:')
      console.log(e.detail.errMsg)
    },
    onShareAppMessage() {
      return {
        title: 'video',
        path: 'page/component/pages/video/video'
      }
    },
    onReady() {
      this.videoContext = wx.createVideoContext('myVideo')
    },
    onHide() {
    },
    bindVideoEnterPictureInPicture() {
      console.log('进入小窗模式')
    },
    bindVideoLeavePictureInPicture() {
      console.log('退出小窗模式')
    },

    // 音乐
    audioPlay: function (val) {
      console.log("点击了播放按钮", val);
      this.data.myAudio.play() // 播放
    },
    audioPause: function () {
      this.data.myAudio.pause() // 暂停
    },
    audioStop: function () {
      this.data.myAudio.stop() // 停止
    },
    audioChanging(e){
      // 通过 seek 来更改当前播放实例的进度
      this.data.myAudio.seek(e.detail.value)
      // 界面显示滑动的时间同步改变
      this.setData({
        forNowTime: parseInt(e.detail.value)
      })
    },
    audioChange(e){
      this.data.myAudio.seek(e.detail.value)
    },

    showImage(e){
      console.log(e)
      wx.previewImage({
        current: '', // 当前显示图片的http链接
        urls: [] // 需要预览的图片http链接列表
      })
    }
  

})