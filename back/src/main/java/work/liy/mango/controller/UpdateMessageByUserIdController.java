package work.liy.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import work.liy.mango.util.isUpdate.IsUpdate;
import work.liy.mango.service.MangoMessageDetailService;
import work.liy.mango.service.MangoUserService;

@RestController
public class UpdateMessageByUserIdController {

    @Autowired
    private MangoMessageDetailService mangoMessageDetailService;
    @Autowired
    private MangoUserService mangoUserService;
    @Transactional
    @PostMapping("/updateMessageById/{id}/{messageId}")
    public IsUpdate updateMessageById(@PathVariable Integer id, @PathVariable Integer messageId, @RequestBody String message){


        return new IsUpdate().isTrue(id,messageId,message,mangoMessageDetailService,mangoUserService);
    }
}
