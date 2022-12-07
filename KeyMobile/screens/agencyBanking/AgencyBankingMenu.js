  import {StyleSheet, Text,ScrollView,View ,BackHandler, StatusBar} from "react-native";
import { COLORS } from "../../../constants";
import React, { useEffect, useState } from "react";

//redux
import { useSelector } from "react-redux";

//components
import { AccountCard } from "../../../components";
import MenuThreeRows from "../../components/MenuThreeRows";
import { 
    ShareReceiptImageIcon,
    WithdrawalIcon,
    TransferIcon, 
    DepositSecondIcon,
    SelfServiceIcon,
    HomeHomeIcon,
    ScanIcon,
    GamingBillsIcon,
    ENairaIcon,
    PhoneVibrateIcon,
    CommissionIcon,
    PaperNoteIcon,
    HistoryIcon } from "../../../constants/icons";


const AgencyBankingMenu=({navigation})=>{
    const [visible, setVisible] = useState(false);

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          handleBackButton
        );
    
        return () => backHandler.remove();
      }, []);
    
      const handleBackButton = React.useCallback(() => {
        if (navigation.isFocused()) {
          setVisible(true);
          return true;
        }
      }, []);

    return(
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            {/* <AccountCard data={customerDetails.accounts} hideCard /> */}
            <View>
            <MenuThreeRows
                firstIcon={<WithdrawalIcon />}
                secondIcon={<TransferIcon />}
                thirdIcon={<DepositSecondIcon />}
                firstText={{ line1: "Withdrawal" }}
                secondText={{line1:"Transfer"}}
                thirdText={{ line1: "Deposit" }}
                onPress1={() => navigation.navigate('AgencyWithdrawal')}
                onPress2={() => navigation.navigate('AgencyTransfer')}
                onPress3={() => navigation.navigate('AgencyDeposit')}
            />
            <MenuThreeRows
                firstIcon={<PhoneVibrateIcon/>}
                secondIcon={<HomeHomeIcon />}
                thirdIcon={<ScanIcon />}
                firstText={{ line1: "Buy Airtime"}}
                secondText={{line1:"Bills Payment"}}
                thirdText={{ line1: "NQR" }}
                onPress1={() => navigation.navigate('BuyAirtime')}
                onPress2={() => navigation.navigate('AgencyPayBillsMenu')}
                onPress3={() => navigation.navigate('NqrMenu')}
            />
            <MenuThreeRows
                firstIcon={<SelfServiceIcon />}
                secondIcon={<GamingBillsIcon />}
                thirdIcon={<ENairaIcon/>}
                firstText={{ line1: "Self Service" }}
                secondText={{line1:'Betting & Lottery'}}
                thirdText={{ line1: "eNaira" }}
                onPress1={() => null}
                onPress2={() => navigation.navigate('BettingBills')}
                onPress3={() => navigation.navigate('ENaira')}
            />
            <MenuThreeRows
                firstIcon={<PaperNoteIcon />}
                secondIcon={<CommissionIcon />}
                thirdIcon={<HistoryIcon color={[COLORS.primaryBlue]}/>}
                firstText={{ line1: "Open Account" }}
                secondText={{line1:'My Commission'}}
                thirdText={{ line1: "Transaction" }}
                onPress1={() => navigation.navigate('AccountOpening')}
                onPress2={() => navigation.navigate('AgencyCommission')}
                onPress3={() => navigation.navigate('StatementsMainpage')}
            />
            </View>
        </ScrollView>
    )
}

export default AgencyBankingMenu;

const styles= StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        backgroundColor: COLORS.white,
        paddingVertical:15
    }
})
