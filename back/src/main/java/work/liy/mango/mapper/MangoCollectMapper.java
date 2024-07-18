package work.liy.mango.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import work.liy.mango.model.MangoCollect;

import java.util.List;

public interface MangoCollectMapper extends BaseMapper<MangoCollect> {
    List<MangoCollect>  getAllCollectionMessageByUserId(Integer id);

}