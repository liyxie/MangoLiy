package work.liy.mango.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoShopMapper;
import work.liy.mango.model.MangoShop;
import work.liy.mango.util.SameService;

@Service
public class MangoShopService extends SameService<MangoShopMapper,MangoShop> {
    @Autowired
    private MangoShopMapper mangoShopMapper;


}
