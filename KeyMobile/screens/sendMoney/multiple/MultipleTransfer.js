import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import NumberFormat from "react-number-format";
import { Input, CustomButton, TwoFactorAuth, AccountCard } from "../../../../components";
import { useState } from "react";
import { GLOBAL_STYLE, COLORS, SIZES } from "../../../../constants";
import ToggleSwitch from "toggle-switch-react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { DailySingleLimitSlide } from "../../../components";
import { useSelector } from "react-redux";


const validationSchema = Yup.object().shape({
  accountNo: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
});
const MultipleTransfer = ({ navigation,route }) => {
  const { title, number } = route.params;
  const [currentStep, setCurrentStep] = useState(1);
  const [useBeneficiary, setUseBeneficiary] = useState(false);
  const [addBeneficiary, setAddBeneficiary] = useState(false);
 
  const {
    accounts,
  } = useSelector((state) => state.auth.user);
  const toggleAddBeneficiary = () => setAddBeneficiary(!addBeneficiary);
  const toggleModal = () => {
    if (useBeneficiary) {
      setUseBeneficiary(false);
      setTransferType("");
      SetBeneficiaryAcct("");
      setCrAccountName("");
      setBankName("");
    } else {
      setUseBeneficiary(true);
      setModalVisible(!modalVisible);
    }
  };

  const MultiForm = () => {
    return (
      <Formik
        initialValues={{
          accountNo: "",
          amount: "",
          narration: "",
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            navigation.navigate("MultipleSummary");

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
            <View style={styles.container}>
                
              <View>
                <Input
                  placeholder="Beneficiary Account"
                  value={values.accountNo}
                  onBlur={handleBlur("accountNo")}
                  onChangeText={handleChange("accountNo")}
                  placeholderTextColor={COLORS.primaryBlue}
                  keyboardType="numeric"
                  error={errors.accountNo && touched.accountNo && errors.accountNo}
                />
                <NumberFormat
                  value={values.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (
                    <Input
                      placeholder="Enter amount"
                      onChangeText={handleChange("amount")}
                      value={value}
                      placeholderTextColor={COLORS.primaryBlue}
                      error={errors.amount && touched.amount && errors.amount}
                      onBlur={handleBlur("amount")}
                      keyboardType="numeric"
                      icon={
                        <Text style={{ color: COLORS.primaryBlue2 }}>
                          {"\u20A6"}
                        </Text>
                      }
                    />
                  )}
                />
                <Input
                  placeholder="Narration"
                  value={values.narration}
                  onBlur={handleBlur("narration")}
                  onChangeText={handleChange("narration")}
                  placeholderTextColor={COLORS.primaryBlue}
                  error={errors.narration && touched.narration && errors.narration}
                />
                <View
                  style={[GLOBAL_STYLE.rowBetween, styles.selectBeneficiary]}
                >
                  <ToggleSwitch
                    isOn={useBeneficiary}
                    onColor={COLORS.primaryBlue}
                    offColor={COLORS.grey}
                    label="Select Beneficiary"
                    labelStyle={GLOBAL_STYLE.h4}
                    size="small"
                    onToggle={toggleModal}
                  />
                </View>
              </View>

              <CustomButton buttonText={"Continue"} 
              onPress={handleSubmit} 
              disable={currentStep == number ? false: true}
            //   buttonContainerStyle={{marginVertical: 20}}
              />
            </View>
          );
        }}
      </Formik>
    );
  };

  const FormHeader = () => (
    <View>
    <View style={[GLOBAL_STYLE.rowBetween, { marginVertical: 10 , paddingHorizontal: "5%",}]}>
      <Text style={GLOBAL_STYLE.h4Bold}>Swipe to next page</Text>
      <Text style={GLOBAL_STYLE.h4Bold}>
        {currentStep}/{number}
      </Text>
    
    </View>
    <AccountCard data={accounts}/>
    <View style={{ paddingHorizontal: "5%",}}>
    <DailySingleLimitSlide />
    </View>
   
    </View>
  );
  const swipeFromLeftOpen = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const swipeFromRightOpen = () => {
    if (currentStep < number) {
      setCurrentStep(currentStep + 1);
    }
  };

  //   const leftAction = () => {
  //     setCurrentStep(-currentStep)
  //   };
  //   const rightAction = () => {
  //     console.log("right");
  //     setCurrentStep(+currentStep)
  //   };

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      ListHeaderComponent={FormHeader}
      data={number}
      // renderItem={renderMultiForm}
      renderItem={(item) => (
        <Swipeable
          renderLeftActions={MultiForm}
          renderRightActions={MultiForm}
          onSwipeableRightOpen={swipeFromRightOpen}
          onSwipeableLeftOpen={swipeFromLeftOpen}
          containerStyle={{
            flex: 1,
          }}
          childrenContainerStyle={{
            // flexGrow: 1,
     
          }}
        >
          <MultiForm />
        </Swipeable>
      )}
      style={{
       
        backgroundColor: COLORS.white,
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default MultipleTransfer;

const styles = StyleSheet.create({
  selectBeneficiary: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20
  },
  container: {
    flex: 1,
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
});
