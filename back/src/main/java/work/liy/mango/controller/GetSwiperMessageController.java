package work.liy.mango.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import work.liy.mango.model.MangoSwiper;
import work.liy.mango.service.MangoSwiperService;
import work.liy.mango.util.uploadFileByTencentCOS.TencentCOSUtils;

import java.util.List;

@RestController
public class GetSwiperMessageController {

    //主页轮播图图片存储路径
    @Value("${img.headImg}")
    private String shopImg;
    //主页轮播图图片访问路径
    @Value("${img.headHttpImg}")
    private String shopHttpImg;
    @Autowired
    private MangoSwiperService mangoSwiperService;
    @Autowired
    private TencentCOSUtils tencentCOSUtils;

    /*
        获取轮播图
     */
    @PostMapping("/getMessage/getAllSwiperMessage")
    public List<MangoSwiper> getAllSwiperMessage() {

        return mangoSwiperService.findAll();
    }

    @PostMapping("/getMessage/getAllSwiperMessageShu")
    public int getAllSwiperMessageShu() {

        return mangoSwiperService.count();
    }
    @PostMapping("/updateSwiperMessage")
    public int updateSwiperMessage(@RequestParam("file") MultipartFile file,int id) throws Exception {
        MangoSwiper mangoSwiper  = new MangoSwiper();
        mangoSwiper.setSwiperId(id);
        //上传图片代码
        if (file.isEmpty()) {
            return 401; //空资源
        }
//        long maxSize = 5 * 1024 * 1024; // 5MB的字节数
//        System.out.println(file.getSize());
//        if (file.getSize() > maxSize) {
//            return 402; // 文件大小超过1MB的错误代码
//        }
//        String UPLOAD_DIR = shopImg;
//        String originalFilename = file.getOriginalFilename();
//        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
//        File dest = new File(UPLOAD_DIR + "/" + System.currentTimeMillis() + extension);
//        file.transferTo(dest);
//        mangoSwiper.setSwiperImageUrl(shopHttpImg + dest.getName());

        String url = tencentCOSUtils.upload(file, tencentCOSUtils.getHeadImg());
        mangoSwiper.setSwiperImageUrl(url);
        mangoSwiperService.update(mangoSwiper);
        return 200;
    }

    @PostMapping("/newSwiperMessage")
    public int newSwiperMessage(@RequestParam("file") MultipartFile file) throws Exception {
        MangoSwiper mangoSwiper  = new MangoSwiper();
        //上传图片代码
        if (file.isEmpty()) {
            return 401; //空资源
        }

        String url = tencentCOSUtils.upload(file, tencentCOSUtils.getHeadImg());
        mangoSwiper.setSwiperImageUrl(url);
        mangoSwiperService.save(mangoSwiper);
        return 200;
    }


    // 删除
    @PostMapping("/deleteSwiperMessage")
    public int deleteSwiperMessage(int id){
        if(mangoSwiperService.deleteBySId(id)){
            return 200;
        }
        return 500;
    }

    /**
     * @description: 修改链接
     * @author: liy
     * @param:
     * @return:
     **/
    @PostMapping("/newSwiperUrl/{id}")
    public int newSwiperUrl(@PathVariable int id, @RequestBody String url){

        return mangoSwiperService.upUrl(id,url);
    }

}
