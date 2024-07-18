package work.liy.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import work.liy.mango.model.MangoMessage;
import work.liy.mango.model.MangoUser;
import work.liy.mango.model.WXMessage;
import work.liy.mango.service.MangoMessageDetailService;
import work.liy.mango.service.MangoMessageImagesService;
import work.liy.mango.service.MangoUserService;
import work.liy.mango.util.CheckMessageUtil;
import work.liy.mango.util.DFA.DFAUtil;
import work.liy.mango.util.R;
import work.liy.mango.util.Upload.IsUpload;

@RestController
public class AddMessageDetailController {
    @Autowired
    private MangoMessageImagesService mangoMessageImagesService;
    @Autowired
    private MangoMessageDetailService mangoMessageDetailService;
    @Autowired
    private MangoUserService mangoUserService;
    @Autowired
    private WXMessage wxMessage;

    @Transactional
    @PostMapping("/addMessage/{userId}")
    public IsUpload addMessage(@PathVariable Integer userId, @RequestBody MangoMessage mangoMessage) {
        return new IsUpload().isTrue(mangoMessage, mangoMessageDetailService, mangoMessageImagesService, mangoUserService);
    }


    @Transactional
    @PostMapping("/saveArticle")
    public R addNewMessage(@RequestBody MangoMessage mangoMessage) {

        // 检查用户信息,是否禁用
        MangoUser user = mangoUserService.getById(mangoMessage.getUserId());
        if(user == null){
            return R.error(1000, "用户不存在");
        }
        if(user.getUserAllow() != 1){
            return R.error(301, "用户已被禁用");
        }

        if (CheckMessageUtil.checkMessage(mangoMessage.getMessageDetail(), wxMessage)) {
            return R.error(403, "检测到内容违规,请重新输入");
        }

        mangoMessage.setMessageDetail(DFAUtil.replaceSensitiveWord(mangoMessage.getMessageDetail(), '*'));

        // 保存文章
        if(mangoMessageDetailService.saveNewMessage(mangoMessage, user)){
            return R.ok(200);
        }else {
            return R.error(403, "未知错误，无法保存");
        }
    }

//    @PostMapping("/saveArticle")
//    @Transactional
//    public IsUpload saveArticle(@RequestBody MangoMessage mangoMessage, HttpServletRequest request) {
//        Integer userId = CheckAllow.checkAllow(userMessageOperationService, request);
//
//        if (userId < 0) {
//            return ResponseData.out(CodeEnum.SIGNATURE_NOT_ALLOW);
//        }
//        if (CheckMessageUtil.checkMessage(mangoMessage.getArticleContent(), wxMessage)) {
//            return ResponseData.error(403, "检测到内容违规,请重新输入");
//        }
//        articleMessage.setUserId(userId);
//        articleOperationService.add(mangoMessage);
//        return ResponseData.success();
//    }
}
