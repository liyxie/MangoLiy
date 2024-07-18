var time = require('../../../utils/util.js');
var uploadImage = require('../../../utils/uploadFile');
const recorderManager = wx.getRecorderManager()
const app = getApp()

Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '发布', //导航栏 中间的标题
      height: 0
    },
    height: app.globalData.height * 2 + 20,
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...',
    _focus: false,
    navTop: 0,
    theme_id: -1,
    themeMessage: [],
    speech: false,
    src: "",
    userId: -1,
    input_phone: "",
    input_level: "",
    input_major: "",

    // 选项卡
    show: false,
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
        subname: '描述信息',
        openType: 'share',
      },
    ],
    picker: ["日常", "失物招领", "闲置交易", "校园求助", "兼职代事"],
    index: 0,

    phoneFormat: false,
    phoneError: '',
    phoneLength: false,
    input_loca: "",

    input_num: "",
    input_name: "",

    input_time: "",
  },
  //预览
  priview() {
    let that = this;
    console.log("预览"),
    this.editorCtx.setContents({
      "html": wx.getStorageSync("priviewHtml")
    })
    this.editorCtx.getContents({
      success(res) {
        // 空格转换
        console.log(res.html)
        var content = res.html;
        // content = content.replace(/&nbsp;/g,'aa')
        // content = content.replace(/a/g,'b')
        // content = content.replace(/ /g,'\xa0')
        // content = content.replace(' ','\xa0')
        // content = content.replace(' ','\xa0')

        const val = that.pingJie(content)
        wx.setStorageSync("newPriviewHtml", val);
        wx.setStorageSync("priviewHtml", content);
        console.log(val)
        wx.navigateTo({
          url: '/pages/add_detail_1/add_detail',
        });

      }
    })
  },

  PickerChange(e) {
    this.setData({
      index : e.detail.value,
      input_loca: "",
      input_num: "",
      input_name: "",
      input_time: "",
    })
},

  onClose() {
    this.setData({ show: false });
  },

  onClose1() {
    this.setData({ show: true });
  },
  onSelect(event) {
    console.log(event.detail);
  },

  // 预加载数据
  onLoad(options) {
    let that = this;

    // （界面）
    this.setData({
      navTop: getApp().globalData.navTop,
      heightConfig: getApp().globalData.windowHeight,
      themeMessage: wx.getStorageSync("themeMessage"),
      height: app.globalData.height,
    })

    wx.showToast({
      title: '已开启自动保存',
      icon:"none"
    })

    // 用户缓存信息
    let userInfos = wx.getStorageSync('userInfo');
    this.setData({
        input_level:userInfos.grade,
        input_major:userInfos.major,
        input_phone:userInfos.phone,
    })
    // this.setData({
    //   userIsAdmin: getApp().globalData.userIsAdmin
    // })
    this.setData({
      userId: getApp().globalData.userId
  })

    //读缓存到输入框
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        "html": wx.getStorageSync("priviewHtml")
      })
    }).exec()


    // 主题
    if (options.theme_id != null) {
      this.setData({
        theme_id: options.theme_id
      })
    }
  },

  // 保存
  formSubmit(e) {
    let that = this


    this.editorCtx.getContents({
      success(res) {

        if (res.html.length <= 13) {
          wx.showToast({
            title: '输入点东西吧',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
          });
          return
        }
        let val = that.pingJie(res.html)
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
              let index =parseInt(that.data.index) + 1
              wx.request({
                url: getApp().globalData.url + '/saveArticle',
                data: {
                  messageDetail: val,
                  userId: that.data.userId,
                  userLevel: that.data.input_level,
                  userMajor: that.data.input_major,
                  userPhone: that.data.input_phone,
                  categoryId: index
                },
                header: {
                  "authorization": wx.getStorageSync("token")
                },
                method: 'POST',
                success: (result) => {
                  wx.hideLoading();
                  if (result.data.code == 200) {
                    wx.switchTab({
                      url: '/pages/add/add'
                    });
                    wx.setStorageSync("priviewHtml", "");
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



      }
    })
  },
  /** 录音开始 */
  /**
  speechStart() {
    this.setData({
      speech: true
    })
    const options = {
      duration: 10000, //指定录音的时长，单位 ms
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  stopRecord() {
    let that= this;
    this.setData({
      speech: false
    })
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const {
        tempFilePath
      } = res
      wx.showLoading({
        title: '识别中',
      })
      wx.uploadFile({
        url: getApp().globalData.url + "/speechRecognition",
        filePath: res.tempFilePath,
        header: {
          "authorization": wx.getStorageSync("token")
        },
        name: 'file',
        success: function (result) {
        var m =   JSON.parse(result.data);
  
          that.editorCtx.getContents({
            success(e) {
      
              wx.createSelectorQuery().select('#editor').context(function (res) {
                that.editorCtx = res.context
                that.editorCtx.setContents({
                  "html":e.html+m.data.result[0]
                })
              }).exec()
            }
          })
        
       
          wx.hideLoading({})
        },
      })
    })
  },   
   
   */


  bindPickerChange(e) {
    // 选择了课程类别
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })

  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },

  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats: formats
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat(e) {
    console.log(e)
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },

  // 输入缓存
  input(){
    this.editorCtx.getContents({
      success(res) {
        console.log(res.html)
        var content = res.html
        // content = content.replace(/&nbsp;/g,'\xa0')
        // content = content.replace(/ /g,'\xa0')
        // content = content.replace(' ','\xa0')
        // content = content.replace(' ','\xa0')
        if (res.html.length != 0) {
          console.log("输入缓存  :  "+ content)
          wx.setStorageSync("priviewHtml", content);
        }

      }
    })
  },
  
  // 图片选择
  insertImage() {
    let that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        //把图片上传到云空间
        wx.showLoading({
          title: '正在上传图片',
        })

        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        //上传图片
        //你的域名下的/images/文件下的/当前年月日文件下的/图片.png
        //图片路径可自行修改
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        var path = 'www/wwwroot/liy/message_detail/images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
        uploadImage(res.tempFilePaths[0], path,
          function (result) {
            console.log("======上传成功图片地址为：", result);
            that.editorCtx.insertImage({
              src: result,
              width: "50%",
              success: function (e) {

                wx.hideLoading()
              }
            })
          },
          function (result) {
            console.log("======上传失败======", result);
            wx.hideLoading()
          }
        )
        //插入编辑器结束
        //云文件上传结束
      }
    })
    //选择图片结束
  },

  // 手机号检验
  input_phone: function(e) {
    let value = e.detail;
    this.setData({
        input_phone: value
    })
    const regex = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (this.data.input_phone.length !== 0 && this.data.input_phone.length !== 11) {
      this.setData({
        phoneLength: true,
        phoneError: '手机长度有误'
      })
    } else if (this.data.input_phone.length !== 0 && !regex .test(this.data.input_phone)) {
      this.setData({
        phoneFormat: true,
        phoneError: '手机号有误',
        phoneLength: false
      })
    }else{
      this.setData({
        phoneFormat: false,
        phoneError: '',
        phoneLength: false,
      })
    }
},

 // 拼接
  pingJie(e){
    console.log(e);
    let newE  = "";
    if(this.data.index == 1){
      newE = e + "<p><br></p>" 
      + (this.data.input_loca.length == 0 ? "": ("<p>地点：" + this.data.input_loca + "</p>"))
      + (this.data.input_time.length == 0 ? "": ("<p>时间：" + this.data.input_time + "</p>"))
      + (this.data.input_phone.length == 0 ? "": ("<p>联系方式：" + this.data.input_phone + "</p>"));
    }
    if(this.data.index == 2){
      newE = e + "<p><br></p>" 
      + (this.data.input_loca.length == 0 ? "": ("<p>价格：" + this.data.input_num + "</p>"))
      + (this.data.input_time.length == 0 ? "": ("<p>商品名：" + this.data.input_name + "</p>"))
      + (this.data.input_phone.length == 0 ? "": ("<p>联系方式：" + this.data.input_phone + "</p>"));
    }
    if(this.data.index == 3){
      newE = e + "<p><br></p>" 
      + (this.data.input_time.length == 0 ? "": ("<p>时效性：" + this.data.input_time + "</p>"))
      + (this.data.input_phone.length == 0 ? "":( "<p>联系方式：" + this.data.input_phone + "</p>"));
    }
    if(this.data.index == 4){
      newE = e + "<p><br></p>" 
      + (this.data.input_time.length == 0 ? "": ("<p>时效性：" + this.data.input_time + "</p>"))
      + (this.data.input_phone.length == 0 ? "": ("<p>联系方式：" + this.data.input_phone + "</p>"));
    }
    if(this.data.index == 0){
      newE = e;
    }
    return newE;
  },

})