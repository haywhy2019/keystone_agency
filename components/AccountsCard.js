import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Modal,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { COLORS, SIZES, images, FONTS, GLOBAL_STYLE } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { getItem, setItem } from "../utilities/helperFunctions/asyncStorage";
import {  defaultAccount } from "../utilities/redux/keyMobile/slice/selectAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import {getAccountBalanceAction} from "../utilities/redux/keyMobile/actions/accountBalanceAction"
import {thousandOperator} from "../utilities/helperFunctions/thousandOperator"
import { TouchableOpacity } from "react-native-gesture-handler";
import getUserHook from "../utilities/hooks/getUserHook"
import { AccountCardMasterCardIcon, AccountCardVerveCardIcon , AccountCardVisaCardIcon} from "../constants/icons";
import uuid from "react-native-uuid";
import { showBalance } from "../utilities/redux/keyMobile/slice/showBalanceSlice";


const AccountCard = ({hideCard,noPadding }) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.auth.user.accounts)
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const displayAccount = data[selected];
  const [user] = getUserHook()
  const { customerid } = useSelector(
    (state) => state.auth.user
  );

  const showAccountBalance = useSelector(state => state.showBalance.showBalance)
  const accountDetails = useSelector(state => state.selectedAccount.accountDetails)
  const accountCard = useSelector(state => state.selectedAccount.accountDetails.cardtype)


  const id = uuid.v4();
  const payload = {
    requestId: id,
    customerid,
    source: "mobile",
    "username": user
  }
  
  const selectHandler = (index) => {
    setSelected(index);
    setModalVisible(false);
    dispatch(defaultAccount(data[index]));
    dispatch(getAccountBalanceAction(payload))
  };


  const accountBalance = useSelector(state => state.accountBalance.success)
  const accountBalanceLoading = useSelector(state => state.accountBalance.loading)
  const accountBalanceErr = useSelector(state => state.accountBalance.error)
 
  const AllAccountCard = (item, index) => {
    return (
      <Pressable onPress={() => selectHandler(index)}>
        <View>
          <View style={styles.allAccountCardContainer}>
            <Image
              source={images.keyMobileLogoRound}
              style={styles.logoImage}
            />
            <View>
              <Text style={styles.accountNameText}>{item.accountname}</Text>
              <Text style={styles.accountTypeText}>{item.acctype}</Text>
              <View style={styles.accountDetailsContainer}>
  
                <Text style={styles.accountNoText}>{item.accountno}</Text>
               
              </View>
              <View style={styles.accountDetailsContainer}>
                <Text style={styles.accountNoText}>{item.accccy}</Text>
                <Text style={styles.accountNoText}>{thousandOperator(item.FormatedAccountBalance) }</Text>
               
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

 
const getView = async () => {
  let show = await getItem("showBalance");
  dispatch(showBalance(show))
 
};

  const toggleView = async () => {
    if (showAccountBalance == "show") {
      dispatch(showBalance("hide"))
      await setItem("showBalance", "hide");

    } else {
      dispatch(showBalance("show"))
      await setItem("showBalance", "show");

    }

  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    
    dispatch(getAccountBalanceAction(payload))
    // dispatch(defaultAccount(data[0]))

  }, []);

  useEffect(() => {
    getView();
  },[])

  // let accountType = displayAccount.acctype.split(" ");
  // accountType = accountType[0];

  return (
    <View style={noPadding ? styles.cardContainerNoPadding : styles.cardContainer}>
      <ImageBackground
        source={images.headerImg}
        style={styles.sliderBg}
        imageStyle={styles.sliderImage}
      >
        <View style={styles.content}>
          <View style={{ ...styles.container1, ...{ marginBottom: 15 } }}>
            <View style={styles.container2}>
              <Text style={styles.accountTypeLabel}>{accountDetails?.accountType || ""}</Text>
              <Text style={styles.accountNumberLabel}>
                {accountDetails?.accountno}
              </Text>
            </View>
            <TouchableOpacity style={{ width: 90,flexDirection: 'row', justifyContent: "flex-end"}}
             onPress={toggleModal}
            >
            <View style={styles.iconBg}>
              <Ionicons
                name="chevron-down"
                size={20}
                color={COLORS.white}
               
              />
            </View>
            </TouchableOpacity>
          </View>
          {/* // added for card icon */}
          <View style={[GLOBAL_STYLE.rowBetween,{justifyContent: "flex-start", alignItems: "center"}]}>
            <View><Text style={styles.balanceLabel}>Account Balance</Text></View>
            <TouchableOpacity style={{ width: 40,flexDirection: 'row', justifyContent: "flex-end"}}
             onPress={toggleView}
            >
            <View style={styles.iconBg}>
              <Ionicons
                name={ showAccountBalance == "show" ? "ios-eye-off-sharp" : "ios-eye"}
                size={20}
                color={COLORS.white}
               
              />
            </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container1}>
          <View style={styles.container2}>
            <View>
              
              {(showAccountBalance == "show") && (accountBalanceLoading == "pending") ?
             ( <ActivityIndicator size="small" color="white" />) :
             showAccountBalance == "show" && accountBalance
              ? (
                <Text style={styles.amountLabel}>
                 {" "}
                  {accountDetails?.accccy}{" "}
                  {thousandOperator(accountDetails?.availablebalance)}
  
                </Text>
              ) 
              :
              showAccountBalance == "show" && accountBalanceErr
              ? (
                <Text style={styles.amountLabelErr}>
                 Not available
                </Text>
              ) 
              : 
              
              (
                <Text style={styles.amountLabelHidden}>**********</Text>
              )}
            </View>
           


          </View>
{!hideCard && (<View style={[GLOBAL_STYLE.rowBetween,{alignItems: "center"}]}>

<Text style={[GLOBAL_STYLE.h6,{color: COLORS.white,marginRight: 5}]}> {accountCard} </Text>
{accountCard == "MasterCard" ? <AccountCardMasterCardIcon /> : accountCard == "Verve" ? <AccountCardVerveCardIcon /> : accountCard == "Visa" ? <AccountCardVisaCardIcon /> : ""}

</View>)}


          
          </View>
          
        </View>
      </ImageBackground>
      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={toggleModal}

          // transparent={true}
        >
          <SafeAreaView />
          <FlatList
            ListHeaderComponent={
              <Text style={styles.listHeaderText}>Select Source Account</Text>
            }
            ListHeaderComponentStyle={{
              ...styles.allAccountCardContainer,
              ...{ borderBottomWidth: 0 },
            }}
            data={data}
            renderItem={({ item, index }) => AllAccountCard(item, index)}
            keyExtractor={(item, index) => index}
          />
          {/* {data.map((items, index) => (<Text
         key={index}
         >{items.FormatedAccountBalance}</Text>))} */}
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  cardContainerNoPadding: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  sliderBg: {
    width: "100%",

    height: 130,
    borderRadius: 40,
  },
  sliderImage: {
    borderRadius: 5,
    paddingHorizontal: 50,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    marginVertical: 5,
  },
  container1Text: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: FONTS.normal,
  },
  balanceLabel: {
    fontFamily: FONTS.normal,
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 5,
  },
  amountLabel: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  amountLabelErr: {
    fontSize: 12,
    fontFamily: FONTS.normal,
    color: COLORS.white,
    marginLeft: 10
  },
  amountLabelHidden: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginLeft: 5,
  },

  accountTypeLabel: {
    color: COLORS.white,
    fontFamily: FONTS.normal,
    fontSize: 16,
    marginLeft: 5,
  },
  accountNumberLabel: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: 6,
  },
  container2: {
    flexDirection: "row",
  },
  iconBg: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: COLORS.primaryBlue2,
    borderRadius: 20,
    opacity: 0.25,
  },
  accountInfo: {
    color: COLORS.white,
    fontFamily: FONTS.normal,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountInfoText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.normal,
  },
  accountInfoText2: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  allAccountCardContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryBlue2,
  },
  accountDetailsContainer: {
    flexDirection: "row",
  },
  accountNameText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    fontSize: 16,
  },
  accountTypeText: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
    marginRight: 5,
  },
  accountNoText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    marginRight: 5,
  },

  listHeaderText: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
    fontSize: 16,
  },
});
export default AccountCard;
