package work.liy.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import work.liy.mango.model.userComment;
import work.liy.mango.service.MangoAttendService;
import work.liy.mango.service.MangoCommentService;
import work.liy.mango.service.MangoNewMessageService;
import work.liy.mango.service.MangoUserService;
import work.liy.mango.util.isComment.IsComment;

@RestController
public class AddCommentController {

    @Autowired
    private MangoUserService mangoUserService;
    @Autowired
    private MangoCommentService mangoCommentService;
    @Autowired
    private MangoNewMessageService mangoNewMessageService;
    @Autowired
    private MangoAttendService mangoAttendService;


    // 回复
    @Transactional
    @PostMapping("/addComment/{userId}/{messageId}/{messageUserId}")
    public IsComment addComment(@PathVariable Integer userId, @RequestBody userComment comment, @PathVariable Integer messageId, @PathVariable Integer messageUserId) {
        return new IsComment().isTrue(userId, messageId, comment, messageUserId, mangoUserService, mangoCommentService, mangoNewMessageService, mangoAttendService);
    }

}
