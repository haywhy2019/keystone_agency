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
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import {
  COLORS,
  FONTS,
  isAndroid,
  SIZES,
  GLOBAL_STYLE,
} from "../../../constants";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AccountCard } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { images } from "../../../constants";
import { ChangeProfileImageIcon } from "../../../constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { Clipboard } from "react-native-web";
import AccountOfficerBar from "../../components/AccountOfficerBar";
import { ImageIcon, ImageIconTwo } from "../../../constants/icons";

const AccountOfficers = ({ navigation }) => {
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
  return (
    // <View style={styles.container}>
      <ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobalNopadding} style={{flexGrow: 1}}>
        <StatusBar style={isAndroid ? "light" : "auto"} />
        <View style={{ marginVertical: 10 }}>
          <AccountCard data={customerDetails.accounts} />
        </View>
        <View style={styles.profileaBackground}>
          <View style={styles.centerProfileImage}>
            <View style={styles.profileIconContainer}>
              <Image source={images.officerImage} style={styles.profileImage} />
            </View>
            <View>
              <Text style={styles.name}>
                {selectedAccount.accountofficername || "Customer service"}
              </Text>
              <Text style={styles.bvn}>
                {selectedAccount.accountofficerbranch || "Head Office"}
              </Text>
            </View>
          </View>
        </View>
        <AccountOfficerBar

          label="Email Address"
          header={selectedAccount.accountofficeremail || "contactcentre@keystonebankng.com"}
          leftIcon={<ImageIcon />}
          onPress={() => Linking.openURL('mailto:contactcentre@keystonebankng.com')}
        />

        <AccountOfficerBar
          label="Phone Number"
          header={selectedAccount.accountofficernumber || "0700 2000 3000"}
          leftIcon={<ImageIconTwo />}
          onPress={() => isAndroid ?  Linking.openURL(`tel:${number}`) :  Linking.openURL(`telprompt:${number}`)}
        />

        <AccountOfficerBar
          label="Branch Location"
          header="1, Keystone Bank Crescent"
          leftIcon={<ImageIconTwo />}
        />

        <AccountOfficerBar
          header={selectedAccount.accountofficernumber || "0700 2000 3000"}
          label="SMS"
          leftIcon={<ImageIconTwo />}
          onPress={() => Linking.openURL(`sms:${"0700 2000 3000"}`)}
        />
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  
  profileaBackground: {
    backgroundColor: COLORS.white,
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
    fontSize: SIZES.responsiveHeight("1.8%"),
    textAlign: "center",
    marginVertical: 10,
  },

  bvn: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    fontSize: SIZES.responsiveHeight("1.8%"),
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

});

export default AccountOfficers;
