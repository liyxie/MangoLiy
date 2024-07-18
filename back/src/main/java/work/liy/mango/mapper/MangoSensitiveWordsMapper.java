package work.liy.mango.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import work.liy.mango.model.MangoSensitiveWordsPo;

/**
 * <p>
 * 敏感词库 Mapper 接口
 * </p>
 *
 * @author liy
 * @since 2024-04-25
 */
@Mapper
public interface MangoSensitiveWordsMapper extends BaseMapper<MangoSensitiveWordsPo> {

}
