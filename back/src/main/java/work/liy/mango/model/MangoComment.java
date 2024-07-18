package work.liy.mango.model;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class MangoComment {
    @TableId(value = "comment_id")
    private Integer commentId;

    private Integer userId;
    private Integer messageId;
    private String commentDetail;
    private Date commentCreatTime;
    private String isAnonymousReply;
    @TableField(exist = false)
    private MangoUser mangoUser;


    public MangoUser getMangoUser() {
        return mangoUser;
    }

    public void setMangoUser(MangoUser mangoUser) {
        this.mangoUser = mangoUser;
    }

    @TableField(exist = false)
    private List<MangoCommentReply> commentReplies;

    public List<MangoCommentReply> getCommentReplies() {
        return commentReplies;
    }

    public void setCommentReplies(List<MangoCommentReply> commentReplies) {
        this.commentReplies = commentReplies;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public String getCommentDetail() {
        return commentDetail;
    }

    public void setCommentDetail(String commentDetail) {
        this.commentDetail = commentDetail;
    }

    public Date getCommentCreatTime() {
        return commentCreatTime;
    }

    public void setCommentCreatTime(Date commentCreatTime) {
        this.commentCreatTime = commentCreatTime;
    }
}
