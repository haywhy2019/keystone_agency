import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    TouchableOpacity,
    Pressable,
    ScrollView
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import {
    billsBeneficiaryListAction,
    billsBeneficiaryDeleteAction,
    billsBeneficiaryAddAction,
    billsBeneficiaryEditAction,
  } from "../../../utilities/redux/keyMobile/axiosService/beneficiaryList";
  import {
    billsCategoryAction,
    billCategoryOptionAction,
    billItemsAction,
  } from "../../../utilities/redux/keyMobile/axiosService/billsPayment";
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
    ListItemCard,
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
  import * as Yup from "yup";
  
  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    customerId: Yup.number().required("Required"),
    alias: Yup.string().required("Required"),
  });
  
  const validationSchema2 = Yup.object().shape({
    customerId: Yup.number().required("Required"),
    alias: Yup.string().required("Required"),
  });

  const beneList = [
   { alias: "Test", billercustomerid: "123456790" },
   { alias: "Test2", billercustomerid: "123456790" },
    { alias: "Test", billercustomerid: "123456790" }
  ]
const BeneficaryAgency=()=>{
    const [user] = getUserHook();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState("");
  const [searchBeneficiary, setSearchBeneficiary] = useState("");
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [categoryList, setCategoryList] = useState("");
  const [categoryItemList, setCategoryItemList] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const [billItemList, setBillItemList] = useState("");
  const [bill, setBill] = useState("");
  const [alias, setAlias] = useState("");
  const [fieldPlaceholder, setFieldPlaceholder] = useState("Phone Number");
  const [editField, setEditField] = useState(true);
  const [onEdit, setOnEdit] = useState(false);
  const [selectEdit, setSelectEdit] = useState("");

  const id = uuid.v4();

//   const resetState = () => {
//     setCategory("");
//     setBillItemList("");
//     setBill("");
//     setError("")
//     setAlias("")
//     setCustomerId("")
//     setFieldPlaceholder("Phone Number");
//   };
  const getbillsBeneficiary = (user) => {
    setLoading(true);
    billsBeneficiaryListAction(user)
      .then((res) => {
        if ((res.status = 200)) {
          setList(res.data);
        } else {
          setError("An error occured");
        }
      })
      .catch((err) => {
        setError(err.message || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  const getBillsCategory = () => {
    setLoading(true);
    billsCategoryAction()
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const getBillsCategoryItem = (id) => {
    setLoading(true);
    billCategoryOptionAction(id)
      .then((res) => {
        setCategoryItemList(res.data);
      })
      .catch((err) => {
      })
      .finally(() => setLoading(false));
  };

  const getBillItem = (id) => {
    setLoading(true);
    billItemsAction(id)
      .then((res) => {
        setBillItemList(res.data.paymentitems);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

//   const deleteBeneficiary = (id) => {
//     setLoading(true);
//     billsBeneficiaryDeleteAction(id)
//       .then((res) => {
//         if (res.status == 200) {
//           getbillsBeneficiary(user);
//           setError("");
//         } else {
//           setError("An error occured, try again later");
//         }
//       })
//       .catch((err) => {
//         setError(err.message || "An error occured, try again later");
//       })
//       .finally(() => setLoading(false));
//   };

//   const editBeneficiarySubmit = (payload) => {
//     const editPayload = { ...payload, alias: alias };
//     setLoading(true);
//     setEditField(true);
//     setOnEdit(false);
//     billsBeneficiaryEditAction(editPayload)
//       .then((res) => {
//         setError("");
//         if (res.status == 204) {
//           getbillsBeneficiary(user);
//           setModalVisible(false);
//           resetState()
//         } else {
//           setModalVisible(false);
//           setError("An error occured, try again later");
//         }
//       })
//       .catch((err) => {
//         const { response, message } = err;
//         setModalVisible(false);
//         setError(
//           response.data.Message ||
//             message ||
//             "An error occured, try again later"
//         );
//       })
//       .finally(() => setLoading(false));
//   };

//   const editBeneficiary = (item) => {
//     setModalVisible(true);
//     setAlias(item.alias);
//     setCustomerId(item.customerid);
//     setEditField(false);
//     setOnEdit(true);
//     setSelectEdit(item);
//   };
  const beneficiaryCard = ({ item }) => {
    return (
      <BeneficiaryListCard
        item={item}
        // onEdit={() => editBeneficiary(item)}
        // onDelete={() => deleteBeneficiary(item.id)}
      />
    );
  };

  console.log(bill, "bill")

  const categoryItem = ({ item }) => {
    return (
      <ListItemCard
        item={item}
        itemName={
          billItemList
            ? item.paymentitemname
            : categoryItemList
            ? item.billername
            : item.categoryname
        }
        onPress={() => selectCategory(item)}
      />
    );
  };

  const selectCategory = (item) => {
    if (!category) {
      getBillsCategoryItem(item.categoryid);
      setCategory(item);
    }

    if (categoryItemList) {
      getBillItem(item.billerid);
      if (item.customerfield1) {
        setFieldPlaceholder(item?.customerfield1);
      }
    }
    if (billItemList) {
      setBill(item);
      setCategoryModal(false);
    }
  };

  useEffect(() => {
    if (user) {
      getbillsBeneficiary(user);
    }
    getBillsCategory();
  }, [user]);

  useEffect(() => {
    if (list) {
      setSearchBeneficiary(list);
    }
  }, [list]);

  const filterBeneficiary = (textToSearch) => {
    setSearchBeneficiary(
      list.filter((item) =>
        item.alias.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
    setSearchText(textToSearch);
  };

  if (loading) {
    return <SpinnerImage bgColor={"white"} />;
  }
  return (
    <View style={GLOBAL_STYLE.backgroundNoPadding}>
      <FlatList
        style={GLOBAL_STYLE.backgroundNoPadding}
        ListHeaderComponentStyle={{ marginHorizontal: "5%" }}
        ListHeaderComponent={
          searchBeneficiary.length > 0 && (
            <Input
              icon={<FontAwesome name="search" size={16} color={COLORS.grey} />}
              placeholder="search"
              value={searchText}
              onChangeText={(text) => filterBeneficiary(text, list)}
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

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          flexDirection: "row",
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
              Create Beneficiaries
            </Text>

            <Text style={[GLOBAL_STYLE.h4, { color: "#C4C4C4" }]}>
              Create New Airtime/ Bills Beneficiary
            </Text>

            <Formik
              initialValues={{
                category: category?.categoryname,
                customerId: customerId,
                alias: alias,
              }}
              enableReinitialize={true}
              validationSchema={onEdit ? validationSchema2 : validationSchema}
              onSubmit={(values) => {
                const payload = {
                  billercustomerid: values.customerId,
                  // billercustomername: "string",
                  paymentitemname: bill.paymentitemname,
                  customerid: values.customerId,
                  alias: values.alias,
                  id: 0,
                  billername: billItemList.billername,
                  paymentitemcode: bill.paymentCode,
                  username: user,
                  reference: id,
                };

                // Keyboard.dismiss();
                setLoading(true);
                {
                  onEdit
                    ? editBeneficiarySubmit(selectEdit)
                    : billsBeneficiaryAddAction(payload)
                        .then((res) => {
                          if (res.status == 200) {
                            setModalVisible(false);
                            getbillsBeneficiary(user);
                            resetState();
                          } else {
                            setError(res.response.data.Message);
                          }
                        })
                        .catch((err) => {
                          setError(err.message || "An error occured");
                        })
                        .finally(() => setLoading(false));
                }
              }}
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
                    {onEdit ? null : (
                      <ModalList
                        placeholder="Select Category"
                        value={values.category}
                        editable={editField}
                        icon={
                          <Pressable
                            onPress={() => {
                              setCategoryModal(true);
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
                              name="chevron-down"
                              size={16}
                              color={COLORS.primaryBlue2}
                            />
                          </Pressable>
                        }
                        visible={categoryModal}
                        onRequestClose={() => setCategoryModal(false)}
                        data={
                          billItemList
                            ? billItemList
                            : categoryItemList
                            ? categoryItemList
                            : categoryList
                        }
                        renderItem={categoryItem}
                        error={errors.bank && touched.bank && errors.bank}
                      />
                    )}
                   

                    <Input
                      value={customerId}
                      keyboardType="numeric"
                      placeholder={fieldPlaceholder}
                      editable={editField}
                      onChangeText={(text) => setCustomerId(text)}
                      // onChangeText={handleChange("customerId")}
                      // onBlur={handleBlur("customerId")}
                      placeholderTextColor={COLORS.primaryBlue}
                      error={
                        errors.customerId &&
                        touched.customerId &&
                        errors.customerId
                      }
                    />

                    <Input
                      value={alias}
                      placeholder="Alias"
                      onChangeText={(text) => setAlias(text)}
                      onBlur={handleBlur("alias")}
                      placeholderTextColor={COLORS.primaryBlue}
                      error={errors.alias && touched.alias && errors.alias}
                    />

                    <CustomButton buttonText="Submit" onPress={handleSubmit} />
                  </View>
                );
              }}
            </Formik>
          </Pressable>
        </Pressable>
      </Modal>
      {/* <CustomSnackBar
        show={error}
        message={error}
        customStyle={styles.snackBar}
      /> */}
    </View>
  );
};



export default BeneficaryAgency