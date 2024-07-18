package work.liy.mango.util.common;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import work.liy.mango.model.MangoMessage;
import work.liy.mango.model.MangoMessageImages;
import work.liy.mango.model.score.MangoScoreItemPo;
import work.liy.mango.model.score.MangoScoreThemePo;
import work.liy.mango.service.MangoMessageDetailService;
import work.liy.mango.service.MangoScoreItemServiceImpl;
import work.liy.mango.service.MangoScoreThemeServiceImpl;
import work.liy.mango.util.uploadFileByTencentCOS.TencentCOSUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @Author LiY
 */

@Component
public class ImgDelete {

    private static String[] biao = {"mango_message","mango_score_theme", "mango_score_item"};

    @Autowired
    private MangoMessageDetailService messageDetailService;
    @Autowired
    private MangoScoreThemeServiceImpl mangoScoreThemeService;
    @Autowired
    private MangoScoreItemServiceImpl scoreItemService;
    @Autowired
    private TencentCOSUtils tencentCOSUtils;

    public List<MangoMessage> findMM(){
        return messageDetailService.findListIdDel();
    }

    public List<MangoScoreThemePo> findMS(){
        return mangoScoreThemeService.list(new LambdaQueryWrapper<MangoScoreThemePo>().eq(MangoScoreThemePo::getIsDel,1));
    }

    public List<MangoScoreItemPo> findMSI(){
        return scoreItemService.list(new LambdaQueryWrapper<MangoScoreItemPo>().eq(MangoScoreItemPo::getIsDel, 1));
    }

    public void deleteImg(List<String> url){
        for (String s : url) {
            tencentCOSUtils.deleteFile(s);
        }
    }

    public void deleteImg(){
        deleteImg(findMM()
                .stream().map(MangoMessage::getMessageImages).collect(Collectors.toList()).get(0)
                .stream().map(MangoMessageImages::getImageUrl).collect(Collectors.toList())
        );
        deleteImg(findMS().stream().map(MangoScoreThemePo::getImgUrl).collect(Collectors.toList()));
        deleteImg((findMSI().stream().map(MangoScoreItemPo::getImgUrl)).collect(Collectors.toList()));
    }

    @Scheduled(cron = "0 0 0 * * ?") // 每天凌晨执行
    public void scheduledImgDeletion() {
        deleteImg();
    }


}
