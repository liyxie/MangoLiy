package work.liy.mango.otherMethod;

import com.qcloud.cos.COSClient;

public class DeleteAliyunFile {

   // public Boolean DeleteAliyunFile(String filePath, OSSClient ossClient, String bucketName) {
    public Boolean DeleteAliyunFile(String filePath, COSClient cosClient, String bucketName) {
       try {

            // 删除文件。
           // ossClient.deleteObject(bucketName, filePath);
            cosClient.deleteObject(bucketName, filePath);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
