

package work.liy.mango.util;

import lombok.Getter;

/**
 * @Author LiY
 * 检测结果
 */

@Getter
public enum Label {

    normal(100, "正常"),
    advertising(10001 ,"广告"),
    CurrentAffairs(20001, "时政"),
    Pornography(20002, "色情"),
    Abuse(20003,"辱骂"),
    IllegalCrime(20006, "违法犯罪"),
    fraud(20008,"欺诈"),
    Vulgar(20012,"低俗"),
    Copyright(20013,"版权"),
    others(21000 , "未知原因");

    private final Integer code; //代码
    private final String mag; //描述

    Label(Integer code, String mag){
        this.code = code;
        this.mag = mag;
    }

}
