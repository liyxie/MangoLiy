package work.liy.mango.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import work.liy.mango.model.MangoDriftBottlePo;
import work.liy.mango.model.MangoUser;
import work.liy.mango.model.WXMessage;
import work.liy.mango.service.MangoDriftBottleServiceImpl;
import work.liy.mango.service.MangoUserService;
import work.liy.mango.util.CheckMessageUtil;
import work.liy.mango.util.CheckType;
import work.liy.mango.util.MimeTypeEnum;
import work.liy.mango.util.R;
import work.liy.mango.util.isDelete.IsDelete;
import work.liy.mango.util.uploadFileByTencentCOS.TencentCOSUtils;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 漂流瓶 前端控制器
 * </p>
 *
 * @author liy
 * @since 2024-03-28
 */
@Slf4j
@RestController
@RequestMapping("/mangoDriftBottle")
public class MangoDriftBottleController {

    @Autowired
    private MangoDriftBottleServiceImpl mangoDriftBottleService;
    @Autowired
    private MangoUserService mangoUserService;
    @Autowired
    private WXMessage wxMessage;
    @Autowired
    private TencentCOSUtils tencentCOSUtils;


    /**
     * @description: 飘出漂流瓶
     * @author: liy
     * @param:
     * @return:
     **/
    @Transactional
    @PostMapping("/addMangoDriftBottle/{userId}")
    public R addMangoDriftBottle(@RequestBody MangoDriftBottlePo mangoDriftBottlePo, @PathVariable String userId ){
        // 检测文件类型
        if(!mangoDriftBottlePo.getType().equals("0")){
            MimeTypeEnum typeEnum = MimeTypeEnum.getByUrl(mangoDriftBottlePo.getContent());
            mangoDriftBottlePo.setType(typeEnum == null? MimeTypeEnum.BZ.getCode().toString():typeEnum.getCode().toString());
        }

        // 文字类的检查
        // 检查用户信息,是否禁用
        MangoUser user = mangoUserService.getById(mangoDriftBottlePo.getCreateId());
        if(user == null){
            return R.error(1000, "用户不存在");
        }
        if(user.getUserAllow() != 1){
            return R.error(301, "用户已被禁用");
        }

        // 文本类型
        if(mangoDriftBottlePo.getType().equals("0")){
            if (CheckMessageUtil.checkMessage(mangoDriftBottlePo.getTitle()+mangoDriftBottlePo.getContent(), wxMessage)) {
                return R.error(403, "检测到内容违规,请重新输入");
            }
        }
        // 通用检测
        else if(CheckMessageUtil.checkMessage(mangoDriftBottlePo.getTitle(), wxMessage, CheckType.text)){
            return R.error(403, "检测到内容违规,请重新输入");
        }

        // 保存漂流瓶
        if(mangoDriftBottleService.saveNew(mangoDriftBottlePo, userId)){
            return R.ok(200);
        }

        return R.error();
    }

    /**
     * @description: 上传文件
     * @author: liy
     * @param:
     * @return:
     **/
    @Transactional
    @PostMapping("/addMangoDriftBottleFile")
    public R addMangoDriftBottle(@RequestParam("file") MultipartFile file){
        Map<String, Object> result = new HashMap<>();
        if (file.isEmpty()) {
            return R.error("请选择要上传的文件");
        }

        String url = null;
        try {
            url = tencentCOSUtils.upload(file, tencentCOSUtils.getAvatar());
        } catch (Exception e) {
            e.printStackTrace();
        }

        result.put("success", true);
        result.put("url", url);
        log.info("result:");
        log.info(String.valueOf(result));
        return R.ok(200).put("url", url);
    }

    /**
     * @description: 随机获取漂流瓶
     * @author: liy
     * @param:
     * @return:
     **/
    @Transactional
    @GetMapping("/getMangoDriftBottle/{userId}")
    public R getMangoDriftBottle(@PathVariable String userId){

        if(!mangoDriftBottleService.CheckGetBottle(userId)){
//            return R.ok("今日次数已用完");
        }

        MangoDriftBottlePo mangoDriftBottlePo = mangoDriftBottleService.getRandomBottle(userId);
        if(mangoDriftBottlePo != null){
            return R.ok(200).put("res", mangoDriftBottlePo);
        }
        return R.ok(300);

    }

    /**
     * @description: 获得全部漂流瓶，分页
     * @author: liy
     * @param:
     * @return:
     **/
    @PostMapping("/getAllBorrle/{pageNumber}")
    public List<MangoDriftBottlePo> getHeatScore(@PathVariable Integer pageNumber) {
        PageHelper.startPage(pageNumber, 8);

        PageInfo<MangoDriftBottlePo> pageInfo = new PageInfo<MangoDriftBottlePo>(mangoDriftBottleService.getList());

        if (pageInfo.getPageNum() < pageNumber) {
            List list1 = new LinkedList();
            list1.add(200);
            return list1;
        }
        List<MangoDriftBottlePo> allMessage = pageInfo.getList();
        return allMessage;
    }

//     删除
    @PostMapping("/deleteBottleById/{userId}/{id}")
    public IsDelete deleteBottleById(@PathVariable Integer userId, @PathVariable Integer id) {
        return mangoDriftBottleService.deleteById(userId, id);
    }
    /**
     * @description: 获取指定漂流瓶
     * @author: liy
     * @param:
     * @return:
     **/
    @Transactional
    @GetMapping("/getDriftBottle/{id}")
    public R getDriftBottle(@PathVariable String id){

        MangoDriftBottlePo mangoDriftBottlePo = mangoDriftBottleService.getRandomBottleByid(id);
        if(mangoDriftBottlePo != null){
            return R.ok(200).put("res", mangoDriftBottlePo);
        }
        return R.ok(300);

    }

    /**
     * @description: 搜索
     * @author: liy
     * @param:
     * @return:
     **/
    @PostMapping("/bottleByKeyword/{keyword}/{pageNumber}")
    public List<MangoDriftBottlePo> bottleByKeyword(@PathVariable String keyword, @PathVariable Integer pageNumber) {

        PageHelper.startPage(pageNumber, 8);

        PageInfo<MangoDriftBottlePo> pageInfo = new PageInfo<MangoDriftBottlePo>(mangoDriftBottleService.getbottleByKeyword(keyword));

        if (pageInfo.getPageNum() < pageNumber) {
            List list1 = new LinkedList();
            list1.add(200);
            return list1;
        }

        List<MangoDriftBottlePo> allMessage = pageInfo.getList();

        return allMessage;

    }



}
