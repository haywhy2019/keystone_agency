import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { GLOBAL_STYLE, COLORS } from "../../../../constants";
import {
  AccountCard,
  CustomButton,
  DropDownInput,
  Input,
} from "../../../../components";
import { DailySingleLimitSlide } from "../../../components";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import NumberFormat from "react-number-format";
import ToggleSwitch from "toggle-switch-react-native";

const validationSchema = Yup.object().shape({
  phone: Yup.string().required("Required"),
  transferNumber: Yup.object().required("Required"),
});
const SendForeign2 = ({ navigation }) => {
  const { accounts, bvn } = useSelector((state) => state.auth.user);
  const [useBeneficiary, setUseBeneficiary] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start", marginTop: 10 },
      ]}
    >
      <AccountCard data={accounts} />

      <Formik
        initialValues={{
          title: "",
          amount: "",
          transferNumber: "",
        }}
        enableReinitialize={true}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          navigation.navigate("Home");
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
                <Input
                  placeholder="Benefiaicry name"
                  value={values.title}
                  //   onBlur={handleBlur("phone")}
                  //   onChangeText={handleChange("phone")}
                  placeholderTextColor={COLORS.primaryBlue}
                  error={errors.title && touched.title && errors.title}
                />

                <Input
                  placeholder="Destination Bank Swift code"
                  value={values.title}
                  //   onBlur={handleBlur("phone")}
                  //   onChangeText={handleChange("phone")}
                  placeholderTextColor={COLORS.primaryBlue}
                  error={errors.title && touched.title && errors.title}
                />
                <Input
                  placeholder="Destination bank Address"
                  value={values.title}
                  //   onBlur={handleBlur("phone")}
                  //   onChangeText={handleChange("phone")}
                  placeholderTextColor={COLORS.primaryBlue}
                  error={errors.title && touched.title && errors.title}
                />
                <Input
                  placeholder="Narration"
                  value={values.title}
                  //   onBlur={handleBlur("phone")}
                  //   onChangeText={handleChange("phone")}
                  placeholderTextColor={COLORS.primaryBlue}
                  error={errors.title && touched.title && errors.title}
                />
                {/* <DropDownInput
                  data={[
                    { label: "pounds" },
                    { label: "dollars" },
                    { label: "yen" },
                    { label: "cedes " },
                  ]}
                  labelCustomStyle={styles.inputLabel}
                  labelField="label"
                  valueField="label"
                  placeholder="Credit currency"
                  value={values.transferNumber.label}
                  placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                  // onChange={(text) => setFieldValue("transferNumber",text)}
                  error={
                    errors.transferNumber &&
                    touched.transferNumber &&
                    errors.transferNumber
                  }
                /> */}
                <Input
                  placeholder="Account Number/Iban"
                  value={values.title}
                  onBlur={handleBlur("phone")}
                  onChangeText={handleChange("phone")}
                  placeholderTextColor={COLORS.primaryBlue}
                  error={errors.title && touched.title && errors.title}
                />
                <Input
                  placeholder="Amount"
                  value={values.title}
                  //   onBlur={handleBlur("phone")}
                  //   onChangeText={handleChange("phone")}
                  placeholderTextColor={COLORS.primaryBlue}
                  error={errors.title && touched.title && errors.title}
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

              <CustomButton buttonText={"Continue"} onPress={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default SendForeign2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    marginBottom: 20,
    flex: 1,
    justifyContent: "space-between",
  },
});
