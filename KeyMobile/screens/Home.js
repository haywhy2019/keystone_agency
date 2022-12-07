import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  SafeAreaView,
  BackHandler,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  COLORS,
  FONTS,
  isAndroid,
  isIOS,
  SIZES,
  GLOBAL_STYLE,
} from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { setItem, getItem } from "../../utilities/helperFunctions/asyncStorage";
import {
  HomeSendIcon,
  TelIcon,
  HomeHomeIcon,
  LoanIcon,
  SelfServiceIcon,
  DepositIcon,
  ExpenseIcon,
  BankIcon,
  EnquiresIcon,
  CardIcon,
  LifeStyleIcon,
  ScanIcon,
  WarningIcon,
  ArrowRight,
  InsuranceIcon,
  RewardIcon,
  NotifcationMesgIcon,
  ENaira,
  AgencyIcon,
  ENairaIcon,
  HomeEnairaIcon,
  SmeMarketPlace
} from "../../constants/icons";
// import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";

import { CustomButton, AccountCard } from "../../components";
import { CustomHeader } from "../components";
import { transactionAction } from "../../utilities/redux/keyMobile/actions/transactionAction";
import { userImageSuccess } from "../../utilities/redux/keyMobile/slice/userImageSlice";
import { accountBalanceSuccess } from "../../utilities/redux/keyMobile/slice/accountBalanceSlice";
import { logout } from "../../utilities/redux/allApps/slice/authSlice";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { TouchableOpacity } from "react-native-gesture-handler";
import PhoneDetails from "../../utilities/hooks/getPhoneDetails";

const iconName = [
  // previous sendmoney screen SendMoneyScreen 
  { icon: <HomeSendIcon />, label: "Send Money", screen: "SendMoneyMenu" },

  { icon: <TelIcon />, label: "Buy Airtime", label2: "/Data", screen: "MobileTopUpScreen" },
  { icon: <HomeHomeIcon />, label: "Pay Bills", screen: "BillMenu" },
  { icon: <ScanIcon />, label: "NQR",label2: "payment", screen: "NqrTab" },
  { icon: <LoanIcon />, label: "Loans", screen: "LoanDashBoard" },
  {
    icon: <DepositIcon />,
    label: "Fixed Deposit",label2: "/Investment",
    screen: "Investments",
  },

  // { icon: <InsuranceIcon />, label: "Insurance", screen: "ComingSoon" },
  // { icon: <ExpenseIcon />, label: "Wealth Management", screen: "ComingSoon" },
  { icon: <CardIcon />, label: "Virtual Dollar",label2: "Card", screen: "VirtualCardTabHome" },
  { icon: <ENairaIcon />, label: "E Naria ", screen: "ENairaMain" },
  { icon: <SelfServiceIcon />, label: "Self Service", screen: "SelfService" },
  
  { icon: <AgencyIcon />, label: "Agency ",label2: "Banking", screen: "AgencyStack" },
  { icon: <RewardIcon />, label: "My Rewards ",label2: "Referals", screen: "RewardStack" },



  { icon: <SmeMarketPlace />, label: "SME Market ",label2: "Place", screen: "SmeMarketPlace"},

  // { icon: <RewardIcon />, label: "My Rewards/",label2: "Referals", screen: "ComingSoon" },
  // { icon: <LifeStyleIcon />, label: "Lifestyle", screen: "ComingSoon" },
];

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState("");
  const [showreadMore, setShowReadMore] = useState(true);

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

  const customerDetails = useSelector((state) => state.auth.user);
  const { CustomerName } = useSelector((state) => state.auth.user);
  const splitName = CustomerName?.split(" ");
  const userName = splitName[0];

  const profileImage = useSelector((state) => state.auth.user.ProfilePix);

  const notification = useSelector((state) => state.notification.success);

  const getUserName = async () => {
    const item = await getItem("username");
    setUser(item);
  };

  const saveProfileImage = async () => {
    await setItem("profileImage", profileImage);

    dispatch(userImageSuccess(profileImage));
  };

  const presentCustomerAccounts=async()=>{
    const theAccountsNumbers= customerDetails.accounts.map((item)=>{
      const singleAcc={accountno:item.accountno}
      return singleAcc
    })
    await setItem ('presentCustomerAccounts', JSON.stringify(theAccountsNumbers))
  }

  

  

  const MenuIconCard = ({ item }) => (
    <Pressable
      style={styles.MenuIconCard}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.menuIconText}>
        <View>{item.icon}</View>

        <Text
          style={[
           isAndroid ? GLOBAL_STYLE.h6 : GLOBAL_STYLE.h7,
            {
              textAlign: "center",
              marginTop: SIZES.responsiveHeight("1%"),
              // paddingHorizontal: SIZES.responsiveWidth("1%"),
            },
          ]}
        >
          {item.label}
         
        </Text>
      {item.label2 && (<Text    style={[
            isAndroid ? GLOBAL_STYLE.h6 : GLOBAL_STYLE.h7,
            {
              textAlign: "center",
              // paddingHorizontal: SIZES.responsiveWidth("1%"),
            },
          ]}>{item.label2}</Text>)}  
      </View>
    </Pressable>
  );

  const transactionPayload = {
    username: user,
    pageNumber: 1,
    pageSize: 10,
  };

  useEffect(()=>{
    presentCustomerAccounts()
  },[])

  useEffect(() => {
    saveProfileImage();
    getUserName();
    if (user) {
      dispatch(transactionAction(transactionPayload));
    }
  }, [user]);
  


  console.log(notification, "notice");
  return (
    <View style={styles.container}>
      <StatusBar style={isAndroid ? "light" : "auto"} />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginVertical: 10 }}>
          <AccountCard/>
        </View>

        <View
          style={{
            // marginVertical: 10,
            flexDirection: "column",
            justifyContent: "space-between",

            flexGrow: 1,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              flexGrow: 1,
            }}
          >
            <View>
              {/* <Text style={styles.heading}>Top Operations</Text> */}
              <View style={styles.menuContainer}>
                <FlatList
                  data={iconName}
                  renderItem={MenuIconCard}
                  // numColumns={SIZES.width < 350 ? 3 : 4}
                  numColumns={4}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={false}
                />
                
              </View>
            </View>
            {notification ?  (
              <View style={styles.noticeCard}>
                <View style={styles.noticeCardHeading}>
                  <WarningIcon color={COLORS.primaryBlue} />
                  <Text style={[GLOBAL_STYLE.h2, { marginLeft: "10%" }]}>
                    {notification[0]?.Subject}
                  </Text>
                  <View style={styles.noticeCardHeadingIcon}>
                    <NotifcationMesgIcon
                      color={COLORS.primaryBlue}
                      onPress={() => navigation.navigate("Notification")}
                    />
                  </View>
                </View>
                <Text
                  style={[
                    GLOBAL_STYLE.h4,
                    { paddingHorizontal: 14, fontSize: 12 },
                  ]}
                >
                  {notification[0]?.Message.slice(0,100)}
                </Text>
                {showreadMore && (
                  <TouchableOpacity
                    onPress={() => {
                      setNotice(notification[0]?.Message);
                      setShowReadMore(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FF9F29",
                      color: "white",
                      paddingVertical: 5,
                      paddingHorizontal: 8,
                      width: SIZES.responsiveWidth("23%"),
                      marginBottom: 10,
                      borderRadius: 10,
                      marginHorizontal: 14,
                    }}
                  >


                    <Text style={[GLOBAL_STYLE.h6, { color: "white"}]}>

                      Read more
                    </Text>
                    <Ionicons name="arrow-forward" size={15} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
        </View>

        <ConfirmDialog
          visible={visible}
          title="Alert"
          // onTouchOutside={dismissModal}
          dialogStyle={{
            borderRadius: 5,
            borderLeftWidth: 7,
            borderLeftColor: "#FF725E",
            height: 150,
          }}
          contentStyle={{ paddingVertical: 2 }}
          titleStyle={GLOBAL_STYLE.h2Bold}
          positiveButton={{
            title: "Exit",
            onPress: () => {
              setVisible(false)
              dispatch(logout())
              BackHandler.exitApp()
            },
            titleStyle: { ...GLOBAL_STYLE.h5, color: "#FF725E" },
          }}
          negativeButton={{
            title: "Cancel",
            onPress: () => setVisible(false),
            titleStyle: { ...GLOBAL_STYLE.h5 },
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {/* <SessioneEndedIcon /> */}

            <Text style={[GLOBAL_STYLE.h5]}>
              Exit to logout. cancel to continue
            </Text>
          </View>
        </ConfirmDialog>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    backgroundColor: COLORS.grey,
    height: 7,
    width: 7,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  indicator2: {
    backgroundColor: COLORS.primaryBlue,
    height: 7,
    width: 7,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  MenuIconCard: {

    height: isAndroid ? SIZES.width / 4.5 : SIZES.width / 4.5,
    width:  isAndroid ? SIZES.width / 4.8 : SIZES.width / 4.8,
    marginHorizontal: isAndroid ? 3 : 3,
    marginVertical: 4,
    elevation: 5,
    // borderWidth: isAndroid ? 0 : 5,
    backgroundColor: "white",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {

    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "space-evenly",
    // paddingHorizontal: "5%",


  },
  heading: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    paddingLeft: "6%",
    paddingVertical: 10,
  },
  noticeCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 5,
    marginVertical: SIZES.responsiveHeight("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: isAndroid ? 5 : 0,
    borderLeftWidth: 6,
    borderLeftColor: COLORS.primaryBlue,
  },
  noticeCardHeading: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
  },
  noticeCardHeadingText: {
    color: COLORS.primaryBlue,
    marginLeft: "10%",
    fontFamily: FONTS.normal,
  },
  noticeCardHeadingIcon: {
    marginLeft: "auto",
  },
  // noticeCardText: {
  //   color: COLORS.primaryBlue,
  //   paddingHorizontal: 14,
  //   fontSize: 12,
  //   paddingBottom: 20,
  //   fontFamily: FONTS.normal,
  // },
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    height: 40,
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export default Home;
