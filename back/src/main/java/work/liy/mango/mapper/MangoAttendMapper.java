package work.liy.mango.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import work.liy.mango.model.MangoAttend;

import java.util.List;


public interface MangoAttendMapper extends BaseMapper<MangoAttend> {
    List<MangoAttend> getAllAttendMessageByUserId(Integer id);
}