import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { GLOBAL_STYLE, COLORS } from "../../../constants";
import { AccountCard, CustomButton, DropDownInput, Input } from "../../../components";
import { DailySingleLimitSlide } from "../../components";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import NumberFormat from "react-number-format";
import ToggleSwitch from "toggle-switch-react-native";



const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Required"),
  transferNumber: Yup.object().required("Required"),
});
const SendPhone = ({navigation}) => {
  const { accounts, bvn } = useSelector((state) => state.auth.user);
  return (
    <ScrollView contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobalNopadding, {justifyContent: "flex-start",marginTop: 10}]}>
      <AccountCard data={accounts} />
    
      <Formik
        initialValues={{
            title: "",
            amount: "",
            transferNumber: ""
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          navigation.navigate("MultipleTransfer",{title: values.title, number: values.transferNumber.label})
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
            <DailySingleLimitSlide />
              <Input placeholder="Enter Phone number" 
              value={values.title}
              onBlur={handleBlur("phone")}
              onChangeText={handleChange("phone")}
              placeholderTextColor={COLORS.primaryBlue}
              error={
                errors.title &&
                touched.title &&
                errors.title
              }
              />

<View style={[GLOBAL_STYLE.rowBetween, styles.selectBeneficiary]}>
                <ToggleSwitch
                //   isOn={useBeneficiary}
                  onColor={COLORS.primaryBlue}
                  offColor={COLORS.grey}
                  label="Select Beneficiary"
                  labelStyle={GLOBAL_STYLE.h4}
                  size="small"
                //   onToggle={toggleModal}
                />
              </View>
              <Input placeholder="Beneficiary Name" 
              value={values.title}
              onBlur={handleBlur("phone")}
              onChangeText={handleChange("phone")}
              placeholderTextColor={COLORS.primaryBlue}
              error={
                errors.title &&
                touched.title &&
                errors.title
              }
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
                   <Input placeholder="Naration" 
              value={values.title}
              onBlur={handleBlur("narration")}
              onChangeText={handleChange("narration")}
              placeholderTextColor={COLORS.primaryBlue}
              error={
                errors.title &&
                touched.title &&
                errors.title
              }
              />
                      <Input placeholder="Enter PIN" 
              value={values.title}
              onBlur={handleBlur("narration")}
              onChangeText={handleChange("narration")}
              placeholderTextColor={COLORS.primaryBlue}
              error={
                errors.title &&
                touched.title &&
                errors.title
              }
              />
            </View>
             

              <CustomButton 
              buttonText={"Continue"}
              onPress={handleSubmit}
              
              />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default SendPhone;

const styles = StyleSheet.create({
    container: { paddingHorizontal: "5%", marginBottom: 20 ,  flex: 1, justifyContent: "space-between"}
});
