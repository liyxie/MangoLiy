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
import java.util.List;

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
@TableName("mango_score_theme")
public class MangoScoreThemePo extends Model<MangoScoreThemePo> {

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 主题
     */
    @TableField("name")
    private String name;

    /**
     * 简介
     */
    @TableField("introduction")
    private String introduction;

    /**
     * 是否删除，0否，1是
     */
    @TableField("is_del")
    private Integer isDel;

    /**
     * 是否禁用，0是，1否
     */
    @TableField("is_use")
    private Integer isUse;

    /**
     * 图片链接
     */
    @TableField("img_url")
    private String imgUrl;

    /**
     * 创建者id
     */
    @TableField("create_id")
    private Integer createId;

    /**
     * 创建时间
     */
    @TableField("create_time")
    private Date createTime;

    /**
     * 是否开放
     */
    @TableField("is_open")
    private Integer isOpen;

    @TableField("sum")
    private Integer sum;

    @TableField(exist = false)
    private List<MangoScoreItemPo> list;

    @Override
    public Serializable pkVal() {
        return this.id;
    }
}
