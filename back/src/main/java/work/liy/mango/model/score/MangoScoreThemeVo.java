package work.liy.mango.model.score;


import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.io.Serializable;

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
public class MangoScoreThemeVo  implements Serializable {

    /**
     * 图片链接
     */
    private String img;

    /**
     * 评分对象名
     */
    private String name;

    /**
     * 简介
     */
    private String intt;

}
