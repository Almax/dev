package com.marryguard_v2;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.imagepicker.ImagePickerPackage;
import me.jhen.react.BadgePackage;
import io.neson.react.notification.NotificationPackage;
import com.remobile.splashscreen.*;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import fr.bamlab.rncameraroll.CameraRollPackage;
import com.rnfs.RNFSPackage;
public class MainActivity extends ReactActivity {  
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
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ImagePickerPackage(),
            new BadgePackage(),
            new NotificationPackage(this),
            new RCTSplashScreenPackage(this),
            new ReactNativeContacts(),
            new CameraRollPackage(),
            new RNFSPackage()
           // new CodePush("POZhzesI9QquOX7zCnsv1aI_pXODEktE6aK2g", this, BuildConfig.DEBUG)
        );
    }
}
