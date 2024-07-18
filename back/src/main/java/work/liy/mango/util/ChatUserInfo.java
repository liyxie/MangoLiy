

package work.liy.mango.util;

import work.liy.mango.model.MangoUser;

public class ChatUserInfo {
    private MangoUser mangoUser;
    private int isNoRead;

    public MangoUser getMangoUser() {
        return mangoUser;
    }

    public void setMangoUser(MangoUser mangoUser) {
        this.mangoUser = mangoUser;
    }

    public int getIsNoRead() {
        return isNoRead;
    }

    public void setIsNoRead(int isNoRead) {
        this.isNoRead = isNoRead;
    }
}
