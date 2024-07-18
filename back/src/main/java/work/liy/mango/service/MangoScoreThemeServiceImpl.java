package work.liy.mango.service;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoScoreItemMapper;
import work.liy.mango.mapper.MangoScoreThemeMapper;
import work.liy.mango.mapper.MangoScoreUiMapper;
import work.liy.mango.model.MangoUser;
import work.liy.mango.model.score.MangoScoreItemPo;
import work.liy.mango.model.score.MangoScoreThemePo;
import work.liy.mango.model.score.MangoScoreUiPo;
import work.liy.mango.util.SameService;
import work.liy.mango.util.isDelete.IsDelete;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
public class MangoScoreThemeServiceImpl extends SameService<MangoScoreThemeMapper, MangoScoreThemePo> {

    @Autowired
    private MangoScoreUiMapper uiMapper;

    @Autowired
    private MangoScoreItemMapper itemMapper;

    @Autowired
    private MangoUserService userService;

    public Integer addNew(String userId, MangoScoreThemePo mangoScoreThemePo) {
        mangoScoreThemePo.setCreateId(Integer.valueOf(userId));

        if (baseMapper.insert(mangoScoreThemePo) < 1) {
            return -1;
        }
        ;
        return mangoScoreThemePo.getId();
    }

    public List<MangoScoreThemePo> getAllScore() {
        return baseMapper.getAllScore();
    }

    public List<MangoScoreThemePo> getHeatScore() {
        LambdaQueryWrapper<MangoScoreThemePo> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(MangoScoreThemePo::getIsDel, 0)
                .eq(MangoScoreThemePo::getIsUse, 0)
                .orderByDesc(MangoScoreThemePo::getSum);

        return baseMapper.selectList(queryWrapper);
    }

    public List<MangoScoreThemePo> getAllScoreByName(String name) {
        List<MangoUser> users = userService.list(new LambdaQueryWrapper<MangoUser>()
                .eq(MangoUser::getUserAllow, 1)
                .like(MangoUser::getUserNickname, name));
        List<Integer> userIds = users.stream().filter(Objects::nonNull).map(MangoUser::getUserId).collect(Collectors.toList());

        LambdaQueryWrapper<MangoScoreThemePo> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(MangoScoreThemePo::getIsDel, 0)
                .eq(MangoScoreThemePo::getIsUse, 0)
                .and(w -> w
                        .like(!name.equals(""), MangoScoreThemePo::getName, name)
                        .or()
                        .in(userIds.size() > 0, MangoScoreThemePo::getCreateId, userIds)
                )
                .orderByDesc(MangoScoreThemePo::getCreateTime);

        return baseMapper.selectList(queryWrapper);
    }

    public List<MangoScoreThemePo> getAllScoreById(String id) {
        LambdaQueryWrapper<MangoScoreThemePo> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(MangoScoreThemePo::getIsDel, 0)
                .eq(MangoScoreThemePo::getIsUse, 0)
                .eq(!id.equals(""), MangoScoreThemePo::getId, Integer.valueOf(id))
                .orderByDesc(MangoScoreThemePo::getCreateTime);

        return baseMapper.selectList(queryWrapper);
    }

    public boolean pingfeng(String userId, String themeId, String itemid, String score) {
        // 判断是否已有记录

        Double oldScore;
        MangoScoreUiPo mangoScoreUiPo = uiMapper.selectOne(
                new LambdaQueryWrapper<MangoScoreUiPo>()
                        .eq(!itemid.equals(""), MangoScoreUiPo::getItemId, itemid)
                        .eq(!userId.equals(""), MangoScoreUiPo::getUserId, userId)
        );
        Integer i = uiMapper.selectCount(
                new LambdaQueryWrapper<MangoScoreUiPo>()
                        .eq(!userId.equals(""), MangoScoreUiPo::getUserId, userId)
                        .eq(!themeId.equals(""), MangoScoreUiPo::getThemeId, themeId)
        );
        if (mangoScoreUiPo == null) {
            // ui记录
            mangoScoreUiPo = new MangoScoreUiPo()
                    .setScore(Double.valueOf(score))
                    .setItemId(Integer.valueOf(itemid))
                    .setUserId(Integer.valueOf(userId))
                    .setThemeId(Integer.valueOf(themeId));
            uiMapper.insert(mangoScoreUiPo);

            // 评论人数加1
            if (i == 0) {
                LambdaQueryWrapper<MangoScoreThemePo> queryWrapper = new LambdaQueryWrapper<>();
                queryWrapper.eq(MangoScoreThemePo::getIsDel, 0)
                        .eq(MangoScoreThemePo::getIsUse, 0)
                        .eq(!themeId.equals(""), MangoScoreThemePo::getId, Integer.valueOf(themeId));
                MangoScoreThemePo mangoScoreThemePo = baseMapper.selectOne(queryWrapper);
                mangoScoreThemePo.setSum(mangoScoreThemePo.getSum() + 1);
                baseMapper.updateById(mangoScoreThemePo);
            }

            // item表评分
            MangoScoreItemPo itemPo = itemMapper.selectOne(new LambdaQueryWrapper<MangoScoreItemPo>()
                    .eq(!itemid.equals(""), MangoScoreItemPo::getId, itemid));
            itemPo.setSumScore(itemPo.getSumScore() + Double.parseDouble(score));
            itemPo.setNumPeople(itemPo.getNumPeople() + 1);
            BigDecimal averageScore = BigDecimal.valueOf(itemPo.getSumScore())
                    .divide(new BigDecimal(itemPo.getNumPeople()), 1, BigDecimal.ROUND_HALF_UP);
            itemPo.setScore(averageScore.doubleValue());
            return itemMapper.updateById(itemPo) > 0;

        } else {
            oldScore = mangoScoreUiPo.getScore();
            mangoScoreUiPo.setScore(Double.valueOf(score));
            uiMapper.updateById(mangoScoreUiPo);

            // item
            MangoScoreItemPo itemPo = itemMapper.selectOne(new LambdaQueryWrapper<MangoScoreItemPo>()
                    .eq(!itemid.equals(""), MangoScoreItemPo::getId, itemid));

            itemPo.setSumScore(itemPo.getSumScore() - oldScore + Double.parseDouble(score));
            BigDecimal averageScore = BigDecimal.valueOf(itemPo.getSumScore())
                    .divide(new BigDecimal(itemPo.getNumPeople()), 1, BigDecimal.ROUND_HALF_UP);
            itemPo.setScore(averageScore.doubleValue());
            return itemMapper.updateById(itemPo) > 0;
        }
    }

    /**
     * @description: 根据用户id获取score
     * @author: liy
     * @param:
     * @return:
     **/
    public List<MangoScoreThemePo> getAllThemeByUserId(Integer userId) {
        return baseMapper.selectList(new LambdaQueryWrapper<MangoScoreThemePo>()
                .eq(MangoScoreThemePo::getIsDel, 0)
                .eq(MangoScoreThemePo::getIsUse, 0)
                .eq(userId != null, MangoScoreThemePo::getCreateId, userId)
                .orderByDesc(MangoScoreThemePo::getSum));
    }

    /**
     * @description: 删除评分
     * @author: liy
     * @param:
     * @return:
     **/
    public IsDelete deleteById(Integer userId, Integer themeId) {
        IsDelete isDelete = new IsDelete();
        isDelete.setCode(500);

        MangoUser user = userService.selectUserByUserId(userId);
        if (user == null) {
            isDelete.setCode(1000);
            return isDelete;
        }

        MangoScoreThemePo scoreThemePo = baseMapper.selectOne(new LambdaQueryWrapper<MangoScoreThemePo>()
                .eq(MangoScoreThemePo::getId, themeId)
                .eq(MangoScoreThemePo::getIsDel, 0)
                .eq(user.getUserIsAdmin() == 1, MangoScoreThemePo::getCreateId, userId));
        if (scoreThemePo == null) {
            isDelete.setCode(409);
            return isDelete;
        } else {
            scoreThemePo.setIsDel(1);
            baseMapper.updateById(scoreThemePo);
            // 删除用户参与
            uiMapper.delete(new LambdaQueryWrapper<MangoScoreUiPo>()
                    .eq(MangoScoreUiPo::getThemeId, themeId));
            // 删除对象
            MangoScoreItemPo itemPo = new MangoScoreItemPo().setIsDel(1);
            itemMapper.update(itemPo, new LambdaQueryWrapper<MangoScoreItemPo>()
                    .eq(MangoScoreItemPo::getThemeId, themeId));
            isDelete.setCode(200);
        }
        return isDelete;
    }

    /**
     * @description: 根据参与用户id获得Theme
     * @author: liy
     * @param:
     * @return:
     **/
    public List<MangoScoreThemePo> getAllThemeByUiId(Integer userId) {
        List<MangoScoreUiPo> UiThemeIds = uiMapper.selectList(new QueryWrapper<MangoScoreUiPo>()
                .select("DISTINCT theme_id")
                .lambda()
                .select(MangoScoreUiPo::getThemeId)
                .eq(MangoScoreUiPo::getUserId, userId));
        List<Integer> themeIds = UiThemeIds.stream().filter(Objects::nonNull).map(MangoScoreUiPo::getThemeId).collect(Collectors.toList());

        if (themeIds.size() > 0) {
            return baseMapper.selectList(new LambdaQueryWrapper<MangoScoreThemePo>()
                    .eq(MangoScoreThemePo::getIsDel, 0)
                    .eq(MangoScoreThemePo::getIsUse, 0)
                    .in(MangoScoreThemePo::getId, themeIds)
                    .orderByDesc(MangoScoreThemePo::getSum));
        }
        return new ArrayList<MangoScoreThemePo>();
    }

    /**
     * @description: 根据userId，关键词查找
     * @author: liy
     * @param:
     * @return:
     **/
    public List<MangoScoreThemePo> getAllThemeByUserId(Integer userId, String keyword) {

        return baseMapper.selectList(new LambdaQueryWrapper<MangoScoreThemePo>()
                .eq(MangoScoreThemePo::getIsDel, 0)
                .eq(MangoScoreThemePo::getIsUse, 0)
                .eq(userId != null, MangoScoreThemePo::getCreateId, userId)
                .like(!keyword.equals(""), MangoScoreThemePo::getName, keyword)
                .orderByDesc(MangoScoreThemePo::getSum));
    }
}

