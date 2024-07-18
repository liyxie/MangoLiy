package work.liy.mango.service;

import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoNoticeMapper;
import work.liy.mango.model.MangoNotice;
import work.liy.mango.util.SameService;

@Service
public class MangoNoticeService extends SameService<MangoNoticeMapper, MangoNotice> {
}
