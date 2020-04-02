/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "BaiduMapViewManager.h"

#import "RNUMConfigure.h"
#import <UMPush/UMessage.h>
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                   moduleName:@"jtlFireGuard"
                   initialProperties:nil];
  self.bridge = bridge;
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [BaiduMapViewManager initSDK:@"g508m4Db1w8mQG7uZG2ZqCOBsLKsGA9f"];
  [UMConfigure setLogEnabled:YES];
  
  // Push's basic settingz 推送开始
  [RNUMConfigure initWithAppkey:@"5cb53fab570df36e6b0011ae" channel:@"App Store"];
  UMessageRegisterEntity * entity = [[UMessageRegisterEntity alloc] init];
  //type是对推送的几个参数的选择，可以选择一个或者多个。默认是三个全部打开，即：声音，弹窗，角标
  entity.types = UMessageAuthorizationOptionBadge|UMessageAuthorizationOptionAlert;
  [UNUserNotificationCenter currentNotificationCenter].delegate=self;
  
  [UMessage registerForRemoteNotificationsWithLaunchOptions:launchOptions Entity:entity completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
    } else {
    }
  }];
  // push end 推送结束
  
  [RNSplashScreen show];
  return YES;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window
{
  return UIInterfaceOrientationMaskPortrait;
}            

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

#pragma mark - Push  推送开始


- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
  //关闭友盟自带的弹出框
  [UMessage setAutoAlert:NO];
  [UMessage didReceiveRemoteNotification:userInfo];
  
  //    self.userInfo = userInfo;
  //    //定制自定的的弹出框
  //    if([UIApplication sharedApplication].applicationState == UIApplicationStateActive)
  //    {
  //        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"标题"
  //                                                            message:@"Test On ApplicationStateActive"
  //                                                           delegate:self
  //                                                  cancelButtonTitle:@"确定"
  //                                                  otherButtonTitles:nil];
  //
  //        [alertView show];
  //
  //    }
}

//iOS10新增：处理前台收到通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
  NSDictionary * userInfo = notification.request.content.userInfo;
  [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
          method:@"emit"
          args:@[@"DidReceiveMessage", userInfo]
             completion:nil];
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    
    //应用处于前台时的远程推送接受
    //关闭友盟自带的弹出框
    [UMessage setAutoAlert:NO];
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];
    
  }else{
    //应用处于前台时的本地推送接受
  }
  completionHandler(UNNotificationPresentationOptionSound|UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionAlert);
}

//iOS10新增：处理后台点击通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler{
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  [self.bridge enqueueJSCall:@"RCTDeviceEventEmitter"
                      method:@"emit"
                        args:@[@"DidOpenMessage", userInfo]
                  completion:nil];
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    
    //应用处于后台时的远程推送接受
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];
    
  }else{
    //应用处于后台时的本地推送接受
  }
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  [UMessage registerDeviceToken:deviceToken];
  
  NSLog(@"didRegisterForRemoteNotificationsWithDeviceToken success");
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  [defaults setObject:deviceToken forKey:@"deviceToken"];
  
  NSLog(@"didRegisterForRemoteNotificationsWithDeviceToken%@",[[[[deviceToken description] stringByReplacingOccurrencesOfString: @"<" withString: @""]
      stringByReplacingOccurrencesOfString: @">" withString: @""]
      stringByReplacingOccurrencesOfString: @" " withString: @""]);
  
}

// 推送结束

@end
