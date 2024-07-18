package work.liy.mango.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoDriftBottleMapper;
import work.liy.mango.mapper.MangoUserMapper;
import work.liy.mango.model.MangoDriftBottlePo;
import work.liy.mango.model.MangoUser;
import work.liy.mango.service.inter.MangoDriftBottleService;
import work.liy.mango.util.CheckType;
import work.liy.mango.util.SameService;
import work.liy.mango.util.isDelete.IsDelete;

import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.stream.Collectors;

/**
 * <p>
 * 漂流瓶 服务实现类
 * </p>
 *
 * @author liy
 * @since 2024-03-28
 */

@Service
public class MangoDriftBottleServiceImpl extends SameService<MangoDriftBottleMapper, MangoDriftBottlePo> implements MangoDriftBottleService {

    @Autowired
    private MangoDriftBottleMapper mangoDriftBottleMapper;

    @Autowired
    private MangoUserMapper userMapper;
    @Autowired
    private MangoUserService userService;

    public boolean saveNew(MangoDriftBottlePo mangoDriftBottlePo, String userId) {

        mangoDriftBottlePo.setCreateId(userId);
        return this.save(mangoDriftBottlePo);
    }

    public MangoDriftBottlePo getRandomBottle(String userId) {
//        随机生成类型
        Integer type = new Random().nextInt(CheckType.video.getCode() + 1);

//        type = 1;

        return getRandomBottle(type, userId);
    }

    public MangoDriftBottlePo getRandomBottle(Integer type, String userId) {




        MangoDriftBottlePo mangoDriftBottlePo = mangoDriftBottleMapper.getOneByRandom(type.toString());
        if(mangoDriftBottlePo != null){
            // 限制只能一个用户一次
        }
        return mangoDriftBottlePo;
    }

    // 检测漂流瓶次数
    public Boolean CheckGetBottle(String userId) {


        return false;
    }

    // 获取全部漂流瓶
    public List<MangoDriftBottlePo> getList() {
        List<MangoDriftBottlePo> driftBottlePos = baseMapper.selectList(new LambdaQueryWrapper<MangoDriftBottlePo>()
                .eq(MangoDriftBottlePo::getIsDel, 0));
        for (MangoDriftBottlePo d: driftBottlePos) {
            d.setUser(userMapper.selectUserByID(Integer.parseInt(d.getCreateId())));
        }
        return driftBottlePos;
    }

    /**
     * @description: 获取指定漂流瓶
     * @author: liy
     * @param:
     * @return:
     **/
    public MangoDriftBottlePo getRandomBottleByid(String id) {
        MangoDriftBottlePo bottlePo = baseMapper.selectOne(new LambdaQueryWrapper<MangoDriftBottlePo>()
                .eq(MangoDriftBottlePo::getIsDel, 0)
                .eq(MangoDriftBottlePo::getId, Integer.valueOf(id)));
        return bottlePo;
    }

    public IsDelete deleteById(Integer userId, Integer id) {
        IsDelete isDelete = new IsDelete();
        isDelete.setCode(500);

        MangoUser user = userService.selectUserByUserId(userId);
        if (user == null) {
            isDelete.setCode(1000);
            return isDelete;
        }

        MangoDriftBottlePo bottlePo = baseMapper.selectOne(new LambdaQueryWrapper<MangoDriftBottlePo>()
                .eq(MangoDriftBottlePo::getIsDel, 0)
                .eq(MangoDriftBottlePo::getId, id)
                .eq(user.getUserIsAdmin() == 1, MangoDriftBottlePo::getCreateId, userId));
        if(bottlePo == null){
            isDelete.setCode(409);
            return isDelete;
        }else {
            bottlePo.setIsDel(1);
            baseMapper.updateById(bottlePo);
            isDelete.setCode(200);
        }

        return isDelete;
    }

    public List<MangoDriftBottlePo> getbottleByKeyword(String keyword) {
        List<MangoUser> users = userService.list(new LambdaQueryWrapper<MangoUser>().like(MangoUser::getUserNickname,keyword));
        List<Integer> userIds= users.stream().filter(Objects::nonNull).map(MangoUser::getUserId).collect(Collectors.toList());

        List<MangoDriftBottlePo> driftBottlePos = baseMapper.selectList(new LambdaQueryWrapper<MangoDriftBottlePo>()
                .eq(MangoDriftBottlePo::getIsDel, 0)
                .and(w -> w
                        .like(MangoDriftBottlePo::getTitle, keyword)
                        .or()
                        .like(MangoDriftBottlePo::getContent, keyword)
                        .or()
                        .in(userIds.size() > 0, MangoDriftBottlePo::getCreateId, userIds)
                )
        );
        for (MangoDriftBottlePo d: driftBottlePos) {
            d.setUser(userMapper.selectUserByID(Integer.parseInt(d.getCreateId())));
        }
        return driftBottlePos;
    }
}
