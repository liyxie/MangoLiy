
package work.liy.mango.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import work.liy.mango.model.MangoUser;
import work.liy.mango.model.score.MangoScoreItemPo;
import work.liy.mango.model.score.MangoScoreThemePo;
import work.liy.mango.model.score.Vo;
import work.liy.mango.service.MangoScoreItemServiceImpl;
import work.liy.mango.service.MangoScoreThemeServiceImpl;
import work.liy.mango.service.MangoScoreUiServiceImpl;
import work.liy.mango.service.MangoUserService;
import work.liy.mango.util.R;
import work.liy.mango.util.isDelete.IsDelete;

import java.util.LinkedList;
import java.util.List;

/**
 * @Author LiY
 */

@Slf4j
@RestController
@RequestMapping("/score")
public class ScoreController {

    @Autowired
    private MangoScoreThemeServiceImpl mangoScoreThemeService;
    @Autowired
    private MangoScoreItemServiceImpl mangoScoreItemService;
    @Autowired
    private MangoScoreUiServiceImpl uiService;
    @Autowired
    private MangoUserService userService;
    @Autowired
    private IsDelete IsDelete1;

    @PostMapping("/getAllScore/{pageNumber}")
    public List<MangoScoreThemePo> getAllScore(@PathVariable Integer pageNumber) {
        PageHelper.startPage(pageNumber, 8);

        PageInfo<MangoScoreThemePo> pageInfo = new PageInfo<MangoScoreThemePo>(mangoScoreThemeService.getAllScore());

        if (pageInfo.getPageNum() < pageNumber) {
            List list1 = new LinkedList();
            list1.add(200);
            return list1;
        }
        List<MangoScoreThemePo> allMessage = pageInfo.getList();
        return getItemsByThemem(allMessage, 3);
    }

    @PostMapping("/getHeatScore/{pageNumber}")
    public List<MangoScoreThemePo> getHeatScore(@PathVariable Integer pageNumber) {
        PageHelper.startPage(pageNumber, 8);

        PageInfo<MangoScoreThemePo> pageInfo = new PageInfo<MangoScoreThemePo>(mangoScoreThemeService.getHeatScore());

        if (pageInfo.getPageNum() < pageNumber) {
            List list1 = new LinkedList();
            list1.add(200);
            return list1;
        }
        List<MangoScoreThemePo> allMessage = pageInfo.getList();
        return getItemsByThemem(allMessage, 3);
    }

    private List<MangoScoreThemePo> getItemsByThemem(List<MangoScoreThemePo> allMessage, int itemNum) {
        for (MangoScoreThemePo m: allMessage) {
            m.setList(mangoScoreItemService.getListByTid(m.getId(), itemNum));
        }
        return allMessage;
    }

    private List<MangoScoreThemePo> setItemMyScore(List<MangoScoreThemePo> allMessage, String userId) {
        for (MangoScoreThemePo m: allMessage) {
            List<MangoScoreItemPo> list = m.getList();
            for (MangoScoreItemPo i: list) {
                i.setMyScore(uiService.getScore(i.getId(), userId));
            }
        }
        return allMessage;
    }

    @PostMapping("/getTheme/{userId}/{id}")
    public R getItemByThemeId(@PathVariable String userId, @PathVariable String id) {
        List<MangoScoreThemePo> allMessage = mangoScoreThemeService.getAllScoreById(id);

        List<MangoScoreThemePo> list = getItemsByThemem(allMessage, -1);

        MangoUser user = userService.getById(allMessage.get(0).getCreateId());

        return R.ok().put("data", setItemMyScore(list, userId)).put("create", user);
    }

    @PostMapping("/getTheme/{name}")
    public List<MangoScoreThemePo> getItemByName(@PathVariable String name) {
        List<MangoScoreThemePo> allMessage = mangoScoreThemeService.getAllScoreByName(name);
        return getItemsByThemem(allMessage, 3);
    }

    @PostMapping("/getThemeByname/{name}/{pageNumber}")
    public List<MangoScoreThemePo> getThemeByname(@PathVariable String name, @PathVariable Integer pageNumber) {
        PageHelper.startPage(pageNumber, 8);

        PageInfo<MangoScoreThemePo> pageInfo = new PageInfo<MangoScoreThemePo>(mangoScoreThemeService.getAllScoreByName(name));

        if (pageInfo.getPageNum() < pageNumber) {
            List list1 = new LinkedList();
            list1.add(200);
            return list1;
        }
        List<MangoScoreThemePo> allMessage = pageInfo.getList();

        return getItemsByThemem(allMessage, 3);
    }

    @PostMapping("/getThemeByname/getAllThemeByUserId/{userId}/{keyword}/{pageNumber}")
    public List<MangoScoreThemePo> getThemeByname(@PathVariable Integer userId,@PathVariable String keyword, @PathVariable Integer pageNumber) {
        PageHelper.startPage(pageNumber, 5);
        PageInfo<MangoScoreThemePo> pageInfo = new PageInfo<MangoScoreThemePo>(mangoScoreThemeService.getAllThemeByUserId(userId, keyword));
        if (pageInfo.getPageNum() < pageNumber) {
            List list1 = new LinkedList();
            list1.add(200);
            return list1;
        }
        List<MangoScoreThemePo> allMessage = pageInfo.getList();
        return getItemsByThemem(allMessage, 3);

    }

    @PostMapping("/getTheme/getAllThemeByUserId/{userId}/{pageNumber}")
    public List<MangoScoreThemePo> getAllThemeByUserId(@PathVariable Integer userId, @PathVariable Integer pageNumber) {
        PageHelper.startPage(pageNumber, 5);
        PageInfo<MangoScoreThemePo> pageInfo = new PageInfo<MangoScoreThemePo>(mangoScoreThemeService.getAllThemeByUserId(userId));
        if (pageInfo.getPageNum() < pageNumber) {
            List list1 = new LinkedList();
            list1.add(200);
            return list1;
        }
        List<MangoScoreThemePo> allMessage = pageInfo.getList();
        return getItemsByThemem(allMessage, 3);

    }

    @PostMapping("/getTheme/getAllThemeByUiId/{userId}/{pageNumber}")
    public List<MangoScoreThemePo> getAllThemeByUiId(@PathVariable Integer userId, @PathVariable Integer pageNumber) {
        PageHelper.startPage(pageNumber, 5);
        PageInfo<MangoScoreThemePo> pageInfo = new PageInfo<MangoScoreThemePo>(mangoScoreThemeService.getAllThemeByUiId(userId));
        List<MangoScoreThemePo> allMessage = pageInfo.getList();
        if (pageInfo.getPageNum() < pageNumber || allMessage.size() < 1) {
            List list1 = new LinkedList();
            list1.add(200);
            return list1;
        }

        return getItemsByThemem(allMessage, 3);

    }

    /*
        创建
     */
    @PostMapping("/addTheme/{userId}")
    public R getItemByThemeId(@PathVariable String userId, @RequestBody MangoScoreThemePo mangoScoreThemePo) {

        Integer id = mangoScoreThemeService.addNew(userId, mangoScoreThemePo);
        if(id == -1){
            return R.error();
        }
        return R.ok(200).put("id", id);
    }

    @PostMapping("/addItems/{userId}/{id}")
    public R getItemByThemeId(@PathVariable String userId,@PathVariable String id, @RequestBody Vo mangoScoreItemPos) {

//        log.info(mangoScoreItemPos);
//        List<MangoScoreThemeVo> mangoScoreThemeVos = JsonUtils.jsonToList(mangoScoreItemPos, MangoScoreThemeVo.class);
        if(mangoScoreItemService.add(userId, id, mangoScoreItemPos.getMangoScoreItemPos())){
            return R.ok(200);
        };
        return R.error();
    }

    /*
        改
     */
    @PostMapping("/addItem/{userId}")
    public R getItemByThemeId(@PathVariable String userId, @RequestBody MangoScoreItemPo mangoScoreItemPo) {
        if(mangoScoreItemService.save(mangoScoreItemPo)){
            return R.ok(200);
        }
        return R.error("添加失败");
    }

    // 删除
    @Transactional
    @PostMapping("/deleteThemeById/{userId}/{themeId}")
    public IsDelete deleteThemeById(@PathVariable Integer userId, @PathVariable Integer themeId) {
        return mangoScoreThemeService.deleteById(userId, themeId);
    }

    @PostMapping("/deleteItems/{userId}/{id}")
    public R deleteItems(@PathVariable String userId,@PathVariable String id) {
//        log.info(mangoScoreItemPos);
//        List<MangoScoreThemeVo> mangoScoreThemeVos = JsonUtils.jsonToList(mangoScoreItemPos, MangoScoreThemeVo.class);
        if(mangoScoreItemService.delete(userId, id)){
            return R.ok(200);
        }
        return R.error("删除错误");
    }
    /*
        评分
     */
    @PostMapping("/PingFen/{userId}/{themeId}/{itemId}")
    @Transactional
    public R getItemByThemeId(@PathVariable String userId,@PathVariable String themeId,@PathVariable String itemId,@RequestBody String score) {
        if(mangoScoreThemeService.pingfeng(userId, themeId,itemId, score)){
            List<MangoScoreThemePo> allMessage = mangoScoreThemeService.getAllScoreById(themeId);
            List<MangoScoreThemePo> list = getItemsByThemem(allMessage, -1);
            return R.ok(200).put("data", setItemMyScore(list, userId));
        }
        return R.error("评分失败，请重新尝试");
    }


}
