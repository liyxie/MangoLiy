package work.liy.mango.util.uploadFileByTencentCOS;

/**
 * @Author LiY
 */
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.exception.CosServiceException;
import com.qcloud.cos.http.HttpProtocol;
import com.qcloud.cos.model.DeleteObjectRequest;
import com.qcloud.cos.model.ObjectMetadata;
import com.qcloud.cos.model.PutObjectResult;
import com.qcloud.cos.region.Region;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.util.UUID;



//交给IOC容器管理
@Component
@Data
@ConfigurationProperties(prefix = "img")
public class TencentCOSUtils {

    @Autowired
    private TencentCOSproperties tencentCOSproperties;

    private String common;
    private String avatar;
    private String avatarHttpImg;
    private String headImg;
    private String headHttpImg;
    private String chatImg;
    private String chatHttp;
    private String shopImg;
    private String shopHttpImg;

    public String upload(MultipartFile file, String path) throws Exception {
        //获取客户端
        // 1 初始化用户身份信息（secretId, secretKey）。
        COSCredentials cred = new BasicCOSCredentials
                (tencentCOSproperties.getSecretId(), tencentCOSproperties.getSecretKey());
        // 2 设置存储桶的地域（上文获得）
        Region region = new Region(tencentCOSproperties.getBucketAddr());
        ClientConfig clientConfig = new ClientConfig(region);
        // 3 使用https协议传输
        clientConfig.setHttpProtocol(HttpProtocol.https);
        // 4 生成 cos 客户端。
        COSClient cosClient = new COSClient(cred, clientConfig);


        // 获取上传的文件的输入流
        InputStream inputStream = file.getInputStream();
        // 避免文件覆盖，获取文件的原始名称，如123.jpg,然后通过截取获得文件的后缀，也就是文件的类型
        String originalFilename = file.getOriginalFilename();
        // 获取文件的类型
        String fileType = originalFilename.substring(originalFilename.lastIndexOf("."));
        // 使用UUID工具  创建唯一名称，放置文件重名被覆盖，在拼接上上命令获取的文件类型
        String fileName = UUID.randomUUID().toString() + fileType;
        // 指定文件上传到 COS 上的路径，即对象键。最终文件会传到存储桶名字中的images文件夹下的fileName名字

        String key = path + fileName;
        // 创建上传Object的Metadata
        ObjectMetadata objectMetadata = new ObjectMetadata();
        // - 使用输入流存储，需要设置请求长度
        objectMetadata.setContentLength(inputStream.available());
        // - 设置缓存
        objectMetadata.setCacheControl("no-cache");
        // - 设置Content-Type
        objectMetadata.setContentType(fileType);
        //上传文件
        PutObjectResult putResult = cosClient.putObject
                (tencentCOSproperties.getBucketName(), key, inputStream, objectMetadata);
        // 创建文件的网络访问路径
        String url = tencentCOSproperties.getRootSrc() + "/" + key;
        //关闭 cosClient，并释放 HTTP 连接的后台管理线程
        cosClient.shutdown();
        return url;
    }

    public String upload(MultipartFile file) throws Exception {
        //获取客户端
        // 1 初始化用户身份信息（secretId, secretKey）。
        COSCredentials cred = new BasicCOSCredentials
                (tencentCOSproperties.getSecretId(), tencentCOSproperties.getSecretKey());
        // 2 设置存储桶的地域（上文获得）
        Region region = new Region(tencentCOSproperties.getBucketAddr());
        ClientConfig clientConfig = new ClientConfig(region);
        // 3 使用https协议传输
        clientConfig.setHttpProtocol(HttpProtocol.https);
        // 4 生成 cos 客户端。
        COSClient cosClient = new COSClient(cred, clientConfig);


        // 获取上传的文件的输入流
        InputStream inputStream = file.getInputStream();
        // 避免文件覆盖，获取文件的原始名称，如123.jpg,然后通过截取获得文件的后缀，也就是文件的类型
        String originalFilename = file.getOriginalFilename();
        // 获取文件的类型
        String fileType = originalFilename.substring(originalFilename.lastIndexOf("."));
        // 使用UUID工具  创建唯一名称，放置文件重名被覆盖，在拼接上上命令获取的文件类型
        String fileName = UUID.randomUUID().toString() + fileType;
        // 指定文件上传到 COS 上的路径，即对象键。最终文件会传到存储桶名字中的images文件夹下的fileName名字

        String key = common + fileName;
        // 创建上传Object的Metadata
        ObjectMetadata objectMetadata = new ObjectMetadata();
        // - 使用输入流存储，需要设置请求长度
        objectMetadata.setContentLength(inputStream.available());
        // - 设置缓存
        objectMetadata.setCacheControl("no-cache");
        // - 设置Content-Type
        objectMetadata.setContentType(fileType);
        //上传文件
        PutObjectResult putResult = cosClient.putObject
                (tencentCOSproperties.getBucketName(), key, inputStream, objectMetadata);
        // 创建文件的网络访问路径
        String url = tencentCOSproperties.getRootSrc() + "/" + key;
        //关闭 cosClient，并释放 HTTP 连接的后台管理线程
        cosClient.shutdown();
        return url;
    }

    public void deleteFile(String filePath) {
        // 初始化用户身份信息（secretId, secretKey）。
        COSCredentials cred = new BasicCOSCredentials
                (tencentCOSproperties.getSecretId(), tencentCOSproperties.getSecretKey());
        // 设置存储桶的地域
        Region region = new Region(tencentCOSproperties.getBucketAddr());
        ClientConfig clientConfig = new ClientConfig(region);
        // 使用https协议传输
        clientConfig.setHttpProtocol(HttpProtocol.https);
        // 生成 COS 客户端。
        COSClient cosClient = new COSClient(cred, clientConfig);

        try {
            // 构造删除请求
            DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(
                    tencentCOSproperties.getBucketName(), filePath);

            // 发送删除请求
            cosClient.deleteObject(deleteObjectRequest);

            System.out.println("Deleted object: " + filePath);
        } catch (CosServiceException e) {
            e.printStackTrace();
        } finally {
            // 关闭 COS 客户端
            cosClient.shutdown();
        }
    }
}

