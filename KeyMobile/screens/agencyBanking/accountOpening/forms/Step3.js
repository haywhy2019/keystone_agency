import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  GLOBAL_STYLE,
} from "../../../../../constants";
import { CustomButton, Input, DropDownInput } from "../../../../../components";
import { ModalList } from "../../../../components";
import { useSelector, useDispatch } from "react-redux";
import { AccountFormContext } from ".././accountContext";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";

const Step3 = ({ prev, navigation, next }) => {
  const [selectBranch, setSelectBranch] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [searchBranch, setSearchBranch] = useState("");
  const [searchText, setSearchText] = useState("");

  const {
    third: {
      branch,
      setBranch,
      referralCode,
      setReferralCode,
      acctType,
      setAcctType,
    },
  } = useContext(AccountFormContext);

  const nextPage = () => {
    if (!branch) {
      return setErrors({ branch: "This field is required" });
    }
    if (!acctType) {
      return setErrors({ accountType: "This field is required" });
    }
    setErrors({});
    next();
  };

  const branchList = useSelector((state) => state.allBranch.success);
  const accountType = useSelector((state) => state.accountType.success);

  const toggleBranchModal = () => setVisible(!visible);

  const selectBankBranch = (item) => {
    setBranch(item);
    setSearchText("");
    setVisible(false);
  };

  const selectAccountType = (item) => {
    setAcctType(item);
    setAccountVisible(false);
  };

  const DisplayAccountName = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 10,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.primaryBlue,
        }}
        onPress={() => selectAccountType(item)}
      >
        <View
          style={[
            GLOBAL_STYLE.rowBetween,
            { justifyContent: "flex-start", paddingHorizontal: "5%" },
          ]}
        >
          <FontAwesome
            name="bank"
            size={16}
            color={COLORS.primaryBlue2}
            style={{ marginRight: 5 }}
          />

          <Text style={[GLOBAL_STYLE.h4, { color: COLORS.primaryBlue2 }]}>
            {item.productname}
          </Text>
        </View>
      </Pressable>
    );
  };

  const DisplayBranchName = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 10,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.primaryBlue,
        }}
        onPress={() => selectBankBranch(item)}
      >
        <View
          style={[
            GLOBAL_STYLE.rowBetween,
            { justifyContent: "flex-start", paddingHorizontal: "5%" },
          ]}
        >
          <FontAwesome
            name="bank"
            size={16}
            color={COLORS.primaryBlue2}
            style={{ marginRight: 5 }}
          />

          <Text style={[GLOBAL_STYLE.h4, { color: COLORS.primaryBlue2 }]}>
            {item.BranchName}
          </Text>
        </View>
      </Pressable>
    );
  };
  const filterBranch = (textToSearch) => {
    setSearchBranch(
      branchList.filter((item) =>
        item.BranchAddress.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
    setSearchText(textToSearch);
  };

  console.log(searchText, "text search");
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View>
        <View>
          <ModalList
            placeholder={"Select branch"}
            value={branch.BranchName}
            icon={
              <Pressable
                onPress={() => {
                  setVisible(true);
                }}
                style={{
                 
                  height: 45,
                  width: 40,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="bank"
                  size={16}
                  color={COLORS.primaryBlue2}
                />
              </Pressable>
            }
            error={errors.branch}
            data={searchBranch}
            visible={visible}
            onRequestClose={() => {
              setVisible(false);
            }}
            search
            searchValue={searchText}
            onChangeText={(text) => filterBranch(text)}
            emptyListText={"Search by first letter"}
            renderItem={({ item, index }) => DisplayBranchName(item, index)}
          />
        </View>
        <Input
          label="Dao code"
          placeholder="Referal code"
          optional="(optional)"
          value={referralCode}
          onChangeText={(text) => setReferralCode(text)}
        />

        <View>
          <ModalList
            placeholder={"Account Type"}
            value={acctType.productname}
            error={errors.accountType}
            icon={
              <Pressable
                onPress={() => setAccountVisible(true)}
                style={{
                 
                  height: 45,
                  width: 40,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="chevron-down"
                  size={16}
                  color={COLORS.primaryBlue2}
                />
              </Pressable>
            }
            data={accountType}
            visible={accountVisible}
            onRequestClose={() => setAccountVisible(false)}
            emptyListText={"An error occured. Try again later."}
            renderItem={({ item, index }) => DisplayAccountName(item, index)}
          />
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={[GLOBAL_STYLE.h3Bold, { textAlign: "center" }]}>
          Account Features
        </Text>
      </View>

      <Grid
        style={{ borderWidth: 0.5, borderColor: COLORS.grey, marginBottom: 40 }}
      >
        <Row
          style={{ borderBottomWidth: 0.5, paddingHorizontal: 7, height: 30 }}
        >
          <Col size={1} style={{}}>
            <Text
              style={[
                GLOBAL_STYLE.h4Bold,
                { marginBottom: 0, color: COLORS.primaryBlue2 },
              ]}
            >
              Account
            </Text>
          </Col>
          <Col
            size={3}
            style={{
              borderLeftWidth: 0.8,
              borderLeftColor: COLORS.grey,
              paddingLeft: 7,
            }}
          >
            <Text style={[GLOBAL_STYLE.h4Bold, { color: COLORS.primaryBlue2 }]}>
              Features
            </Text>
          </Col>
        </Row>
        <Row
          style={{ borderBottomWidth: 0.5, paddingHorizontal: 7, height: 80 }}
        >
          <Col size={1} style={{}}>
            <Text style={[GLOBAL_STYLE.h5, { color: COLORS.grey }]}>
              Quick Save
            </Text>
          </Col>
          <Col
            size={3}
            style={{
              borderLeftWidth: 0.8,
              borderLeftColor: COLORS.grey,
              paddingLeft: 7,
            }}
          >
            <Text style={[GLOBAL_STYLE.h5, { color: COLORS.grey }]}>
              Single deposit N50,000 cumulative N300,000 - App transfer: N3,000
              single cumulative N30,000. Requirement to open Quick Save account
              is BVN and Selfie.{" "}
            </Text>
          </Col>
        </Row>
        <Row
          style={{ borderBottomWidth: 0.5, paddingHorizontal: 7, height: 80 }}
        >
          <Col size={1} style={{}}>
            <Text style={[GLOBAL_STYLE.h5, { color: COLORS.grey }]}>
              Quick Save Plus
            </Text>
          </Col>
          <Col
            size={3}
            style={{
              borderLeftWidth: 0.8,
              borderLeftColor: COLORS.grey,
              paddingLeft: 7,
            }}
          >
            <Text style={[GLOBAL_STYLE.h5, { color: COLORS.grey }]}>
              {" "}
              Single deposit N100,000 cumulative N500,000. -App transfer:
              N10,000 single cumulative N100.000. Requirements to open Quick
              Save Plus account is BVN, Valid ID and Selfie
            </Text>
          </Col>
        </Row>
        <Row
          style={{ borderBottomWidth: 0.5, paddingHorizontal: 7, height: 80 }}
        >
          <Col size={1}>
            <Text style={[GLOBAL_STYLE.h5, { color: COLORS.grey }]}>
              Savings/Current
            </Text>
          </Col>
          <Col
            size={3}
            style={{
              borderLeftWidth: 0.8,
              borderLeftColor: COLORS.grey,
              paddingLeft: 7,
            }}
          >
            <Text style={[GLOBAL_STYLE.h5, { color: COLORS.grey }]}>
              {" "}
              Deposit and Transfer is limitless. Requirements to open
              Savings/Current account is BVN. Valid ID. Proof of
              Residence,[Utility Bill] and Selfie
            </Text>
          </Col>
        </Row>
      </Grid>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <CustomButton
          buttonText={"Previous"}
          onPress={() => prev()}
          buttonContainerStyle={{ width: "40%" }}
        />

        <CustomButton
          buttonText={"Next"}
          onPress={nextPage}
          buttonContainerStyle={{ width: "40%" }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    // height: SIZES.height - 200,
  },
  selfie: {
    alignItems: "center",
  },
  instruction: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginTop: 10,
  },
  instruction2: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 5,
  },
  loanHeader: {
    width: "100%",
    height: 100,

    borderRadius: 10,

    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 5,
  },
  loanHeaderImage: {
    borderRadius: 5,
    //  paddingHorizontal: 50
  },
  loanText: {
    color: COLORS.grey,
  },
  loanAmount: {
    fontSize: 20,
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginTop: 10,
  },
  loanHeadercontent: {
    marginLeft: 20,
    marginTop: 20,
  },
  noticeText: {
    fontFamily: FONTS.normal,
    textAlign: "center",
  },
  noticeTextColor: {
    color: "red",
  },
});

export default Step3;
