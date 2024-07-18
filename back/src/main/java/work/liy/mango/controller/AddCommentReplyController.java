package work.liy.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import work.liy.mango.model.MangoCommentReply;
import work.liy.mango.service.MangoAttendService;
import work.liy.mango.service.MangoCommentReplayService;
import work.liy.mango.service.MangoNewMessageService;
import work.liy.mango.service.MangoUserService;
import work.liy.mango.util.isCommentReply.IsCommentReply;

@RestController
public class AddCommentReplyController {

    @Autowired
    private MangoUserService mangoUserService;
    @Autowired
    private MangoCommentReplayService mangoCommentReplayService;
    @Autowired
    private MangoNewMessageService mangoNewMessageService;
    @Autowired
    private MangoAttendService mangoAttendService;

    /*
        二次回复
     */
    @Transactional
    @PostMapping("/addCommentReply/{messageId}")
    public IsCommentReply addCommentReply(@PathVariable Integer messageId, @RequestBody MangoCommentReply mangoCommentReply) {

        return new IsCommentReply().isTrue(messageId, mangoCommentReply, mangoUserService, mangoCommentReplayService, mangoNewMessageService,mangoAttendService);

    }


}
