package com.beyondv1.app.utils;

import static kotlin.random.RandomKt.Random;

public class Constants {
    public static final int KEY_EXCHANGE_REQUEST_CODE = 111;
    public static final int  PURCHASE_REQUEST = 112;
    public static final int  PARAMETER_REQUEST = 113;
    public static final int  TRANSACTION_REQUEST = 114;
    public static final String KEY_EXCHANGE_INTENT = "com.globalaccelerex.keyexchange";
    public static final String PARAMETER_INTENT = "com.globalaccelerex.utility";
    public static final String TRANSACTION_INTENT = "com.globalaccelerex.transaction";
    public static final String TRANSACTION_TYPE_PURCHASE = "PURCHASE";
    public static final String TRANSACTION_TYPE_BALANCE = "BALANCE";
    public static final String PREFS_STRING_DOWNLOADED_PARAMS = "prefs_string_downloaded_params";

//    public String generateRandomRrn (int length)  {
//        int random = Random();
//        String digits = "";
//        digits += (random.nextInt(9) + 1).toString();
//        for (i in 1 until length) {
//            digits += (random.nextInt(10) + 0).toString()
//        }
//        return digits
//    }
}

