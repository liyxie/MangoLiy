

package work.liy.mango.util.City;

/**
 * @Author LiY
 */
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.read.builder.ExcelReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class CityCodeUtil {

    @Value("${excel.file.cityPath}")
    private static String EXCEL_FILE_PATH;

    // 获取所有城市数据
    public static List<CityData> getAllCityData() {
        ExcelReaderBuilder readerBuilder = EasyExcel.read(EXCEL_FILE_PATH, CityData.class, new ExcelDataListener());
        readerBuilder.sheet().doRead();
        return ExcelDataListener.getDataList();
    }

    // 根据中文名获取城市数据
    public static CityData getCityDataByChineseName(String chineseName) {
        List<CityData> cityDataList = getAllCityData();
        for (CityData cityData : cityDataList) {
            if (cityData.getChineseName().equals(chineseName)) {
                return cityData;
            }
        }
        return null; // 如果找不到对应的数据，则返回null
    }

    // 根据adcode获取城市数据
    public static CityData getCityDataByAdcode(String adcode) {
        List<CityData> cityDataList = getAllCityData();
        for (CityData cityData : cityDataList) {
            if (cityData.getAdcode().equals(adcode)) {
                return cityData;
            }
        }
        return null; // 如果找不到对应的数据，则返回null
    }

    public static void main(String[] args) {
        // 示例用法
        CityData cityDataByChineseName = getCityDataByChineseName("北京市");
        if (cityDataByChineseName != null) {
            System.out.println("根据中文名获取的城市数据：" + cityDataByChineseName);
        } else {
            System.out.println("找不到对应的城市数据！");
        }

        CityData cityDataByAdcode = getCityDataByAdcode("110000");
        if (cityDataByAdcode != null) {
            System.out.println("根据adcode获取的城市数据：" + cityDataByAdcode);
        } else {
            System.out.println("找不到对应的城市数据！");
        }
    }
}
