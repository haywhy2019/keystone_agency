package com.beyondv1.app;

import static com.beyondv1.app.utils.Constants.KEY_EXCHANGE_REQUEST_CODE;
import static com.beyondv1.app.utils.Constants.PARAMETER_REQUEST;
import static com.beyondv1.app.utils.Constants.PREFS_STRING_DOWNLOADED_PARAMS;
import static com.beyondv1.app.utils.Constants.TRANSACTION_REQUEST;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.widget.Toast;

import com.beyondv1.app.data.model.ParameterModelEntity;
import com.beyondv1.app.data.model.TransactionResponseEntity;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.google.gson.Gson;
import com.pixplicity.easyprefs.library.Prefs;

import expo.modules.ReactActivityDelegateWrapper;
import timber.log.Timber;

public class MainActivity extends ReactActivity {
    private Gson gson = new Gson();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Set the theme to AppTheme BEFORE onCreate to support
        // coloring the background, status bar, and navigation bar.
        // This is required for expo-splash-screen.
        setTheme(R.style.AppTheme);
        super.onCreate(null);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
     * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
     * (Paper).
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
                new MainActivityDelegate(this, getMainComponentName())
        );
    }

    /**
     * Align the back button behavior with Android S
     * where moving root activities to background instead of finishing activities.
     *
     * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
     */
    @Override
    public void invokeDefaultOnBackPressed() {
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
            if (!moveTaskToBack(false)) {
                // For non-root activities, use the default implementation to finish them.
                super.invokeDefaultOnBackPressed();
            }
            return;
        }

        // Use the default back button implementation on Android S
        // because it's doing more than {@link Activity#moveTaskToBack} in fact.
        super.invokeDefaultOnBackPressed();
    }

    public static class MainActivityDelegate extends ReactActivityDelegate {
        public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
            super(activity, mainComponentName);
        }

        @Override
        protected ReactRootView createRootView() {
            ReactRootView reactRootView = new ReactRootView(getContext());
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
            return reactRootView;
        }

        @Override
        protected boolean isConcurrentRootEnabled() {
            // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
            // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
            return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        getKeyExchangeResult(requestCode, resultCode, data);
        getParameterResult(requestCode, resultCode, data);
        getTransactionResult(requestCode, resultCode, data);
    }

    private void getKeyExchangeResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == KEY_EXCHANGE_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                String status = data.getStringExtra("status");
                if (status.equals("00")) {
                    Toast.makeText(this, "key exchange done successfully", Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(this, "key exchange error", Toast.LENGTH_LONG).show();
                }
            }
        }
    }

    private void getParameterResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == PARAMETER_REQUEST && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                String status = data.getStringExtra("status");
                String returnedData = data.getStringExtra("data");
                ParameterModelEntity parameter = gson.fromJson(returnedData, ParameterModelEntity.class);
                Prefs.putString(PREFS_STRING_DOWNLOADED_PARAMS, returnedData);
                if (status.equals("00")) {
                    Timber.d("DOWLOADED_PARAMETER===>%s", gson.toJson(parameter));
//          Toast.makeText(this,"parameter download done done successfully", Toast.LENGTH_LONG).show();
                    Toast.makeText(this, gson.toJson(parameter), Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(this, "parameter download error", Toast.LENGTH_LONG).show();
                }
            }
        }
    }
    private void getTransactionResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == TRANSACTION_REQUEST && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                String status = data.getStringExtra("status");
                String returnedData = data.getStringExtra("data");

                TransactionResponseEntity transactionResponse = gson.fromJson(returnedData, TransactionResponseEntity.class);
                Prefs.putString(PREFS_STRING_DOWNLOADED_PARAMS, returnedData);
                if (status.equals("00")) {
                    Timber.d("DOWLOADED_Transactions===>%s", gson.toJson(transactionResponse));
//          Toast.makeText(this,"parameter download done done successfully", Toast.LENGTH_LONG).show();
                    Toast.makeText(this, transactionResponse.toString(), Toast.LENGTH_LONG).show();
                } else {
                    Timber.d("ERROR Transactions===>%s", gson.toJson(transactionResponse));
                    Toast.makeText(this, "transaction error", Toast.LENGTH_LONG).show();
                }
            }
        }
    }
}
