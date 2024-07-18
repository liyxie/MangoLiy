// pages/goJuXian/sushedianliang/sushedianliang.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '宿舍电量', //导航栏 中间的标题
      height: 0,

      
    },
index: null,
    xuehao:"",

    lou:[],
    cen:[],
    hao:[],
    louindex:null,
    cenindex:null,
    haoindex:null,

    xlou:"",
    xcen:"",
    xhao:"",

    dianlang:""

  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  inXUehao(e){
    console.log(e)
    this.setData({
      xuehao:e.detail.value
    })
    if(e.detail.value.length == 12){
      this.chaxunlou(1)
    }
  },

  louChange(e) {
    if(this.data.xuehao.length < 12){
      wx.showToast({
        title: "请先输入学号",
        icon: 'error',
      })
      return
    }
    console.log(e);
    this.setData({
      louindex: e.detail.value
    })
    this.setData({
      xlou:this.data.lou[e.detail.value]
    })
    this.chaxuncen(1)
  },
  cenChange(e) {
      if(this.data.xlou.length < 1){
        wx.showToast({
          title: "请先输入宿舍楼",
          icon: 'error',
        })
        return
      }
    console.log(e);
    this.setData({
      cenindex: e.detail.value
    })
    this.setData({
      xcen:this.data.cen[e.detail.value]
    })
    this.chaxunhao(1)
  },
  haoChange(e) {
    if(this.data.xcen.length < 1){
      wx.showToast({
        title: "请先输入楼层",
        icon: 'error',
      })
      return
    }
    console.log(e);
    this.setData({
      haoindex: e.detail.value
    })
    this.setData({
      xhao:this.data.hao[e.detail.value]
    })
  },

  chaxunlou(e){
    let that = this;
    let now = new Date();  
    // 格式化日期和时间  
    let year = String(now.getFullYear()).padStart(4, '0'); // 年份，四位数  
    let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份，两位数  
    let date = String(now.getDate()).padStart(2, '0'); // 日期，两位数  
    let hours = String(now.getHours()).padStart(2, '0'); // 小时，两位数  
    let minutes = String(now.getMinutes()).padStart(2, '0'); // 分钟，两位数  
    let seconds = String(now.getSeconds()).padStart(2, '0'); // 秒，两位数  
    let milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // 毫秒，三位数
    let customTimestamp = year + month + date + hours + minutes + seconds + milliseconds; 
    wx.request({
      url: 'https://xqh5.17wanxiao.com/smartWaterAndElectricityService/SWAEServlet',
      method:"POST",
      header: {
        'Host': 'xqh5.17wanxiao.com',
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        param: '{"cmd":"getbuildlist","zoneid":1,"account":'+that.data.xuehao+',"timestamp":'+customTimestamp+'}', 
        customercode: 973,  
        method: 'getbuildlist',  
        command: 'JBSWaterElecService'
      },
      success (res) {
        console.log(res)
        if(res.data.code_ != 0){
          wx.showToast({
            title: res.data.message_,
            icon: 'error',
          })
        }else{
          that.setlou(JSON.parse(res.data.body))
        }
      }
    })
  },
  chaxuncen(e){
    let that = this;
    let now = new Date();  
    // 格式化日期和时间  
    let year = String(now.getFullYear()).padStart(4, '0'); // 年份，四位数  
    let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份，两位数  
    let date = String(now.getDate()).padStart(2, '0'); // 日期，两位数  
    let hours = String(now.getHours()).padStart(2, '0'); // 小时，两位数  
    let minutes = String(now.getMinutes()).padStart(2, '0'); // 分钟，两位数  
    let seconds = String(now.getSeconds()).padStart(2, '0'); // 秒，两位数  
    let milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // 毫秒，三位数
    let customTimestamp = year + month + date + hours + minutes + seconds + milliseconds; 
    wx.request({
      url: 'https://xqh5.17wanxiao.com/smartWaterAndElectricityService/SWAEServlet',
      method:"POST",
      header: {
        'Host': 'xqh5.17wanxiao.com',
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        param: '{"cmd":"getfloorlist","account":'
        +that.data.xuehao+
        ',"timestamp":'+customTimestamp+","
        +"buildid:"+that.data.xlou.id
        +'}', 
        customercode: 973,  
        method: 'getfloorlist',  
        command: 'JBSWaterElecService'
      },
      success (res) {
        console.log(res)
        if(res.data.code_ != 0){
          wx.showToast({
            title: res.data.message_,
            icon: 'error',
          })
        }else{
          that.setData({
            cen:JSON.parse(res.data.body).data
          })
        }
      }
    })
  },
  chaxunhao(e){
    let that = this;
    let now = new Date();  
    // 格式化日期和时间  
    let year = String(now.getFullYear()).padStart(4, '0'); // 年份，四位数  
    let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份，两位数  
    let date = String(now.getDate()).padStart(2, '0'); // 日期，两位数  
    let hours = String(now.getHours()).padStart(2, '0'); // 小时，两位数  
    let minutes = String(now.getMinutes()).padStart(2, '0'); // 分钟，两位数  
    let seconds = String(now.getSeconds()).padStart(2, '0'); // 秒，两位数  
    let milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // 毫秒，三位数
    let customTimestamp = year + month + date + hours + minutes + seconds + milliseconds; 
    wx.request({
      url: 'https://xqh5.17wanxiao.com/smartWaterAndElectricityService/SWAEServlet',
      method:"POST",
      header: {
        'Host': 'xqh5.17wanxiao.com',
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        param: '{"cmd":"getroomnumlist","account":'
        +that.data.xuehao+',"timestamp":'+customTimestamp+","
        +'"floorid":'+that.data.xcen.id
        +'}', 
        customercode: 973,  
        method: 'getroomnumlist',  
        command: 'JBSWaterElecService'
      },
      success (res) {
        console.log(res)
        if(res.data.code_ != 0){
          wx.showToast({
            title: res.data.message_,
            icon: 'error',
          })
        }else{
          that.setData({
            hao:JSON.parse(res.data.body).data
          })
        }
      }
    })
  },

  jiasushe(e){
    let that = this;
    let now = new Date();  
    // 格式化日期和时间  
    let year = String(now.getFullYear()).padStart(4, '0'); // 年份，四位数  
    let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份，两位数  
    let date = String(now.getDate()).padStart(2, '0'); // 日期，两位数  
    let hours = String(now.getHours()).padStart(2, '0'); // 小时，两位数  
    let minutes = String(now.getMinutes()).padStart(2, '0'); // 分钟，两位数  
    let seconds = String(now.getSeconds()).padStart(2, '0'); // 秒，两位数  
    let milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // 毫秒，三位数
    let customTimestamp = year + month + date + hours + minutes + seconds + milliseconds; 
    wx.request({
      url: 'https://xqh5.17wanxiao.com/smartWaterAndElectricityService/SWAEServlet',
      method:"POST",
      header: {
        'Host': 'xqh5.17wanxiao.com',
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        param: '{"cmd":"bindroom","zoneid":1,"account":'
        +that.data.xuehao+',"timestamp":'+customTimestamp+","
        +'"buildid":'+that.data.xlou.id+","
        +'"floorid":'+that.data.xcen.id+","
        +'"roomnum":'+that.data.xhao.id
        +'}', 
        customercode: 973,  
        method: 'bindroom',  
        command: 'JBSWaterElecService'
      },
      success (res) {
        console.log(res)
        if(res.data.code_ != 0){
          wx.showToast({
            title: res.data.message_,
            icon: 'error',
          })
        }else{
          that.chaxunDianliang(1)
        }
      }
    })
  },
  chaxunDianliang(e){
    let that = this;
    let now = new Date();  
    // 格式化日期和时间  
    let year = String(now.getFullYear()).padStart(4, '0'); // 年份，四位数  
    let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份，两位数  
    let date = String(now.getDate()).padStart(2, '0'); // 日期，两位数  
    let hours = String(now.getHours()).padStart(2, '0'); // 小时，两位数  
    let minutes = String(now.getMinutes()).padStart(2, '0'); // 分钟，两位数  
    let seconds = String(now.getSeconds()).padStart(2, '0'); // 秒，两位数  
    let milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // 毫秒，三位数
    let customTimestamp = year + month + date + hours + minutes + seconds + milliseconds; 
    wx.request({
      url: 'https://xqh5.17wanxiao.com/smartWaterAndElectricityService/SWAEServlet',
      method:"POST",
      header: {
        'Host': 'xqh5.17wanxiao.com',
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        param: '{"cmd":"getbindroom","account":'
        +that.data.xuehao+',"timestamp":'+customTimestamp
        +'}', 
        customercode: 973,  
        method: 'getbindroom',  
        command: 'JBSWaterElecService'
      },
      success (res) {
        console.log(res)
        if(res.data.code_ != 0){
          wx.showToast({
            title: res.data.message_,
            icon: 'error',
          })
        }else{
          that.shujuchuli(JSON.parse(res.data.body))
          // that.setData({
          //   dianlang:JSON.parse(res.data).body.roomlist
          // })
        }
      }
    })
  },

  shujuchuli(res){
    let f = false
    console.log(res.roomlist)
    res.roomlist.forEach(e => {
      let lastIndex = e.roomfullname.lastIndexOf("_");  
      let beforeLastUnderscore = e.roomfullname.substring(lastIndex+1, e.roomfullname.length);
      console.log(beforeLastUnderscore)
      console.log(this.data.xhao.name)
      if(beforeLastUnderscore == this.data.xhao.name){
        f = true
        this.setData({
          dianlang:e
        })
        return;
      }
    });
    if(f){
      return
    }
    wx.showToast({
      title: '未知错误，请退出重试',
      icon:"error"
    })
  },

  setlou(data){
    this.setData({
      lou:data.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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

  }
})