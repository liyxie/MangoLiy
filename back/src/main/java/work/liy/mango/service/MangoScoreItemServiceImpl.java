package work.liy.mango.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoScoreItemMapper;
import work.liy.mango.model.score.MangoScoreItemPo;
import work.liy.mango.model.score.MangoScoreThemeVo;
import work.liy.mango.model.score.MangoScoreUiPo;
import work.liy.mango.util.SameService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author liy
 * @since 2024-04-11
 */
@Service
public class MangoScoreItemServiceImpl extends SameService<MangoScoreItemMapper, MangoScoreItemPo> {

    @Autowired
    private MangoScoreUiServiceImpl uiService;
    @Autowired
    private MangoScoreThemeServiceImpl themeService;

    public Boolean add(String userId, String id, List<MangoScoreThemeVo> mangoScoreItemPos) {
        List<MangoScoreItemPo> list = new ArrayList<>();
        for (MangoScoreThemeVo m: mangoScoreItemPos) {
            MangoScoreItemPo mangoScoreItemPo = new MangoScoreItemPo();

            mangoScoreItemPo.setName(m.getName());
            mangoScoreItemPo.setIntroduction(m.getIntt());
            mangoScoreItemPo.setImgUrl(m.getImg());
            mangoScoreItemPo.setCreateId(Integer.valueOf(userId));
            mangoScoreItemPo.setThemeId(Integer.valueOf(id));
            list.add(mangoScoreItemPo);
        }

        return this.saveBatch(list);

    }

    public List<MangoScoreItemPo> getListByTid(Integer id, int  itemNum) {
        LambdaQueryWrapper<MangoScoreItemPo> queryWrapper = new LambdaQueryWrapper<MangoScoreItemPo>();
        queryWrapper.eq(id != null, MangoScoreItemPo::getThemeId, id)
                .eq(MangoScoreItemPo::getIsDel, 0)
                .last(itemNum > 0, "LIMIT " + itemNum);

        return baseMapper.selectList(queryWrapper);
    }

    public boolean delete(String userId, String id) {
        LambdaQueryWrapper<MangoScoreItemPo> wrapper = new LambdaQueryWrapper<MangoScoreItemPo>()
                .eq(MangoScoreItemPo::getId, id)
                .eq(MangoScoreItemPo::getIsDel, 0);
        MangoScoreItemPo itemPo = baseMapper.selectOne(wrapper);
        if(itemPo != null){
            itemPo.setIsDel(1);

            LambdaQueryWrapper<MangoScoreUiPo> wrapper1 = new LambdaQueryWrapper<MangoScoreUiPo>()
                    .eq(MangoScoreUiPo::getItemId, id);
//            List<MangoScoreUiPo> uiPoList = uiService.list(wrapper1);
//            List<Integer> ids = uiPoList.stream().map(MangoScoreUiPo::getUserId).collect(Collectors.toList());

            uiService.remove(wrapper1);

            List<Integer> newIds = uiService.list(
                    new LambdaQueryWrapper<MangoScoreUiPo>().eq(MangoScoreUiPo::getThemeId,itemPo.getThemeId())
            ).stream().map(MangoScoreUiPo::getUserId).distinct().collect(Collectors.toList());
            themeService.update(themeService.getById(itemPo.getId()).setSum(newIds.size()));

            return baseMapper.updateById(itemPo) > 0 ;
        }
        else {
            return false;
        }
    }
}
