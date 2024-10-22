package work.liy.mango.util.isCollect;

import work.liy.mango.model.MangoCollect;
import work.liy.mango.model.MangoUser;
import work.liy.mango.service.MangoCollectService;
import work.liy.mango.service.MangoUserService;

public class IsCollect {

    private Integer code;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }


    public IsCollect isTrue(Integer userId, Integer messageId, MangoCollectService mangoCollectService, MangoUserService mangoUserService) {

        IsCollect isCollect = new IsCollect();
        isCollect.setCode(500);
        MangoUser user = mangoUserService.getById(userId);
        if (user == null) {
            isCollect.setCode(400);
            return isCollect;
        }

        MangoCollect mangoCollect = new MangoCollect();
        mangoCollect.setUserId(userId);
        mangoCollect.setMessageId(messageId);
        mangoCollectService.add(mangoCollect);

        isCollect.setCode(200);

        return isCollect;

    }
}
