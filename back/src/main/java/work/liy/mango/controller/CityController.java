

package work.liy.mango.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.liy.mango.util.R;

/**
 * @Author LiY
 */

@RestController
@RequestMapping("/city")
@Slf4j
public class CityController {

    @GetMapping("/getCityDataByChineseName/{}")
    public R getCityDataByChineseName(){

        return R.ok();
    }

}
