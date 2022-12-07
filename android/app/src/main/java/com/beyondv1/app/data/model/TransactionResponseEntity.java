package com.beyondv1.app.data.model;

public class TransactionResponseEntity{
	private String bankName;
	private String merchantName;
	private String statuscode;
	private String datetime;
	private String appLabel;
	private String merchantId;
	private String ptsp;
	private String cashBackAmount;
	private String currency;
	private String amount;
	private String maskedPan;
	private String cardHolderName;
	private String terminalID;
	private String bankLogo;
	private String message;
	private String nuban;
	private String rrn;
	private String deviceSerialNumber;
	private String authcode;
	private String transactionType;
	private String pinType;
	private String baseAppVersion;
	private String merchantCategoryCode;
	private String cardExpireDate;
	private String stan;
	private String merchantAddress;
	private String ptspContact;
	private String footerMessage;
	private String aid;

	public void setBankName(String bankName){
		this.bankName = bankName;
	}

	public String getBankName(){
		return bankName;
	}

	public void setMerchantName(String merchantName){
		this.merchantName = merchantName;
	}

	public String getMerchantName(){
		return merchantName;
	}

	public void setStatuscode(String statuscode){
		this.statuscode = statuscode;
	}

	public String getStatuscode(){
		return statuscode;
	}

	public void setDatetime(String datetime){
		this.datetime = datetime;
	}

	public String getDatetime(){
		return datetime;
	}

	public void setAppLabel(String appLabel){
		this.appLabel = appLabel;
	}

	public String getAppLabel(){
		return appLabel;
	}

	public void setMerchantId(String merchantId){
		this.merchantId = merchantId;
	}

	public String getMerchantId(){
		return merchantId;
	}

	public void setPtsp(String ptsp){
		this.ptsp = ptsp;
	}

	public String getPtsp(){
		return ptsp;
	}

	public void setCashBackAmount(String cashBackAmount){
		this.cashBackAmount = cashBackAmount;
	}

	public String getCashBackAmount(){
		return cashBackAmount;
	}

	public void setCurrency(String currency){
		this.currency = currency;
	}

	public String getCurrency(){
		return currency;
	}

	public void setAmount(String amount){
		this.amount = amount;
	}

	public String getAmount(){
		return amount;
	}

	public void setMaskedPan(String maskedPan){
		this.maskedPan = maskedPan;
	}

	public String getMaskedPan(){
		return maskedPan;
	}

	public void setCardHolderName(String cardHolderName){
		this.cardHolderName = cardHolderName;
	}

	public String getCardHolderName(){
		return cardHolderName;
	}

	public void setTerminalID(String terminalID){
		this.terminalID = terminalID;
	}

	public String getTerminalID(){
		return terminalID;
	}

	public void setBankLogo(String bankLogo){
		this.bankLogo = bankLogo;
	}

	public String getBankLogo(){
		return bankLogo;
	}

	public void setMessage(String message){
		this.message = message;
	}

	public String getMessage(){
		return message;
	}

	public void setNuban(String nuban){
		this.nuban = nuban;
	}

	public String getNuban(){
		return nuban;
	}

	public void setRrn(String rrn){
		this.rrn = rrn;
	}

	public String getRrn(){
		return rrn;
	}

	public void setDeviceSerialNumber(String deviceSerialNumber){
		this.deviceSerialNumber = deviceSerialNumber;
	}

	public String getDeviceSerialNumber(){
		return deviceSerialNumber;
	}

	public void setAuthcode(String authcode){
		this.authcode = authcode;
	}

	public String getAuthcode(){
		return authcode;
	}

	public void setTransactionType(String transactionType){
		this.transactionType = transactionType;
	}

	public String getTransactionType(){
		return transactionType;
	}

	public void setPinType(String pinType){
		this.pinType = pinType;
	}

	public String getPinType(){
		return pinType;
	}

	public void setBaseAppVersion(String baseAppVersion){
		this.baseAppVersion = baseAppVersion;
	}

	public String getBaseAppVersion(){
		return baseAppVersion;
	}

	public void setMerchantCategoryCode(String merchantCategoryCode){
		this.merchantCategoryCode = merchantCategoryCode;
	}

	public String getMerchantCategoryCode(){
		return merchantCategoryCode;
	}

	public void setCardExpireDate(String cardExpireDate){
		this.cardExpireDate = cardExpireDate;
	}

	public String getCardExpireDate(){
		return cardExpireDate;
	}

	public void setStan(String stan){
		this.stan = stan;
	}

	public String getStan(){
		return stan;
	}

	public void setMerchantAddress(String merchantAddress){
		this.merchantAddress = merchantAddress;
	}

	public String getMerchantAddress(){
		return merchantAddress;
	}

	public void setPtspContact(String ptspContact){
		this.ptspContact = ptspContact;
	}

	public String getPtspContact(){
		return ptspContact;
	}

	public void setFooterMessage(String footerMessage){
		this.footerMessage = footerMessage;
	}

	public String getFooterMessage(){
		return footerMessage;
	}

	public void setAid(String aid){
		this.aid = aid;
	}

	public String getAid(){
		return aid;
	}

	@Override
 	public String toString(){
		return 
			"TransactionResponseEntity{" + 
			"bankName = '" + bankName + '\'' + 
			",merchantName = '" + merchantName + '\'' + 
			",statuscode = '" + statuscode + '\'' + 
			",datetime = '" + datetime + '\'' + 
			",appLabel = '" + appLabel + '\'' + 
			",merchantId = '" + merchantId + '\'' + 
			",ptsp = '" + ptsp + '\'' + 
			",cashBackAmount = '" + cashBackAmount + '\'' + 
			",currency = '" + currency + '\'' + 
			",amount = '" + amount + '\'' + 
			",maskedPan = '" + maskedPan + '\'' + 
			",cardHolderName = '" + cardHolderName + '\'' + 
			",terminalID = '" + terminalID + '\'' + 
			",bankLogo = '" + bankLogo + '\'' + 
			",message = '" + message + '\'' + 
			",nuban = '" + nuban + '\'' + 
			",rrn = '" + rrn + '\'' + 
			",deviceSerialNumber = '" + deviceSerialNumber + '\'' + 
			",authcode = '" + authcode + '\'' + 
			",transactionType = '" + transactionType + '\'' + 
			",pinType = '" + pinType + '\'' + 
			",baseAppVersion = '" + baseAppVersion + '\'' + 
			",merchantCategoryCode = '" + merchantCategoryCode + '\'' + 
			",cardExpireDate = '" + cardExpireDate + '\'' + 
			",stan = '" + stan + '\'' + 
			",merchantAddress = '" + merchantAddress + '\'' + 
			",ptspContact = '" + ptspContact + '\'' + 
			",footerMessage = '" + footerMessage + '\'' + 
			",aid = '" + aid + '\'' + 
			"}";
		}
}
