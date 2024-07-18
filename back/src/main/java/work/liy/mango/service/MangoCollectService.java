package work.liy.mango.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoCollectMapper;
import work.liy.mango.model.MangoCollect;
import work.liy.mango.util.SameService;

import java.util.List;

@Service
public class MangoCollectService extends SameService<MangoCollectMapper,MangoCollect> {

    @Autowired
    private MangoCollectMapper mangoCollectMapper;

    public List<MangoCollect> getAllCollectionMessageByUserId(Integer userId) {
        return mangoCollectMapper.getAllCollectionMessageByUserId(userId);
    }
}
