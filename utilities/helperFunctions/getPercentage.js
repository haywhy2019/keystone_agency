export const spentAmountPercent = (limit, spent) => {
  if(limit == 0) return "0%"
  const ratio = (spent / limit) * 100
  return `${ratio}%`
}

   {/* <DropDownInput
              // label="Bank name"
              data={bankList}
              labelField="BankName"
              valueField="BankCode"
              search
              placeholder={bankName ? bankName : "Select bank"}
              placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
              value={bankName}
              onChange={(item) => {
                setBankName(item.BankName);
                setBankDetails(item);
              }}
              getInputRef={amountRef}
              error={errors.bankName}
            /> */}