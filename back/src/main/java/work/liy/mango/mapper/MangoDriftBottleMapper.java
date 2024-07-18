package work.liy.mango.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import work.liy.mango.model.MangoDriftBottlePo;

/**
 * <p>
 * 漂流瓶 Mapper 接口
 * </p>
 *
 * @author liy
 * @since 2024-03-28
 */
@Mapper
public interface MangoDriftBottleMapper extends BaseMapper<MangoDriftBottlePo> {

    MangoDriftBottlePo getOneByRandom(@Param("type") String type);
}
