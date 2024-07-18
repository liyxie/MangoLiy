package work.liy.mango.model;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("mango_swiper")
@Data
public class MangoSwiper {
    @TableId("swiper_id")
    private Integer swiperId;
    @TableField("`swiper_image_url`")
    private String swiperImageUrl;

    private String url;

    /**
     * @return swiper_id
     */
    public Integer getSwiperId() {
        return swiperId;
    }

    /**
     * @param swiperId
     */
    public void setSwiperId(Integer swiperId) {
        this.swiperId = swiperId;
    }

    /**
     * @return swiper_image_url
     */
    public String getSwiperImageUrl() {
        return swiperImageUrl;
    }

    /**
     * @param swiperImageUrl
     */
    public void setSwiperImageUrl(String swiperImageUrl) {
        this.swiperImageUrl = swiperImageUrl;
    }
}