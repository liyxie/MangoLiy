package work.liy.mango.service;



import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoScoreUiMapper;
import work.liy.mango.model.score.MangoScoreUiPo;
import work.liy.mango.util.SameService;

/**
 * <p>
 * 用户评分表 服务实现类
 * </p>
 *
 * @author liy
 * @since 2024-04-11
 */


@Service
public class MangoScoreUiServiceImpl extends SameService<MangoScoreUiMapper, MangoScoreUiPo> {

    public Double getScore(Integer id, String userId) {
        MangoScoreUiPo mangoScoreUiPo = baseMapper.selectOne(
                new LambdaQueryWrapper<MangoScoreUiPo>()
                        .eq(id != null, MangoScoreUiPo::getItemId, id)
                        .eq(MangoScoreUiPo::getUserId, Integer.valueOf(userId))
        );
        if(mangoScoreUiPo == null){
            return 0.0;
        }
        return mangoScoreUiPo.getScore();
    }
}
