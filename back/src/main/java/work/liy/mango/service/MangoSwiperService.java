package work.liy.mango.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoSwiperMapper;
import work.liy.mango.model.MangoMessage;
import work.liy.mango.model.MangoSwiper;
import work.liy.mango.util.SameService;

@Service
public class MangoSwiperService extends SameService<MangoSwiperMapper,MangoSwiper> {

    @Autowired
    private MangoMessageDetailService messageDetailService;

    public Boolean deleteBySId(int id){
        return baseMapper.deleteById(id) > 0;
    }

    public int upUrl(int id, String url) {
        MangoSwiper swiper = this.getById(id);
        if(swiper == null){
            return 201;
        }

        if(url != null && !url.equals("") && !url.equals("0")){
            MangoMessage message = messageDetailService.getById(url);

            if(message == null){
                return 401;
            }
        }

        swiper.setUrl(url);
        return baseMapper.updateById(swiper) > 0 ? 200 : 201;

    }
}