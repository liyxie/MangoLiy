package work.liy.mango.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import work.liy.mango.model.MangoChatMessage;
import work.liy.mango.service.MessageServiceImpl;
import work.liy.mango.util.DateUtils;
import lombok.extern.slf4j.Slf4j;
import work.liy.mango.util.SpringContextUtils;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


    /*
@RestController
@ServerEndpoint(value = "/webSocketOneToOne/{sendId}/{roomId}")
    */
@Slf4j
public class WebSocketOneToOneController {

    // 静态变量，用来记录当前在线连接数
    private static int onlineCount;
    //Map来存放，其中Key为用户标识
    private static final Map<Long, WebSocketOneToOneController> connections = new ConcurrentHashMap<>();
    // 与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    private Long sendId;
    private String roomId;


    private MessageServiceImpl businessMessageService = SpringContextUtils.getBean(MessageServiceImpl.class);

    /**
     * 连接建立成功调用的方法
     *
     * @param session
     * 可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    @OnOpen
    public void onOpen(@PathParam("sendId") Long sendId,@PathParam("roomId") String roomId, Session session) {
        this.session = session;
        this.sendId =sendId;             //用户标识
        this.roomId = roomId;         //会话标识
        connections.put(sendId,this);     //添加到map中
        addOnlineCount();               // 在线数加
        log.info("sendId:"+sendId+"roomId:"+roomId);
        System.out.println(this.session);
        System.out.println("有新连接加入！新用户："+sendId+",当前在线人数为" + getOnlineCount());
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        if (sendId != null) {
            connections.remove(sendId); // 从map中移除
            subOnlineCount(); // 在线数减
            System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
        }
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message
     *            客户端发送过来的消息
     * @param session
     *            可选的参数
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("来自客户端的消息:" + message);
        JSONObject json= JSON.parseObject(message);
        String msg =json.getString("content");  //需要发送的信息
        String requestId = json.getString("requestId");
        int msgType = json.getIntValue("messageType");
        String lastMessageTime = null;
        if(json.containsKey("lastMessageTime")){
            lastMessageTime = json.getString("lastMessageTime");
        }
        Long giftId =null;
        Long receiveId = json.getLong("receiveId");      //发送对象的用户标识(接收者)
        send(msg,sendId,receiveId,roomId,msgType,requestId,lastMessageTime,giftId);
    }

    /**
     * 发生错误时调用
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("发生错误");
        error.printStackTrace();
    }


    /**
     *
     * @param msg 消息内容
     * @param sendId 发送人
     * @param receiveId 接收人
     * @param roomId 房间ID
     * @param msgType 消息类型
     * @param requestId 消息请求ID
     * @param lastMessageTime 最后一次的消息时间
     * @param giftId 礼物ID
     */
    public void send(String msg,Long sendId,Long receiveId,String roomId,int msgType,String requestId,String lastMessageTime,Long giftId){
        MangoChatMessage message = new MangoChatMessage();
        message.setContent(msg);
        Date now = new Date();
        message.setCreatedTime(now);
        message.setReceiver(receiveId);
        message.setSender(sendId);
        message.setContentType(msgType);
        message.setIsRead("0");
        message.setRequestId(requestId);
        message.setType(0);
        if(StringUtils.isNotBlank(lastMessageTime)){
           Date lastTime = DateUtils.stringToDate(lastMessageTime,"yyyy-MM-dd HH:mm");
            long minute = (now.getTime() - lastTime.getTime()) / 1000 / 60;
            log.info("此二人聊天，距离上一次聊天时间相差分钟数："+minute);
            if(minute > 5 ){
               message.setType(1);
           }
        }
        try {
            int res =businessMessageService.sendMessage(message);
            if(res==1){
                message.setStatus("-1");
            }
            //发送
            WebSocketOneToOneController con = connections.get(receiveId);
            if(con!=null){
                if(roomId.equals(con.roomId)){
                    con.session.getBasicRemote().sendText(JSON.toJSONString(message));
                    UpdateWrapper updateWrapper = new UpdateWrapper();
                    updateWrapper.set("is_read",1);
                    updateWrapper.eq("id",message.getId());
                    businessMessageService.update(updateWrapper);
                }
            }
            //通知发送消息的狗逼，消息已经发送成功
            WebSocketOneToOneController confrom = connections.get(sendId);
            if(confrom!=null){
                if(roomId.equals(confrom.roomId)){
                    confrom.session.getBasicRemote().sendText(JSON.toJSONString(message));
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketOneToOneController.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketOneToOneController.onlineCount--;
    }

}
