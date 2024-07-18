# 微信小程序

根据



使用技术
1.前端：

  原生小程序开发

2.后端

springBoot

mybatis-plus

mysql

WebSocket

腾讯cos

### 程序本身的一些功能
1. 校园墙（发帖、评论等）

2. 漂流瓶（发东西，随机收东西）
3. 一对一聊天（可发图片表情）
4. 校园评分（超低配虎扑评分）

一些小功能：

1. 天气预报（但没申请到微信获取定位API，位置暂时写死）
2. 校内小店（crud）
3. 电量查询（抓包自己学校弄得，其他人用不到）
4. 翻译（直接调微信API的）

特点：

1. 管理员可控制轮播图、轮播图跳转
2. DFA过滤违禁词，可自定义违禁词
3. 漂流瓶可以发文本，文档文件，图片，音乐，视频，可在线听、看

 # 如何使用
 ## 本地部署
 ### 前台
 在 util目录下的 config.js修改
  1. imageUrl和fileHost为个人腾讯云的对象存储cos的访问域名
  2. Url 为你服务器的地址，本地部署环境，就设置为127.0.0.1即完事了，由于服务器开的端口为7778，所以你得写成这样：http://127.0.0.1:7778
  3. wsUrl 为一对一聊天的地址，本地为： ws://127.0.0.1:7778/ 后面有斜杠。
  4. pages的index的index.js的getWeather函数，是天气预报的，要用需要高德或者百度地图ApiKey，免费的申请就行

 ### 后台
 在 resources目录下的application.yml 修改
 1.  把server 的整个ssl注释掉，因为本地测试，这个负责线上的wss（这是原项目写的，本地也注释了没啥问题）
 2.  修改spring下的url，username，password ，分别为数据库地址，用户名，密码，本系统用的jdbc驱动可以直接连接MySQL5.7和MySQL8.0
 3.  到下面的oa下的wx，里面是微信小程序的app-id和app-secret，自己去微信找。
 4.  sms是发送信息模板，需要去腾讯云开通短信，appid和appkey就是上面腾讯云访问密钥的SecretId和SecretKey。（原项目的，没用到）
 5.  sms中的templateId是正文模板id，我的是腾讯云的国内短信的正文模板管理里面的id， sign为签名管理的签名内容。（原项目的，没用到）
 6.  sdkId是短信下的应用管理的应用列表的SDK AppID：是短信应用的唯一标识，调用短信API接口时，需要提供该参数。（原项目的，没用到）
 7.  bucketName是cos对象存储的，偷个懒都放一块了，就是存储桶列表的存储桶名称。
 8.  img 下的为文件存储的地址，我的操作是服务器本地存储，这样其他设备就能云端通过http访问。本地你就写本地地址，然后本地访问路径就好了。
 9.  avatar:头像存储地址，avatarHttpImg：头像访问路径 ；headImg：主页轮播图存储地址；chatImg:聊天图片存储地址；shopImg商店图片存储地址。


 ## 云端部署

小程序改url和wsurl为线上ip与端口

后端用docker，本地package拿到jar包，和Dockerfile文件一起上传服务器同目录，，

以下为原项目运行

 ### 我的后台是idea直接打包为jar让宝塔直接运行的。
 ### 前台
 主要步骤和本地部署的一样，只说差异处
 1. Url :设置为云端域名，用http还是https自己看。
 2. wsUrl:也是云端的wss协议需要服务器去配置，小程序的合法域名必需要是wss和https。
 ### 后台
主要步骤和本地部署的一样，只说差异处
1. ssl为wss协议的解析，如果可以使用wss就不需要注释，不会用wss就注释掉。
2. 下面说ssl 的各项：key-store就是服务器存放证书文件的地址，本地也能用，测试过
3. key-store-password和key-password就是设置的密码，key-store-type是文件的类型jks
4. 首先你要有3个pem ： chain.pem 和 fullchain.pem 和 privkey.pem 。然后设置密码给转成.jks文件
5. 下面是服务器脚本，记得自己先去路径看看自己有没有这个文件，所有文件根据真实路径来，下面是演示路径,下面脚本是ChatGPT写的，我也看不懂
openssl pkcs12 -export -in /etc/letsencrypt/live/(你的域名)/fullchain.pem -inkey /etc/letsencrypt/live/(你的域名)/privkey.pem -out keystore.p12 -name wssMango -CAfile /etc/letsencrypt/live/(你的域名)/chain.pem -caname root
keytool -importkeystore -deststorepass 123456 -destkeypass 123456 -destkeystore keystore.jks -srckeystore keystore.p12 -srcstoretype PKCS12 -srcstorepass 123456 -alias wssMango
最后会生成一个keystore.jks，然后你把路径填进去就完事了。

