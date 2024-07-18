package work.liy.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import work.liy.mango.model.MangoSensitiveWordsPo;
import work.liy.mango.service.MangoSensitiveWordsServiceImpl;
import work.liy.mango.util.R;

import java.util.List;

/**
 * <p>
 * 敏感词库 前端控制器
 * </p>
 *
 * @author liy
 * @since 2024-04-25
 */
@RestController
@RequestMapping("/SensitiveWordsPo")
public class MangoSensitiveWordsController {

    @Autowired
    private MangoSensitiveWordsServiceImpl sensitiveWordsService;

    /**
     * @description: 添加名词
     * @author: liy
     * @param:
     * @return:
     **/
    @Transactional
    @PostMapping("/addWord/{userId}")
    public R addWord(@PathVariable Integer userId, @RequestBody String word) {

        if(sensitiveWordsService.addWord(userId, word)){
            return R.ok(200);
        };
        return R.error("添加失败");

    }

    @PostMapping("/getWord")
    public List<MangoSensitiveWordsPo> getWord() {

        List<MangoSensitiveWordsPo> allMessage = sensitiveWordsService.getList();
        return allMessage;

    }

    @PostMapping("/deleteWord/{id}")
    public R deleteWord(@PathVariable Integer id) {
        if(sensitiveWordsService.deleteWord(id)){
            return R.ok(200);
        }
        return R.error("出现错误");
    }

    @PostMapping("/noUseWord/{id}")
    public R noUseWord(@PathVariable Integer id) {
        Integer use = 1;
        if(sensitiveWordsService.noUseWord(id, use)){
            return R.ok(200);
        }
        return R.error("出现错误");
    }


}
