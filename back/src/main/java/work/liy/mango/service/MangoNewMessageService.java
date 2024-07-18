package work.liy.mango.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoNewMessageMapper;
import work.liy.mango.model.MangoNewMessage;
import work.liy.mango.util.SameService;

import java.util.List;

@Service
public class MangoNewMessageService extends SameService<MangoNewMessageMapper,MangoNewMessage> {


    @Autowired
    private MangoNewMessageMapper mangoNewMessageMapper;

    public List<MangoNewMessage> getAllNewMessage(Integer userId) {
        return mangoNewMessageMapper.getAllNewMessage(userId);
    }

    public MangoNewMessage getLastNewMessage(Integer id) {
        return mangoNewMessageMapper.getLastNewMessage(id);
    }
}
