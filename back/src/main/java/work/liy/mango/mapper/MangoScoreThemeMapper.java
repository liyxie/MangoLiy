package work.liy.mango.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import work.liy.mango.model.score.MangoScoreThemePo;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author liy
 * @since 2024-04-11
 */
@Mapper
public interface MangoScoreThemeMapper extends BaseMapper<MangoScoreThemePo> {

    List<MangoScoreThemePo> getAllScore();
}
