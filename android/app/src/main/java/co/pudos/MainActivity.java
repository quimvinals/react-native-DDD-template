package com.pudos;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.provider.Settings;
import android.view.OrientationEventListener;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Pudos";
    }

    private static final int PORTRAIT = 0;
    private static final int REVERSE_PORTRAIT = 180;
    private static final int OFFSET = 45;
    private static final int UNKNOWN = -1;

    //  account for 0 = 360 (eg. -1 = 359)
    private static final int PORTRAIT_START = PORTRAIT - OFFSET + 360;
    private static final int PORTRAIT_END = PORTRAIT + OFFSET;
    private static final int REVERSE_PORTRAIT_START = REVERSE_PORTRAIT - OFFSET;
    private static final int REVERSE_PORTRAIT_END = REVERSE_PORTRAIT + OFFSET;

    enum CurrentOrientation {
        PORTRAIT, REVERSE_PORTRAIT
    }

    private OrientationEventListener mOrientationListener;
    private CurrentOrientation mCurrentOrientation;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        // BEGIN react-native-splash-screen
        SplashScreen.show(this);
        // END react-native-splash-screen
        
        /* Don't restore the state to avoid views from Gnav (Fragments) being restored when the activity
         is killed by the system due to memory constraints*/
        super.onCreate(null);

        mOrientationListener = new OrientationEventListener(this) {
            @Override
            public void onOrientationChanged(int orientation) {
                orientationChanged(orientation);
            }
        };
    }

    @Override
    protected void onResume() {
        super.onResume();
        mOrientationListener.enable();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mOrientationListener.disable();
    }

    private void orientationChanged(int degrees) {
        if (degrees != UNKNOWN) {
            if (degrees >= PORTRAIT_START || degrees <= PORTRAIT_END || !isAutomaticRotationEnabled()) {
                if (mCurrentOrientation != CurrentOrientation.PORTRAIT) {
                    mCurrentOrientation = CurrentOrientation.PORTRAIT;
                    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                }
            } else if (degrees >= REVERSE_PORTRAIT_START && degrees <= REVERSE_PORTRAIT_END) {
                if (mCurrentOrientation != CurrentOrientation.REVERSE_PORTRAIT) {
                    mCurrentOrientation = CurrentOrientation.REVERSE_PORTRAIT;
                    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT);
                }
            }
        }
    }

    private boolean isAutomaticRotationEnabled() {
        return android.provider.Settings.System.getInt(getContentResolver(),
                Settings.System.ACCELEROMETER_ROTATION, 0) == 1;
    }
}