package com.nba;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.remobile.toast.RCTToastPackage;
import com.theweflex.react.WeChatPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import cn.reactnative.modules.update.UpdateContext;
import cn.reactnative.modules.update.UpdatePackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new OrientationPackage(),
                    new UpdatePackage(),
                    new RCTToastPackage(),
                    new WeChatPackage(),
                    new SplashScreenReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected String getJSBundleFile() {
            return UpdateContext.getBundleUrl(MainApplication.this);
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
    }
}
