package com.marryguard_v2;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.imagepicker.ImagePickerPackage;
import com.microsoft.codepush.react.CodePush;
import me.jhen.react.BadgePackage;
import io.neson.react.notification.NotificationPackage;
import com.remobile.splashscreen.*;

public class MainActivity extends ReactActivity {
    private CodePush _codePush;

    // the CodePush runtime determine where to get the JS
    // bundle location from on each app start
    @Override
    protected String getJSBundleFile() {
        return this._codePush.getBundleUrl("index.android.bundle");
    }    
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MarryGuard_v2";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        this._codePush = new CodePush("POZhzesI9QquOX7zCnsv1aI_pXODEktE6aK2g", this, BuildConfig.DEBUG);
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ImagePickerPackage(),
            new BadgePackage(),
            new NotificationPackage(this),
            new RCTSplashScreenPackage(this),
            this._codePush.getReactPackage()
        );
    }
}
