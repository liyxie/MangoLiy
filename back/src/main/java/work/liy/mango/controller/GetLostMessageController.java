package work.liy.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import work.liy.mango.model.MangoMessage;
import work.liy.mango.model.MangoMessageImages;
import work.liy.mango.service.MangoMessageDetailService;
import work.liy.mango.service.MangoMessageImagesService;

import java.util.List;

@RestController
public class GetLostMessageController {

    @Autowired
    private MangoMessageDetailService mangoMessageDetailService;

    @Autowired
    MangoMessageImagesService mangoMessageImagesService;

    /*
        获取最新失物招领
     */
    @PostMapping("/getMessage/getLostMessage")
    public MangoMessage getLostMessage(){
        MangoMessage mangoMessage = mangoMessageDetailService.getLostMessage();
        MangoMessageImages mangoMessageImages = new MangoMessageImages();
        mangoMessageImages.setMessageId(mangoMessage.getMessageId());
        List<MangoMessageImages> imgList = mangoMessageImagesService.findList(mangoMessageImages);
        mangoMessage.setMessageImages(imgList);
        return mangoMessage;

    }
}
