package work.liy.mango.util.uploadFileByTencentCOS;

/**
 * @Author LiY
 */

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "tencent.cos")
public class TencentCOSproperties {
    private String rootSrc ; // https://tence**********349516.cos.ap-nanjing.myqcloud.com
    private String bucketAddr; // ap-nanjing
    private String SecretId; // AKIDqa9Bz**********KAk5A0oNfiV
    private String SecretKey; // eZLr89**********IXaP0MVRBnESUN
    private String bucketName; // tencen**********8349516

}
