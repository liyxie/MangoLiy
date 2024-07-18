package work.liy.mango.util;

import lombok.Getter;

/**
 * @Author LiY
 */

@Getter
public enum CheckType {

    img(2),
    music(1),
    text(0),
    other(3),
    video(4);


    CheckType(Integer code){
        this.code = code;
    }

    private final Integer code;
}
