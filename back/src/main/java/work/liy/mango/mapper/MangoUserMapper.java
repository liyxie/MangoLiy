package work.liy.mango.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import org.springframework.context.annotation.Primary;
import work.liy.mango.model.MangoUser;


@Primary
public interface MangoUserMapper extends BaseMapper<MangoUser> {

    Integer insertUserMessage(MangoUser mangoUser);

    MangoUser selectUserByOpenid(String userOpenid);


    void updateUserInfo(MangoUser mangoUser);

    MangoUser selectUserByID(int userId);

    int updateBanStatus(int userId, int status);

    int updateUserRole(int userId, int roleId);
}