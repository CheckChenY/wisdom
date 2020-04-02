package com.zzjtl.jtlfireguard;

import com.facebook.react.ReactActivity;

import android.os.Bundle;


import com.umeng.analytics.MobclickAgent;
import com.umeng.message.PushAgent;
import com.zzjtl.jtlfireguard.invokenative.ShareModule;
import com.zzjtl.jtlfireguard.invokenative.PushModule;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        ShareModule.initSocialSDK(this);
        PushModule.initPushSDK(this);
        MobclickAgent.setSessionContinueMillis(1000);
        PushAgent.getInstance(this).onAppStart();PushAgent.getInstance(this).onAppStart();
    }

    @Override
    public void onResume() {
        super.onResume();
        android.util.Log.e("xxxxxx","onResume=");
        MobclickAgent.onResume(this);
    }
    @Override
    protected void onPause() {
        super.onPause();
        android.util.Log.e("xxxxxx","onPause=");

        MobclickAgent.onPause(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        //MobclickAgent.onKillProcess(this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "jtlFireGuard";
    }
}
