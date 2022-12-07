import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isAndroid, images, FONTS, COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import Loan from "../../KeyMobile/screens/loanNew/LoanMenu";
import HomeTabs from "./keyMobileTab";


import {
  SendMoney,
  SendSuccess,
  SendMoneyMenu,
  SendMoneyMultiple,
  MultipleTransfer,
  MultipleSummary,
  SendPhone,
  SendForeign,
  SendForeign2,
  SendKeyStone,
  SendOtherBank,
  SendOwnAccount,
} from "../../KeyMobile/screens/sendMoney";
import MicroLending from "../../KeyMobile/screens/loan/microLending/MicroLending";

import LoanDashboard from "../../KeyMobile/screens/loanNew/dashBoard/Dashboard";
import LoanOnBoarding from "../../KeyMobile/screens/loanNew/LoanOnBoarding";
import SalaryAdvance from "../../KeyMobile/screens/loan/salaryAdvanced/SalaryAdvanced";
import AssetFinancing from "../../KeyMobile/screens/loan/assetFinacing/AssetFinancing";
import RewardStack from "../../KeyMobile/screens/rewards/RewardStack";
////new loan

import {
  MicroLendingForm1,
  MicroLendingForm2,
} from "../../KeyMobile/screens/loanNew/microLending/MicroLending";
import {
  AssetForm1,
  AssetForm2,
  AssetForm3,
} from "../../KeyMobile/screens/loanNew/assetFinancing/AssetFinancing";
import {
  SalaryForm1,
  SalaryForm2,
  SalaryForm3,
} from "../../KeyMobile/screens/loanNew/salaryAdvanced/SalaryAdvanced";
import { Investments,LiquidateScreen } from "../../KeyMobile/screens/investments";
import {
  Feedback,
  Enquires,
  Complaints,
  DisputeManagement,
  Request,
  EnquiresMenu,
} from "../../KeyMobile/screens/enquires";
import {
  LimitCard,
  LimitPin,
  LimitToken,
  LimitIndemnity,
  LimitMenu,
  LimitIndemnity1,
  LimitIndemnity2,
  LimitIndemnity3,
} from "../../KeyMobile/screens/TransactionLimit";
import { ChangePassword, ChangePin } from "../../KeyMobile/screens/profile";
import { BillMenu, BillsPayment } from "../../KeyMobile/screens/bills";
import {
  AccountsMenu,
  SelfReactivateAccount,
  UpgradeAccount,
  UpdateAccountInfo,
  UpdatePhoneNetwork,
  AccountOfficers,
  LinkBVN,
} from "../../KeyMobile/screens/Accounts";
import SelfServiceMenu from "../../KeyMobile/screens/selfService/SelfMenu";
import MobileTopUp from "../../KeyMobile/screens/mobileTopUp/MobileTopUp";
import ComingSoon from "../../KeyMobile/screens/ComingSoon";
import { TransactionReceipts } from "../../KeyMobile/screens/Transactions";
import {
  NqrMenu,
  NqrScan,
  NqrMerchant,
  NqrCreatePayments,
  NqrPayment,
  NqrTab
} from "../../KeyMobile/screens/nqr";
import { FaqMenu } from "../../KeyMobile/screens/faq";
import { LocateUs } from "../../KeyMobile/screens/locateUs";
import ReactivateAccount from "../../KeyMobile/screens/ReactiveAccount";
import {
  Beneficiary,
  BeneficiaryMenu,
  BillBeneficiary,
  BeneficiaryMainPage
} from "../../KeyMobile/screens/beneficiary";
import Notification from "../../KeyMobile/screens/Notification";
import ResetPin from "../../KeyMobile/screens/pinManagement/ResetPin";
import PinMenu from "../../KeyMobile/screens/pinManagement/PinMenu";
import SmeMarketPlace from "../../KeyMobile/screens/SmeMarketPlace";
import ContactUs from "../../KeyMobile/screens/ContactUs";

import {
  CardServices,
  CardActivation,
  PinReset,
  ChangeLimits,
  CardRequest,
  CreditCardRequest,
  DebitCardRequest,
  CardReplacement,
  CardStatements,
  CardRepayments
} from "../../KeyMobile/screens/cardServices";
import Transactions from "../../KeyMobile/screens/Transactions/Transactions";
import MobileBankingLimit from "../../KeyMobile/screens/mobileBankLimit/MobileBankingLimit";
import EditBankingLimit from "../../KeyMobile/screens/mobileBankLimit/EditBankingLimit";
import {
  ChequeServicesMenu,
  ChequeBookRequest,
  ConfirmCheque,
  ChequeDeposit,
  StopCheque,
} from "../../KeyMobile/screens/ChequeServices";

import StandingInstructionsMenu from "../../KeyMobile/screens/standingInstructions/StandingInstructionsMenu";
import StandingInstructionItem from "../../KeyMobile/screens/standingInstructions/StandingInstructionItem";
import StandingInstructionTabMenu from "../../KeyMobile/screens/standingInstructions/StandingInstructionTabMenu";
import {
  VirtualCardHome,
  CreateVirtualCard,
  VirtualCardTabHome
} from "../../KeyMobile/screens/VirtualCards";
import {
  RewardsMenu,
  GiftScreen,
  MyRewardScreen,
  ReferFriendMenu,
  InviteFriend,
  MyGifts,
  GiftAFriend,
  RedeemPoints,
} from "../../KeyMobile/screens/rewards";
import CreateNewRequest from "../../KeyMobile/screens/standingInstructions/CreateNewRequest";
// import { StatementsMainpage } from "../../KeyMobile/screens/statementsAndReceipts";
import {
  RegistrationWelcome,
  RegistrationOTP,
  RegistrationCompleted,
  RegistrationCompleting,
} from "../../KeyMobile/screens/register";
import { AgencyBankingMenu, ENaira, AgencyWithdrawal ,
  AgencyTransfer,
  AgencyDeposit,
  BuyAirtime,
  AgencyPayBillsMenu,
  InternetServices,
  CableBills,
  UtilityBills,
  BettingBills,
  StatementsMainpage,
AccountOpening,
AgencyCommission,

} from "../../KeyMobile/screens/agencyBanking";
import AgencyStack from "../../KeyMobile/screens/agencyBanking/AgencyStack";
import ENairaMain from "../../KeyMobile/screens/ENaira/ENaira"
import AgencyBankingPin from "../../KeyMobile/screens/pinManagement/AgencyBankingPin";
import AgencyBankingPinUpload from "../../KeyMobile/screens/pinManagement/AgencyBankingPinUpload";
const Stack = createNativeStackNavigator();

const KeyMobileStack = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="AgencyHome"
      screenOptions={({ navigation }) => ({
        headerShown: false,
        animation: "slide_from_right",
        headerTitleStyle: {
          color: isAndroid ? "white" : COLORS.primaryBlue,
          fontFamily: FONTS.bold,
          marginTop: 7,
          fontSize: SIZES.responsiveHeight("2%"),
        },
        headerTitleAlign: "center",
        // headerBackground: () => {
        //   if (isAndroid) {
        //     return (
        //       <Image
        //         source={images.headerImg}
        //         style={{ width: "100%", height: "100%" }}
        //       />
        //     );
        //   }
        // },
        headerLeft: () => (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" , height: 35}}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={isAndroid ? COLORS.white : COLORS.primaryBlue}
            />
            <Text
              style={{ color: isAndroid ? COLORS.white : COLORS.primaryBlue }}
            >
              Back
            </Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="AgencyHome"
        // component={HomeTabs}
        component={AgencyBankingMenu}
        options={{ headerShown: false, headerBackground: null }}
      />
      <Stack.Screen
        name="SendMoneyScreen"
        component={SendMoney}
        options={{ title: "Send Money" }}
      />
      <Stack.Screen
        name="SendPhoneScreen"
        component={SendPhone}
        options={{ title: "Send to Phone" }}
      />
      <Stack.Screen
        name="SendFxScreen"
        component={SendForeign}
        options={{ title: "Send to Fx" }}
      />

      <Stack.Screen
        name="SendFxScreen2"
        component={SendForeign2}
        options={{ title: "Send to Fx" }}
      />
      <Stack.Screen
        name="SendMoneySuccess"
        component={SendSuccess}
        options={{ title: "Send Money" }}
      />
        <Stack.Screen
        name="SendOtherBank"
        component={SendOtherBank}
        options={{ title: "Send Money" }}
      />
      
           <Stack.Screen
        name="SendOwnAccount"
        component={SendOwnAccount}
        options={{ title: "Send Money" }}
      />
               <Stack.Screen
        name="SendKeystone"
        component={SendKeyStone}
        options={{ title: "Send Money" }}
      />
      <Stack.Screen
        name="SendMoneyMenu"
        component={SendMoneyMenu}
        options={{ title: "Send Money" }}
      />
      <Stack.Screen
        name="SendMoneyMultiple"
        component={SendMoneyMultiple}
        options={{ title: "Multiple Transfer" }}
      />
      <Stack.Screen
        name="MultipleTransfer"
        component={MultipleTransfer}
        options={{ title: "Multiple Transfer" }}
      />

      <Stack.Screen
        name="MultipleSummary"
        component={MultipleSummary}
        options={{ title: "Multiple Transfer" }}
      />

      <Stack.Screen
        name="MobileTopUpScreen"
        component={MobileTopUp}
        options={{ title: "Top up" }}
      />
      <Stack.Screen
        name="LoanScreen"
        component={Loan}
        options={{ title: "Loans" }}
      />
      <Stack.Screen
        name="MicroLending"
        component={MicroLending}
        options={{ title: "Micro Lending" }}
      />

      <Stack.Screen
        name="LoanDashBoard"
        component={LoanDashboard}
        options={{ title: "Loan Dashboard" }}
      />
      <Stack.Screen
        name="SalaryAdvance"
        component={SalaryAdvance}
        options={{ title: "Salary Advanced" }}
      />
      <Stack.Screen
        name="AssetFinancing"
        component={AssetFinancing}
        options={{ title: "Asset Financing" }}
      />

      <Stack.Screen
        name="MicroLendingForm1"
        component={MicroLendingForm1}
        options={{ title: "Micro Lending" }}
      />
      <Stack.Screen
        name="MicroLendingForm2"
        component={MicroLendingForm2}
        options={{ title: "Micro Lending" }}
      />

      <Stack.Screen
        name="SalaryForm1"
        component={SalaryForm1}
        options={{ title: "Salary Advanced" }}
      />
      <Stack.Screen
        name="SalaryForm2"
        component={SalaryForm2}
        options={{ title: "Salary Advanced" }}
      />
      <Stack.Screen
        name="SalaryForm3"
        component={SalaryForm3}
        options={{ title: "Salary Advanced" }}
      />
      <Stack.Screen
        name="AssetForm1"
        component={AssetForm1}
        options={{ title: "Asset Financing" }}
      />
      <Stack.Screen
        name="AssetForm2"
        component={AssetForm2}
        options={{ title: "Asset Financing" }}
      />
      <Stack.Screen
        name="AssetForm3"
        component={AssetForm3}
        options={{ title: "Asset Financing" }}
      />
      <Stack.Screen name="sendMoneyScreen" component={SendMoney} />
      <Stack.Screen name="loanDashBoard" component={LoanDashboard} />

      <Stack.Screen
        name="loanOnBoard"
        component={LoanOnBoarding}
        options={{ title: "Loans" }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={Feedback}
        options={{ title: "FeedBack" }}
      />
      <Stack.Screen
        name="ComplaintsScreen"
        component={Complaints}
        options={{ title: "Complaints" }}
      />
      <Stack.Screen
        name="EnquiresMenu"
        component={EnquiresMenu}
        options={{ title: "Enquiries" }}
      />
      <Stack.Screen
        name="EnquiresScreen"
        component={Enquires}
        options={{ title: "Enquiries" }}
      />
      <Stack.Screen
        name="DisputeManagementScreen"
        component={DisputeManagement}
        options={{ title: "Dispute Management" }}
      />
      <Stack.Screen
        name="RequestScreen"
        component={Request}
        options={{ title: "Request" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: "Change Passsword" }}
      />
      <Stack.Screen
        name="ChangePin"
        component={ChangePin}
        options={{ title: "Change Pin" }}
      />
      <Stack.Screen
        name="ComingSoon"
        component={ComingSoon}
        options={{ title: "Coming Soon" }}
      />
      <Stack.Screen
        name="TLimitPin"
        component={LimitPin}
        options={{ title: "Change Limit" }}
      />
      <Stack.Screen
        name="TLimitCard"
        component={LimitCard}
        options={{ title: "Change Limit" }}
      />
      <Stack.Screen
        name="TLimitToken"
        component={LimitToken}
        options={{ title: "Change Limit" }}
      />
      <Stack.Screen
        name="TLimitIndemnity"
        component={LimitIndemnity}
        options={{ title: "Change Limit" }}
      />
      <Stack.Screen
        name="TLimitIndemnity1"
        component={LimitIndemnity1}
        options={{ title: "Terms and Condition" }}
      />
      <Stack.Screen
        name="TLimitIndemnity2"
        component={LimitIndemnity2}
        options={{ title: "Limit with Indemnity" }}
      />
      <Stack.Screen
        name="TLimitIndemnity3"
        component={LimitIndemnity3}
        options={{ title: "Limit with Indemnity" }}
      />
      <Stack.Screen
        name="TLimitMenu"
        component={LimitMenu}
        options={{ title: "Banking Limit" }}
      />
      <Stack.Screen
        name="BillMenu"
        component={BillMenu}
        options={{ title: "Bills Payment" }}
      />
      <Stack.Screen
        name="BillPayment"
        component={BillsPayment}
        options={{ title: "Bills Payment" }}
      />
      <Stack.Screen
        name="SelfService"
        component={SelfServiceMenu}
        options={{ title: "Self Service" }}
      />
      <Stack.Screen
        name="Accounts"
        component={AccountsMenu}
        options={{ title: "Accounts" }}
      />
      <Stack.Screen
        name="SelfReactivateAccount"
        component={SelfReactivateAccount}
        options={{ title: "Reactivate Account" }}
      />

      <Stack.Screen
        name="UpgradeAccount"
        component={UpgradeAccount}
        options={{ title: "Upgrade Account" }}
      />
      <Stack.Screen
        name="UpdateAccountInfo"
        component={UpdateAccountInfo}
        options={{ title: "Update Account Information" }}
      />
      <Stack.Screen
        name="UpdatePhoneNetwork"
        component={UpdatePhoneNetwork}
        options={{ title: "Update Phone Network" }}
      />
      <Stack.Screen
        name="AccountOfficers"
        component={AccountOfficers}
        options={{ title: "Account Officers" }}
      />
      <Stack.Screen
        name="LinkBVN"
        component={LinkBVN}
        options={{ title: "Link BVN" }}
      />

      <Stack.Screen
        name="TransactionReceipts"
        component={TransactionReceipts}
        options={{ title: "Receipts" }}
      />
      {/* <Stack.Screen
        name="NqrMenu"
        component={NqrMenu}
        options={{ title: "NQR Payments" }}
      />
      <Stack.Screen
        name="NqrScan"
        component={NqrScan}
        options={{ title: "Scan Nqr" }}
      />
      <Stack.Screen
        name="NqrMerchant"
        component={NqrMerchant}
        options={{ title: "Create NQR Merchant" }}
      />
      <Stack.Screen
        name="NqrCreatePayments"
        component={NqrCreatePayments}
        options={{ title: "NQR Payments" }}
      />
      <Stack.Screen
        name="NqrPayment"
        component={NqrPayment}
        options={{ title: "NQR Payment" }}
      />
      <Stack.Screen
        name="NqrTab"
        component={NqrTab}
        options={{ title: "NQR Payment" }}
      /> */}
      <Stack.Screen
        name="FaqMenu"
        component={FaqMenu}
        options={{ title: "FAQ" }}
      />
      <Stack.Screen
        name="LocateUs"
        component={LocateUs}
        options={{ title: "Locate us" }}
      />
      <Stack.Screen
        name="ReactivateAccount"
        component={ReactivateAccount}
        options={{ title: "Reactivate Account" }}
      />
      <Stack.Screen
        name="Beneficary"
        component={Beneficiary}
        options={{ title: "Beneficiary" }}
      />
      <Stack.Screen
        name="BillBeneficary"
        component={BillBeneficiary}
        options={{ title: "Airtime Beneficiary" }}
      />
      <Stack.Screen
        name="BeneficaryMenu"
        component={BeneficiaryMenu}
        options={{ title: "Beneficiary" }}
      />
      <Stack.Screen
        name="BeneficiaryMainPage"
        component={BeneficiaryMainPage}
        options={{ title: "Beneficiaries" }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ title: "Notification" }}
      />
      <Stack.Screen
        name="PinMenu"
        component={PinMenu}
        options={{ title: "Pin Menu" }}
      />
      <Stack.Screen
        name="PinReset"
        component={PinReset}
        options={{ title: "Pin Reset" }}
      />

      <Stack.Screen
        name="ResetPin"
        component={ResetPin}
        options={{ title: "Pin Reset" }}
      />
      <Stack.Screen
        name="SmeMarketPlace"
        component={SmeMarketPlace}
        options={{ title: "Sme market place" }}
      />

      <Stack.Screen
        name="CardServices"
        component={CardServices}
        options={{ title: "Card Services" }}
      />
      <Stack.Screen
        name="CardActivation"
        component={CardActivation}
        options={{ title: "Card Activation" }}
      />
      <Stack.Screen
        name="ChangeLimits"
        component={ChangeLimits}
        options={{ title: "Change Limits" }}
      />
      <Stack.Screen
        name="CardRequest"
        component={CardRequest}
        options={{ title: "Card Request" }}
      />
      <Stack.Screen
        name="CreditCardRequest"
        component={CreditCardRequest}
        options={{ title: "Credit Card Request" }}
      />
      <Stack.Screen
        name="DebitCardRequest"
        component={DebitCardRequest}
        options={{ title: "Card Request" }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{ title: "Transactions" }}
      />
      <Stack.Screen
        name="CardReplacement"
        component={CardReplacement}
        options={{ title: "Card Replacement" }}
      />
      <Stack.Screen
        name="CardStatements"
        component={CardStatements}
        options={{ title: "Statement" }}
      />
      <Stack.Screen
        name="CardRepayments"
        component={CardRepayments}
        options={{ title: "Card Repayments" }}
      />
      <Stack.Screen
        name="MobileBankingLimit"
        component={MobileBankingLimit}
        options={{ title: "Mobile Banking Limit" }}
      />

      <Stack.Screen
        name="Rewards/Referrals"
        component={RewardsMenu}
        options={{ title: "Rewards/Referrals" }}
      />

      <Stack.Screen
        name="MyRewardScreen"
        component={MyRewardScreen}
        options={{ title: "Rewards/Referrals" }}
      />
      <Stack.Screen
        name="ReferFriendMenu"
        component={ReferFriendMenu}
        options={{ title: "Invite Friends" }}
      />
      <Stack.Screen
        name="InviteFriend"
        component={InviteFriend}
        options={{ title: "Invite Friends" }}
      />
      <Stack.Screen
        name="MyGifts"
        component={MyGifts}
        options={{ title: "My Gifts" }}
      />
      <Stack.Screen
        name="GiftAFriend"
        component={GiftAFriend}
        options={{ title: "Gift Friend" }}
      />
      <Stack.Screen
        name="RedeemPoints"
        component={RedeemPoints}
        options={{ title: "Redeem Points" }}
      />
      <Stack.Screen
        name="EditBankingLimit"
        component={EditBankingLimit}
        options={{ title: "Mobile Banking Limit" }}
      />
      <Stack.Screen
        name="ChequeServicesMenu"
        component={ChequeServicesMenu}
        options={{ title: "Cheque Services" }}
      />
      <Stack.Screen
        name="ChequeBookRequest"
        component={ChequeBookRequest}
        options={{ title: "Cheque Book Request" }}
      />
      <Stack.Screen
        name="ConfirmCheque"
        component={ConfirmCheque}
        options={{ title: "Confirm Cheque" }}
      />
      <Stack.Screen
        name="ChequeDeposit"
        component={ChequeDeposit}
        options={{ title: "Cheque Deposit" }}
      />
      <Stack.Screen
        name="StopCheque"
        component={StopCheque}
        options={{ title: "Stop Cheque" }}
      />

      <Stack.Screen
        name="CreateNewRequest"
        component={CreateNewRequest}
        options={{ title: "Standing Instruction" }}
      />
      <Stack.Screen
        name="VirtualCardHome"
        component={VirtualCardHome}
        options={{ title: "Virtual Card" }}
      />
      <Stack.Screen
        name="CreateVirtualCard"
        component={CreateVirtualCard}
        options={{ title: "Create Virtual Card" }}
      />
      <Stack.Screen
        name="VirtualCardTabHome"
        component={VirtualCardTabHome}
        options={{ title: "Virtual Card" }}
      />
      <Stack.Screen
        name="Investments"
        component={Investments}
        options={{ title: "Investments" }}
      />
      <Stack.Screen
        name="LiquidateScreen"
        component={LiquidateScreen}
        options={{ title: "Fixed Deposit" }}
      />

      <Stack.Screen
        name="StandingInstructionItem"
        component={StandingInstructionItem}
        options={{ title: "Standing Instruction" }}
      />
      <Stack.Screen
        name="StandingInstructionTabMenu"
        component={StandingInstructionTabMenu}
        options={{ title: "Standing Instruction" }}
      />

      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ title: "Contact us" }}
      />

      <Stack.Screen
        name="StandingInstructionsMenu"
        component={StandingInstructionsMenu}
        options={{ title: "Standing Instruction" }}
      />
      {/* <Stack.Screen
        name="StatementsMainpage"
        component={StatementsMainpage}
        options={{ title: "Statements & Receipts" }}
      /> */}

      <Stack.Screen
        name="RegistrationWelcome"
        component={RegistrationWelcome}
        options={{ title: "Register" }}
      />

      <Stack.Screen
        name="RegistrationOTP"
        component={RegistrationOTP}
        options={{ title: "Register" }}
      />

      <Stack.Screen
        name="RegistrationCompleted"
        component={RegistrationCompleted}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="RegistrationCompleting"
        component={RegistrationCompleting}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="RewardStack"
        component={RewardStack}
        options={{
          title: "Register",
          headerShown: false,
          headerBackground: null,
        }}
      />
      <Stack.Screen
        name="AgencyBankingMenu"
        component={AgencyBankingMenu}
        options={{ title: "Agency Banking" }}
      />
        {/* <Stack.Screen
        name="ENaira"
        component={ENaira}
        options={{ title: "E naira" }}
      /> */}
      <Stack.Screen
        name="AgencyStack"
        component={AgencyStack}
        options={{ headerShown: false, headerBackground: null }}
      />
      {/* <Stack.Screen
        name="ENairaMain"
        component={ENairaMain}
        options={{ title: "e-Naira" }}
      /> */}


      {/* agency banking */}
  <Stack.Screen
        name="AgencyBankingPin"
        component={AgencyBankingPin}
        options={{ title: "Agency Banking Pin" }}
      />

<Stack.Screen
        name="AgencyBankingPinUpload"
        component={AgencyBankingPinUpload}
        options={{ title: "Agency Banking Pin" }}
      />

<Stack.Screen
            name="AgencyWithdrawal"
            component={AgencyWithdrawal}
            options={{title:"Withdrawal"}}
        />
             <Stack.Screen
            name="AgencyTransfer"
            component={AgencyTransfer}
            options={{title:"Transfers"}}
        />
        <Stack.Screen
            name="AgencyDeposit"
            component={AgencyDeposit}
            options={{title:"Deposit"}}
        />
        <Stack.Screen
            name="BuyAirtime"
            component={BuyAirtime}
            options={{title:"Airtime & Data"}}
        />
        <Stack.Screen
            name="AgencyPayBillsMenu"
            component={AgencyPayBillsMenu}
            options={{title:"Pay Bills"}}
        />
        <Stack.Screen
            name="InternetServices"
            component={InternetServices}
            options={{title:"Internet Services"}}
        />
        <Stack.Screen
            name="CableBills"
            component={CableBills}
            options={{title:"Cable"}}
        />
        <Stack.Screen
            name="UtilityBills"
            component={UtilityBills}
            options={{title:"Utility Bills"}}
        />
        <Stack.Screen
            name="BettingBills"
            component={BettingBills}
            options={{title:"BettingBills"}}
        />
        <Stack.Screen
            name="NqrMenu"
            component={NqrTab}
            options={{title:"NQR Payments"}}
        />
        <Stack.Screen
            name="NqrMerchant"
            component={NqrMerchant}
            options={{title:"NQR Payments"}}
        />
        <Stack.Screen
            name="NqrCreatePayments"
            component={NqrCreatePayments}
            options={{title:"NQR Payments"}}
        />
        <Stack.Screen
            name="NqrPayment"
            component={NqrPayment}
            options={{title:"NQR Payments"}}
        />
        <Stack.Screen
            name="AccountOpening"
            component={AccountOpening}
            options={{title:"Account Opening"}}
        />
        <Stack.Screen
            name="ENaira"
            component={ENaira}
            options={{title:"e-Naira"}}
        />
        <Stack.Screen
            name="StatementsMainpage"
            component={StatementsMainpage}
            options={{title:"Statement & Receipts"}}
        />
        <Stack.Screen
            name="AgencyCommission"
            component={AgencyCommission}
            options={{title:"Commissions"}}
        />
    </Stack.Navigator>
  );
};

export default KeyMobileStack;
