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

/**
 * <p>
 * 用户评分表
 * </p>
 *
 * @author liy
 * @since 2024-04-11
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("mango_score_ui")
public class MangoScoreUiPo extends Model<MangoScoreUiPo> {

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 评分对象id
     */
    @TableField("item_id")
    private Integer itemId;

    /**
     * 用户id
     */
    @TableField("user_id")
    private Integer userId;

    @TableField("theme_id")
    private Integer themeId;
    /**
     * 分数
     */
    @TableField("score")
    private Double score;

    @TableField("comment")
    private String comment;

    @TableField("like_num")
    private Integer likeNum;

    @Override
    public Serializable pkVal() {
        return this.id;
    }
}
