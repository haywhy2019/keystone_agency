import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  beneficiaryListAction,
  beneficiaryAddAction,
  beneficiaryDeleteAction,
  beneficiaryEditAction
} from "../../../utilities/redux/keyMobile/axiosService/beneficiaryList";
import {
  SpinnerImage,
  Input,
  DropDownInput,
  CustomButton,
  CustomSnackBar,
} from "../../../components";
import {
  ModalList,
  BeneficiaryListCard,
  BankListItemCard,
} from "../../components";
import { COLORS, GLOBAL_STYLE, SIZES, isAndroid } from "../../../constants";
import { Formik } from "formik";
import { accountNameAction } from "../../../utilities/redux/keyMobile/axiosService/accountNameEnq";
import uuid from "react-native-uuid";

import {
  Feather,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import getUserHook from "../../../utilities/hooks/getUserHook";
import getPossibleBankHooks from "../../../utilities/hooks/getPossibleBankHooks";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  account: Yup.number().required("Required"),
  accountname: Yup.string().required("Unable to fetch account name. try again"),
  bank: Yup.object().required("Required"),
  bankType: Yup.string().required("Required"),
  alias: Yup.string(),
});

const bankTypeData = [
  { label: "Keystone Bank", value: "Keystone Bank" },
  { label: "Other Banks", value: "Other Banks" },
];
const Beneficiary = () => {
  const [user] = getUserHook();
  // const [getPossibleBank, bankList, loadingBank,] = getPossibleBankHooks()
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState("");
  const [searchBeneficiary, setSearchBeneficiary] = useState("");
  const [searchText, setSearchText] = useState("");

  const [error, setError] = useState("");
  

  const [modalVisible, setModalVisible] = useState(false);
  const [bankModal, setBankModal] = useState(false);
  const [crAccountName, setCrAccountName] = useState("");
  const [crAccountNameErr, setCrAccountNameErr] = useState("");
  // const [username, setUsername] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bank, setBank] = useState("");
  const [bankType, setBankType] = useState("");
const [editList, setEditList]  = useState(false);
  const [alias, setAlias] = useState("");
  const [bankList, loadingBank, bankListModal] =
    getPossibleBankHooks(accountNumber);
    const id = uuid.v4();
  const getBenficiary = (user) => {
    setLoading(true);
    beneficiaryListAction(user)
      .then((res) => {
        console.log(res, "bene list")
        if ((res.status = 200)) {
          setList(res.data);
        } else {
          setError("An error occured");
        }
        console.log(res, "bene res");
      })
      .catch((err) => {
        setError(err.message || "An error occured");
        console.log("bene err");
      })
      .finally(() => setLoading(false));
  };



  let checkAccountNo = /^\d{10}$/;
  const getAccountName = () => {
    const payload = {
      requestid: id,
      accountno: accountNumber,
      source: "mobile",
      bankcode: bankType == "Other Banks" ? bankName?.BankCode : "082",
      username: user,
    };
    setLoading(true);
    accountNameAction(payload)
      .then((res) => {
        console.log(res, "account name");
        if (res.data.status == "00") {
          setCrAccountName(res.data.accountname);
        } else {
          // setCrAccountName("An error occured");
          setCrAccountNameErr("An error occured");
        }
      })
      .catch((err) => {
        console.log(err, "errorrr");
        setCrAccountNameErr(err.message || "An error occured");

        // setCrAccountName("An error occured");
      })
      .finally(() => setLoading(false));
  };

  const deleteBeneficiary = (id) => {
    setLoading(true)
    console.log("deleted", id)
    beneficiaryDeleteAction(id)
    .then(res => {
      console.log(res, "del response")
      if(res.status == 200){
        getBenficiary(user);
      }else{
        setError("An error occured, try again later")
      }
    }).catch(err => {
      setError(err.message || "An error occured, try again later")

    }).finally(() => setLoading(false))
  }

  const editBeneficiarySubmit = (payload) => {
    setLoading(true)
    beneficiaryEditAction(editList,payload)
    .then(res => {
      console.log(res, "edit response")
      if(res.status == 200){
        getBenficiary(user);
        setModalVisible(false);
      }else{
        setModalVisible(false);
        setError("An error occured, try again later")
      }
    }).catch(err => {
      setModalVisible(false);
      setError(err.message || "An error occured, try again later")

    }).finally(() => setLoading(false))
  }

  const editBeneficiary = (item) => {
   
    setModalVisible(true)
    setBankType(item.bankName != "Keystone Bank" ? "Other Banks": "Keystone Bank")
    setBank(bankType == "Keystone Bank" ? {BankCode : "082", BankName: "Keystone bank"} : null)
  setCrAccountName(item.accountname)
  setAccountNumber(item.accountnumber)
  setEditList(item.id)
  }


  const beneficiaryCard = ({ item }) => {
    return (
      <BeneficiaryListCard
        item={item}
        onEdit={() => editBeneficiary(item)}
        onDelete={() => deleteBeneficiary(item.id)}
      />
    );
  };

  const bankItem = ({ item }) => {
    return <BankListItemCard item={item} onPress={() => selectBank(item)} />;
  };

  const selectBank = (item) => {
    setBankName(item);
    setBankModal(false);
    getAccountName();
  };

  useEffect(() => {
    if (user) {
      getBenficiary(user);
    }
  }, [user]);

  useEffect(() => {
    if (bankListModal) {
      setBankModal(true);
    }
    if (bankList) {
      setLoading(false);
    }
  }, [bankListModal, bankList]);

  useEffect(() => {
    if (accountNumber.match(checkAccountNo) && bankType == "Keystone Bank") {
      getAccountName();
    }
  }, [accountNumber, bankType]);

  useEffect(() => {
    if (list) { 
      setSearchBeneficiary(list)
    }
  }, [list]);
  
  const filterBeneficiary = (textToSearch) => {
   
    setSearchBeneficiary(
      list.filter((item) =>
        item.accountname.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
    setSearchText(textToSearch);
  };

  if (loading) {
    return <SpinnerImage bgColor={"white"}/>;
  }
  return (
    <View style={[GLOBAL_STYLE.backgroundNoPadding, {justifyContent: "space-evenly"}]}>
    
      <FlatList
        style={GLOBAL_STYLE.backgroundNoPadding}
        ListHeaderComponentStyle={{ marginHorizontal: "5%" }}
        ListHeaderComponent={
          searchBeneficiary.length > 0 && (
            <Input
            icon={<FontAwesome name="search" size={16} color={COLORS.grey} />}
            placeholder="search"
            value={searchText}
            onChangeText={(text) => filterBeneficiary(text,list)}
          />
          )
         
        }
        ListEmptyComponent={
          <Text
            style={[
              GLOBAL_STYLE.h4Bold,
              { textAlign: "center", marginVertical: 10 },
            ]}
          >
            No Added Beneficiary
          </Text>
        }
        
        data={searchBeneficiary}
        renderItem={beneficiaryCard}
        keyExtractor={(item, index) => index}
        
      />
    <View>
    <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{flexDirection: "row", 
          justifyContent: "flex-end", 
          paddingRight: 10,
          marginBottom:  isAndroid ? 30 : 60,
         
     
        }}
        >
          <Text style={[GLOBAL_STYLE.h3, { color: COLORS.grey }]}>
            CREATE NEW{" "}
          </Text>
          <Entypo name="squared-plus" size={23} color={COLORS.primaryBlue2} />
        </TouchableOpacity>
    </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(233, 233, 233, 0.8)",
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "73%",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              alignItems: "center",
            }}
          >
            <Text style={[GLOBAL_STYLE.h3Bold, { marginTop: 15 }]}>
           {editList ?  "Edit Beneficiary" :  "Create Beneficiaries"}
            </Text>

            <Text style={[GLOBAL_STYLE.h4, { color: "#C4C4C4" }]}>
           {editList ?  "Edit Send Money Beneficiary" :  "Create New Send Money Beneficiary"}

          
            </Text>

            <Formik
              initialValues={{
                account: accountNumber,
                accountname: crAccountName,
                alias: alias,
                bank: bankName,
                bankType: bankType,
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const payload = {
                  id: 0,
                  username: user,
                  accountnumber: values.account,
                  accountname: crAccountName,
                  bankcode: values.bank.BankCode,
                  bankname: values.bank.BankName,
                  alias: alias,
                };
                const editPayload = {
                  id: editList,
                  username: user,
                  accountnumber: values.account,
                  accountname: crAccountName,
                  bankcode: values.bank.BankCode,
                  bankname: values.bank.BankName,
                  alias: alias,
                };
                // Keyboard.dismiss();
                setLoading(true);
             {editList ? editBeneficiarySubmit(editPayload) :
              beneficiaryAddAction(payload)
             .then((res) => {
               console.log(res, "bene res");
               if (res.status == 200) {
                 setModalVisible(false);
                 getBenficiary(user);
               } else {
                 setError(res.response.data.Message);
               }
             })
             .catch((err) => {
               setError(err.message || "An error occured");
             })
             .finally(() => setLoading(false));
         }}}   
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => {
             
                return (
                  <View
                    style={{
                      width: "100%",
                      marginTop: 15,
                      paddingHorizontal: "5%",
                    }}
                  >
                    <DropDownInput
                      // label="Transfer Type"
                      data={bankTypeData}
                      placeholderStyle={{
                        color: COLORS.primaryBlue,
                        fontSize: 14,
                      }}
                      labelField="label"
                      valueField="value"
                      placeholder={"Select bank"}
                      value={values.bankType}
                      onChange={(item) => {
                        setBankType(item.value);
                      }}
                      error={
                        errors.bankType && touched.bankType && errors.bankType
                      }
                    />

                    <Input
                      label={crAccountName}
                      value={values.account}
                      keyboardType="numeric"
                      placeholder="Beneficiary Account"
                      onChangeText={(text) => setAccountNumber(text)}
                      placeholderTextColor={COLORS.primaryBlue}
                      error={
                        errors.account && touched.account && errors.account
                      }
                    />
                    {bankType == "Other Banks" && (
                      <ModalList
                        placeholder="Select bank"
                        value={values.bank.BankName}
                        // error={""}
                        icon={
                          <Pressable
                            onPress={() => {
                              setBankModal(true);
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
                        visible={bankModal}
                        onRequestClose={() => setBankModal(false)}
                        data={bankList}
                        // renderItem={({ item, index }) =>
                        //   DisplayBank(item, index)
                        // }
                        renderItem={bankItem}
                        emptyListText={
                          <Text style={GLOBAL_STYLE.h4Bold}>
                            An error occured
                          </Text>
                        }
                        error={errors.bank && touched.bank && errors.bank}
                      />
                    )}

                    <Input
                      value={alias}
                      placeholder="Alias"
                      onChangeText={(text) => setAlias(text)}
                      placeholderTextColor={COLORS.primaryBlue}
                    />
                    <Text style={GLOBAL_STYLE.textError}>
                      {errors.accountname &&
                        touched.accountname &&
                        errors.accountname}
                    </Text>
                    <CustomButton buttonText="Submit" onPress={handleSubmit} />
                  </View>
                );
              }}
            </Formik>
          </Pressable>
        </Pressable>
      </Modal>
      <CustomSnackBar 
      show={error}
      message={error}
      />
    </View>
  );
};

export default Beneficiary;

const styles = StyleSheet.create({
  createNew: {
    // justifyContent: "flex-end",
    // paddingRight: "5%",
    // paddingTop: "5%",
    // height: SIZES.responsiveHeight("100%")
  },
});
