package work.liy.mango.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.liy.mango.mapper.MangoSensitiveWordsMapper;
import work.liy.mango.model.MangoSensitiveWordsPo;
import work.liy.mango.model.MangoUser;
import work.liy.mango.util.DFA.DFAUtil;
import work.liy.mango.util.SameService;

import java.util.List;

/**
 * <p>
 * 敏感词库 服务实现类
 * </p>
 *
 * @author liy
 * @since 2024-04-25
 */
@Service
public class MangoSensitiveWordsServiceImpl extends SameService<MangoSensitiveWordsMapper, MangoSensitiveWordsPo> {

    @Autowired
    private MangoUserService userService;

    @Transactional
    public boolean addWord(Integer userId, String word) {
        MangoUser user = userService.getById(userId);
        if(user != null && user.getUserIsAdmin() != 1){
            MangoSensitiveWordsPo sensitiveWordsPo = new MangoSensitiveWordsPo().setWord(word);
            return this.save(sensitiveWordsPo);
        }
        upWords();
        return false;

    }

    public List<MangoSensitiveWordsPo> getList() {
        return baseMapper.selectList(new LambdaQueryWrapper<MangoSensitiveWordsPo>()
                .eq(MangoSensitiveWordsPo::getIsDel, 0));
    }

    @Transactional
    public boolean deleteWord(Integer id) {
        MangoSensitiveWordsPo sensitiveWordsPo = baseMapper.selectOne(new LambdaQueryWrapper<MangoSensitiveWordsPo>()
                .eq(MangoSensitiveWordsPo::getIsDel, 0)
                .eq(MangoSensitiveWordsPo::getId, id));
        if(sensitiveWordsPo == null){
            return false;
        }
        sensitiveWordsPo.setIsDel(1);
        boolean i = baseMapper.updateById(sensitiveWordsPo) > 0;
        upWords();
        return i;
    }

    @Transactional
    public boolean noUseWord(Integer id, Integer use) {
        MangoSensitiveWordsPo sensitiveWordsPo = baseMapper.selectOne(new LambdaQueryWrapper<MangoSensitiveWordsPo>()
                .eq(MangoSensitiveWordsPo::getIsDel, 0)
                .eq(MangoSensitiveWordsPo::getId, id));
        if(sensitiveWordsPo == null){
            return false;
        }
        if(sensitiveWordsPo.getIsUse() == 1){
            use = 0;
        }
        sensitiveWordsPo.setIsUse(use);
        boolean i = baseMapper.updateById(sensitiveWordsPo) > 0;
        upWords();
        return i;
    }

    public void upWords(){
        new DFAUtil().newInit();
    }
}
