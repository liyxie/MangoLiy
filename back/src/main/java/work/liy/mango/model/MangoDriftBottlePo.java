package work.liy.mango.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 漂流瓶
 * </p>
 *
 * @author liy
 * @since 2024-03-28
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("mango_drift_bottle")
public class MangoDriftBottlePo extends Model<MangoDriftBottlePo> {

    /**
     * 漂流瓶id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 发送时间
     */
    @TableField("time")
    private Date time;

    /**
     * 发送者id
     */
    @TableField("create_id")
    private String createId;

    /**
     * 内容
     */
    @TableField("content")
    private String content;

    /**
     * 是否删除
     */
    @TableField("is_del")
    private Integer isDel;

    /**
     * 类型（0文本；3文件；2音乐; 1图片）
     */
    @TableField("type")
    private String type;

    /**
     * 标题
     */
    @TableField("title")
    private String title;

    @TableField(exist = false)
    private MangoUser user;

    @Override
    public Serializable pkVal() {
        return this.id;
    }
}
