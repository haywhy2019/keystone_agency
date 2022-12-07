package com.beyondv1.app.data.model;

public class ParameterModelEntity{
	private String bankName;
	private String bankLogo;
	private String serialNumber;
	private String pTSP;
	private String merchantAddress;
	private String merchantID;
	private String merchantName;
	private String baseAppVersion;
	private String billerID;
	private String footerMessage;
	private String terminalID;
	private String merchantCategoryCode;
	private String currency;

	public String getBankName(){
		return bankName;
	}

	public String getBankLogo(){
		return bankLogo;
	}

	public String getSerialNumber(){
		return serialNumber;
	}

	public String getPTSP(){
		return pTSP;
	}

	public String getMerchantAddress(){
		return merchantAddress;
	}

	public String getMerchantID(){
		return merchantID;
	}

	public String getMerchantName(){
		return merchantName;
	}

	public String getBaseAppVersion(){
		return baseAppVersion;
	}

	public String getBillerID(){
		return billerID;
	}

	public String getFooterMessage(){
		return footerMessage;
	}

	public String getTerminalID(){
		return terminalID;
	}

	public String getMerchantCategoryCode(){
		return merchantCategoryCode;
	}

	public String getCurrency(){
		return currency;
	}
}
