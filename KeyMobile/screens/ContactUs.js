import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Linking
  } from "react-native";
  import {
    COLORS,
    FONTS,
    isAndroid,
    isIOS,
    SIZES,
    GLOBAL_STYLE,
    images
  } from "../../constants";
  import { StatusBar } from "expo-status-bar";
  import React, { useEffect, useState } from "react";
  import { AccountCard } from "../../components";
  import { useSelector, useDispatch } from "react-redux";
  import AccountOfficerBar from "../components/AccountOfficerBar";
  import { ImageIcon, ImageIconTwo, ContactCenterCallIcon, ContactCenterLocationIcon, ContactCenterMailIcon, ContactCenterSmsIcon } from "../../constants/icons";
import { MenuIconCard, MenuLeftIconCard, MenuLeftRightIcon, MenuOptionsCard } from "../components";
  
  const ContactUs = ({ navigation }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState("");
    const [visible, setVisible] = useState(false);
    const [notice, setNotice] = useState("");
    const userImageLoading = useSelector((state) => state.userImage.loading);
  
    const customerDetails = useSelector((state) => state.auth.user);
    const { CustomerName } = useSelector((state) => state.auth.user);
    const userImage = useSelector((state) => state.userImage.success);
  
    const selectedAccount = useSelector(
      (state) => state.selectedAccount.accountDetails
    );
  
    console.log(selectedAccount, "selected accounts");
let number = "0700 2000 3000"

    // dialCall = (number) => {
    //     let phoneNumber = '';
    //     if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    //     else {phoneNumber = `telprompt:${number}`; }
    //     Linking.openURL(phoneNumber);
    //  };

    return (
      // <View style={styles.container}>
        <ScrollView contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobalNopadding, {justifyContent: "space-between"}]} >
          <StatusBar style={isAndroid ? "light" : "auto"} />
        
          <View style={styles.profileBackground}>
            <View style={styles.centerProfileImage}>
              <View style={styles.profileIconContainer}>
                <Image source={images.officerImage} style={styles.profileImage} />
              </View>
              <View>
                <Text style={styles.name}>
                  {"Customer service"}
                </Text>
                <Text style={styles.bvn}>
                  {"Head Office"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.contact}>
<MenuLeftIconCard
leftIcon={<ContactCenterCallIcon />}
label="0700 2000 3000"
labelStyle={{color: COLORS.grey}}
onPress={() => isAndroid ?  Linking.openURL(`tel:${number}`) :  Linking.openURL(`telprompt:${number}`)}
/>
<MenuLeftIconCard
leftIcon={<ContactCenterLocationIcon />}
label="1, Keystone Bank Crescent"
labelStyle={{color: COLORS.grey}}
/>
<MenuLeftIconCard
leftIcon={<ContactCenterMailIcon />}
label="contactcentre@keystonebankng.com"
labelStyle={{color: COLORS.grey}}
onPress={() => Linking.openURL('mailto:contactcentre@keystonebankng.com')}


/>
<MenuLeftIconCard
leftIcon={<ContactCenterSmsIcon />}
label={number}
onPress={() => Linking.openURL(`sms:${number}`)}
labelStyle={{color: COLORS.grey}}

/>
         
   
          </View>
  
        </ScrollView>
      
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
      height: SIZES.width / 4,
      width: SIZES.width / 4,
      marginHorizontal: isAndroid ? 3 : 5,
      marginVertical: 6,
      elevation: 5,
      // borderWidth: isAndroid ? 0 : 5,
      backgroundColor: "white",
      borderRadius: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
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
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingHorizontal: "5%",
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
  
    profileBackground: {
      backgroundColor: COLORS.grey2,
     paddingTop: 20,
     flex: 1
    },
    contact:{
        flex:2,
        paddingTop: 20,
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.white
    },
    centerProfileImage: {
      alignItems: "center",
    },
    profileIconContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "baseline",
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    profileImageLoading: {
      justifyContent: "center",
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: COLORS.grey,
    },
   
   
    name: {
      color: COLORS.primaryBlue,
      fontFamily: FONTS.bold,
      fontSize: SIZES.responsiveHeight("2%"),
      textAlign: "center",
      marginVertical: 10,
    },
  
    bvn: {
      color: COLORS.primaryBlue2,
      fontFamily: FONTS.bold,
      fontSize: SIZES.responsiveHeight("2%"),
      textAlign: "center",
    },
    menuCardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: COLORS.primaryBlue,
      backgroundColor: "white",
      height: 60,
      borderBottomWidth: 0.5,
      borderBottomColor: COLORS.grey,
      paddingHorizontal: 20,
      fontFamily: FONTS.normal,
    },
    menuCardContainerText: {
      color: COLORS.primaryBlue,
      marginLeft: 10,
      fontFamily: FONTS.normal,
    },
  });
  
  export default ContactUs;
  