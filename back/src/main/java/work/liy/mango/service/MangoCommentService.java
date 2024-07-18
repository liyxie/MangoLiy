package work.liy.mango.service;

import org.springframework.stereotype.Service;
import work.liy.mango.mapper.MangoCommentMapper;
import work.liy.mango.model.MangoComment;
import work.liy.mango.util.SameService;

@Service
public class MangoCommentService extends SameService<MangoCommentMapper,MangoComment> {
}
