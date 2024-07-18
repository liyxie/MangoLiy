package work.liy.mango.model.score;

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
 * 
 * </p>
 *
 * @author liy
 * @since 2024-04-11
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("mango_score_item")
public class MangoScoreItemPo extends Model<MangoScoreItemPo> {

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 评分对象名
     */
    @TableField("name")
    private String name;

    /**
     * 简介
     */
    @TableField("introduction")
    private String introduction;

    /**
     * 是否删除
     */
    @TableField("is_del")
    private Integer isDel;

    /**
     * 图片链接
     */
    @TableField("img_url")
    private String imgUrl;

    /**
     * 创建时间
     */
    @TableField("create_time")
    private Date createTime;

    /**
     * 创建者id
     */
    @TableField("create_id")
    private Integer createId;

    /**
     * 所属主题id
     */
    @TableField("theme_id")
    private Integer themeId;

    /**
     * 评论人数
     */
    @TableField("num_people")
    private Integer numPeople;

    /**
     * 分数
     */
    @TableField("score")
    private Double score;

    /**
     * 总分
     */
    @TableField("sum_score")
    private Double sumScore;

    @TableField(exist = false)
    private Double myScore;

    @Override
    public Serializable pkVal() {
        return this.id;
    }
}
