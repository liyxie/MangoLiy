
//云东西存储地址 
var fileHost = "https://liy1900-********.cos.ap-guangzhou.myqcloud.com/"; 

// 上线
var Url = "http://*********:8081";
var wsUrl = 'ws://*********:8081/';

// 本地
// var Url = "http://127.0.0.1:8081";
// var wsUrl = 'ws://127.0.0.1:8081/';

//oss地址
var imageUrl = "https://liy1900-************.cos.ap-guangzhou.myqcloud.com/";

var config = {
  //腾讯 对象存储 config
  uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
  AccessKeySecret: '', // AccessKeySecret 腾讯云
  OSSAccessKeyId: '', // AccessKeyId 腾讯云
  timeout: 87600 ,//上传文件时Policy的失效时间
  serverUrl: Url,
  imgUrl : Url + "/upImgs",
  wsUrl :wsUrl,
  imageUrl:imageUrl,
};
module.exports = config
