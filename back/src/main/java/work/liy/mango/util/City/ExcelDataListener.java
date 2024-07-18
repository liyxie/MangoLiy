
package work.liy.mango.util.City;

/**
 * @Author LiY
 */
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;

import java.util.ArrayList;
import java.util.List;

public class ExcelDataListener extends AnalysisEventListener<CityData> {

    private static List<CityData> dataList = new ArrayList<>();

    // 每读取一行数据，都会调用一次该方法
    @Override
    public void invoke(CityData data, AnalysisContext context) {
        dataList.add(data);
    }

    // 读取完成后调用该方法
    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        // 可以在这里进行一些后续处理操作，如果不需要可以留空
    }

    // 获取读取到的数据列表
    public static List<CityData> getDataList() {
        return dataList;
    }
}

