package work.liy.mango.service;

import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoCategoryMapper;
import work.liy.mango.model.MangoCategory;
import work.liy.mango.util.SameService;

@Service
public class MangoCategoryService extends SameService<MangoCategoryMapper,MangoCategory> {
}
