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

/**
 * <p>
 * 敏感词库
 * </p>
 *
 * @author liy
 * @since 2024-04-25
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("mango_sensitive_words")
public class MangoSensitiveWordsPo extends Model<MangoSensitiveWordsPo> {

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 敏感词
     */
    @TableField("word")
    private String word;

    @TableField("is_del")
    private Integer isDel;

    @TableField("is_use")
    private Integer isUse;

    @Override
    public Serializable pkVal() {
        return this.id;
    }
}
