package com.nba.wxapi;

import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;
/**
 * Created by：Cral-Gates on 2017/12/24 20:33
 * EMail：zhangxia2013105@gmail.com
 * Date: 2017/12/24
 * Description:
 */
public class WXEntryActivity extends Activity{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}
