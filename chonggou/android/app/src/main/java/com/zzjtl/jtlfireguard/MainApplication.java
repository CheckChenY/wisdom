package com.zzjtl.jtlfireguard;

import android.app.Application;
import android.os.Handler;

import com.imagepicker.ImagePickerPackage;
import com.github.yamill.orientation.OrientationPackage;  // <--- import
import com.ocetnik.timer.BackgroundTimerPackage;
import com.facebook.react.ReactApplication;
import community.revteltech.nfc.NfcManagerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.umeng.commonsdk.UMConfigure;
import com.umeng.message.PushAgent;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.MsgConstant;
import com.umeng.message.common.UmLog;

import org.lovebing.reactnative.baidumap.BaiduMapPackage;


import java.util.Arrays;
import java.util.List;

import com.zmxv.RNSound.RNSoundPackage;
import com.zzjtl.jtlfireguard.invokenative.DplusReactPackage;
import com.zzjtl.jtlfireguard.invokenative.RNUMConfigure;
import com.zzjtl.jtlfireguard.invokenative.PushModule;

import org.reactnative.camera.RNCameraPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.perrystreetsoftware.RNRtmpViewPackage;

public class MainApplication extends Application implements ReactApplication {

  private static final String TAG = MainApplication.class.getName();
  private Handler handler;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new BaiduMapPackage(),
          new ImagePickerPackage(),
          new MainReactPackage(),
          new NfcManagerPackage(),
          new RNGestureHandlerPackage(),
          new VectorIconsPackage(),
          new DplusReactPackage(),
          new RNCameraPackage(),
          new SplashScreenReactPackage(),
          new RNSoundPackage(),
          new RNRtmpViewPackage(),
          new BackgroundTimerPackage(),
          new OrientationPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    UMConfigure.setLogEnabled(true);
    //初始化组件化基础库, 统计SDK/推送SDK/分享SDK都必须调用此初始化接口
    RNUMConfigure.init(this, "5cb53f590cafb2bfc10000d3", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,
            "6317832623dc4674761459cdea5d7b18");
    initUpush();
  }
  private void initUpush() {

    PushAgent mPushAgent = PushAgent.getInstance(this);
    handler = new Handler(getMainLooper());

    //sdk开启通知声音
    mPushAgent.setNotificationPlaySound(MsgConstant.NOTIFICATION_PLAY_SDK_ENABLE);

    //注册推送服务 每次调用register都会回调该接口
    mPushAgent.register(new IUmengRegisterCallback() {
      @Override
      public void onSuccess(String deviceToken) {
        UmLog.i(TAG, "device token: " + deviceToken);
        PushModule.setDeviceToken(deviceToken);
      }

      @Override
      public void onFailure(String s, String s1) {
        UmLog.i(TAG, "register failed: " + s + " " + s1);
      }
    });
  }
}
