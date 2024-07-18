

package work.liy.mango.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @Author LiY
 */

@Data
@AllArgsConstructor
public class userComment {

    private String Comment;

    private boolean isAnonymousReply;
}
