package com.wisdomproject;

import android.app.Application;
import android.os.Handler;

import com.facebook.react.ReactApplication;
import com.pilloxa.backgroundjob.BackgroundJobPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.horcrux.svg.SvgPackage;
import org.reactnative.camera.RNCameraPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;


import com.umeng.commonsdk.UMConfigure;
import com.umeng.message.PushAgent;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.MsgConstant;
import com.umeng.message.common.UmLog;


import java.util.Arrays;
import java.util.List;

import com.wisdomproject.invokenative.DplusReactPackage;
import com.wisdomproject.invokenative.RNUMConfigure;
import com.wisdomproject.invokenative.PushModule;

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
          new MainReactPackage(),
            new BackgroundJobPackage(),
            new RNSoundPackage(),
            new SvgPackage(),
            new RNCameraPackage(),
            new SplashScreenReactPackage(),
            new BaiduMapPackage(),
            new VectorIconsPackage(),
              new DplusReactPackage(),
            new RNGestureHandlerPackage()
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
    RNUMConfigure.init(this, "5da53b804ca357ec27000f78", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,
            "5890b80a2e59907385aeebbd80aeaea7");
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
