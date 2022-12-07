package com.beyondv1.app.data.model;

public class TransactionModelEntity {
    private String amount;
    private String print;
    private String transType;
    private String transactionReference;

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getPrint() {
        return print;
    }

    public String getTransType() {
        return transType;
    }

    public void setTransType(String transType) {
        this.transType = transType;
    }

    public String getTransactionReference() {
        return transactionReference;
    }

    public void setTransactionReference(String transRef) {
        this.transactionReference = transRef;
    }
}
