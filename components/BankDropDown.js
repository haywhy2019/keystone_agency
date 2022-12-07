import { StyleSheet, Text, View } from "react-native";
import React,{useEffect, useState} from "react";
import {
  bankListAction,
  bankPossibleListAction,
} from "../utilities/redux/keyMobile/axiosService/bankList";
import Input from "./Inputs";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, GLOBAL_STYLE } from "../constants";

const BankDropDown = ({ accountNumber, transferType }) => {
  const [bankModal, setBankModal] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [bankName, setBankName] = useState("");
  const [crAccountName, setCrAccountName] = useState("");

  const toggleBankModal = () => setBankModal(!bankModal);
  const filterBankName = (textToSearch) => {
    setSearchBank(
      bankList.filter((item) =>
        item.BankName.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
  };

  const DisplayBankName = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 10,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.primaryBlue,
        }}
        onPress={() => selectBeneficairyBankDetails(item)}
      >
        <View
          style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-start" }]}
        >
          <FontAwesome
            name="bank"
            size={16}
            color={COLORS.primaryBlue2}
            style={{ marginRight: 20 }}
          />
          <Text style={[GLOBAL_STYLE.h4, { color: COLORS.primaryBlue2 }]}>
            {item.BankName}
          </Text>
        </View>
      </Pressable>
    );
  };
  let checkAccountNo = /^\d{10}$/;

  const getAccountName = () => {
    const payload = {
      requestid: id,
      accountno: beneficiaryAcct,
      source: "mobile",
      bankcode: transferType == "Other Banks" ? bankName?.BankCode : "082",
      username: user,
    };
    setLoading(true);
    accountNameAction(payload)
      .then((res) => {
        if (res.data.status == "00") {
          setCrAccountName(res.data.accountname);
        } else {
          setCrAccountName("An error occured");
        }
      })
      .catch((err) => {
        console.log(err, "errorrr");
        setCrAccountName("An error occured");
      })
      .finally(() => setLoading(false));
  };
  const getPossibleBank = () => {
    setLoading(true);
    bankPossibleListAction(beneficiaryAcct)
      .then((res) => {
        console.log(res, "possible bank");
        if (res.status == 200) {
          setBankList(res.data);
          setSearchBank(res.data);
          setBankModal(true);
        } else {
          setBankList([
            { BankName: "An error occured", BankCode: "An error occured" },
          ]);
          setSearchBank([
            { BankName: "An error occured", BankCode: "An error occured" },
          ]);
        }
      })
      .catch((err) => {
        setBankList([
          { BankName: "An error occured", BankCode: "An error occured" },
        ]);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (
      accountNumber.match(checkAccountNo)
      //   &&
      //   transferType == "Other Banks"
    ) {
      getPossibleBank();
    }
  }, [accountNumber, transferType]);

  if (loading) {
    return <SpinnerImage />;
  }

  return (
    <View>
      <Input
        label={crAccountName}
        placeholder="Beneficiary Account"
        value={accountNumber}
        error={error}
        placeholderTextColor={COLORS.primaryBlue}
      />
      <Input
        placeholder="Select Bank"
        value={bankName}
        error={errors.bankName}
        placeholderTextColor={COLORS.primaryBlue}
        icon={
          <FontAwesome
            name="bank"
            size={16}
            color={COLORS.primaryBlue2}
            onPress={() => setBankModal(true)}
          />
        }
      />

      <Modal
        visible={bankModal}
        animationType="slide"
        onRequestClose={toggleBankModal}
      >
        <View style={{ marginHorizontal: "5%" }}>
          <FlatList
            ListEmptyComponent={
              <Text style={GLOBAL_STYLE.h4Bold}>
                An error occured. Try later
              </Text>
            }
            ListHeaderComponent={
              <Input
                icon={
                  <FontAwesome name="search" size={16} color={COLORS.grey} />
                }
                placeholder="search"
                value={searchBank}
                onChangeText={(text) => filterBankName(text)}
              />
            }
            data={searchBank}
            renderItem={({ item, index }) => DisplayBankName(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              <Pressable onTouchStart={getBank}>
                <Text
                  style={[
                    GLOBAL_STYLE.h4Bold,
                    {
                      color: COLORS.primaryBlue2,
                      textAlign: "center",
                      paddingVertical: 10,
                    },
                  ]}
                >
                  See more
                </Text>
              </Pressable>
            }
          />
        </View>
      </Modal>
    </View>
  );
};

export default BankDropDown;

const styles = StyleSheet.create({});
