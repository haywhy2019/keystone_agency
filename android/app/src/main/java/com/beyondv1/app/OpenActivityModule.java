package com.beyondv1.app;

import static com.beyondv1.app.utils.Constants.KEY_EXCHANGE_INTENT;
import static com.beyondv1.app.utils.Constants.KEY_EXCHANGE_REQUEST_CODE;
import static com.beyondv1.app.utils.Constants.PARAMETER_INTENT;
import static com.beyondv1.app.utils.Constants.PARAMETER_REQUEST;
import static com.beyondv1.app.utils.Constants.PURCHASE_REQUEST;
import static com.beyondv1.app.utils.Constants.TRANSACTION_INTENT;
import static com.beyondv1.app.utils.Constants.TRANSACTION_REQUEST;
import static com.beyondv1.app.utils.Constants.TRANSACTION_TYPE_PURCHASE;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.beyondv1.app.data.model.TransactionModelEntity;
import com.beyondv1.app.utils.Constants;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import java.util.Objects;


public class OpenActivityModule extends ReactContextBaseJavaModule {
    public OpenActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "OpenActivity";
    }

    @ReactMethod
    public void open() {
        Intent intent = new Intent(getCurrentActivity(), MainActivity2.class);
        getCurrentActivity().startActivity(intent);
    }

    @ReactMethod
    public void doKeyExchange() {
        Intent keyExchangeIntent = new Intent(KEY_EXCHANGE_INTENT);
        Objects.requireNonNull(getCurrentActivity()).startActivityForResult(keyExchangeIntent, KEY_EXCHANGE_REQUEST_CODE);
    }

    @ReactMethod
    public void doGetParameters() {
        String jsonString = "{  \"action\":\"PARAMETER\"  }";
        Intent parameterIntent = new Intent(PARAMETER_INTENT);
        parameterIntent.putExtra("requestData", jsonString);
        Objects.requireNonNull(getCurrentActivity()).startActivityForResult(parameterIntent, PARAMETER_REQUEST);
    }

    @ReactMethod
    public void doCardTransaction(String amount) {
        String jsonString = "{ \"transType\": \"PURCHASE\", \"amount\":\"$amount\", \"print\":\"false\" }";
        Intent transactionIntent = new Intent(TRANSACTION_INTENT);
        TransactionModelEntity transactionPayload = new TransactionModelEntity();
        transactionPayload.setAmount(amount);
        transactionPayload.setTransType(TRANSACTION_TYPE_PURCHASE);
        transactionPayload.setTransactionReference("123456789012");
       transactionIntent.putExtra("requestData", new Gson().toJson(transactionPayload));
        Objects.requireNonNull(getCurrentActivity()).startActivityForResult(transactionIntent, TRANSACTION_REQUEST);

    };


}
