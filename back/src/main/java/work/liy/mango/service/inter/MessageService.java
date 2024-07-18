package work.liy.mango.service.inter;

import com.baomidou.mybatisplus.extension.service.IService;
import work.liy.mango.model.MangoChatMessage;

public interface MessageService extends IService<MangoChatMessage> {


    int sendMessage(MangoChatMessage mangoChatMessage);

    boolean delete(String userId, String id);
}
