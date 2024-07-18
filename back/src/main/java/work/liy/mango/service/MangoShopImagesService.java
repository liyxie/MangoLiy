package work.liy.mango.service;

import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoShopImagesMapper;
import work.liy.mango.model.MangoShopImages;
import work.liy.mango.util.SameService;

import java.util.List;

@Service
public class MangoShopImagesService extends SameService<MangoShopImagesMapper,MangoShopImages> {

    public List<MangoShopImages> selectByShopId(Integer shopId){
        return baseMapper.selectByShopId(shopId);
    }

}
