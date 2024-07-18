package work.liy.mango.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoAttendMapper;
import work.liy.mango.model.MangoAttend;
import work.liy.mango.util.SameService;

import java.util.List;

@Service
public class MangoAttendService extends SameService<MangoAttendMapper,MangoAttend> {

    @Autowired
    private MangoAttendMapper mangoAttendMapper;

    public List<MangoAttend> getAllAttendMessageByUserId(Integer id) {
        return mangoAttendMapper.getAllAttendMessageByUserId(id);
    }
}
