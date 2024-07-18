package work.liy.mango.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import work.liy.mango.model.MangoNewMessage;

import java.util.List;

public interface MangoNewMessageMapper extends BaseMapper<MangoNewMessage> {

    List<MangoNewMessage> getAllNewMessage(Integer id);


    MangoNewMessage getLastNewMessage(Integer id);
}