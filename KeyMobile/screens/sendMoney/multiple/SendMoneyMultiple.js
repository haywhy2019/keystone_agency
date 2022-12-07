import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { GLOBAL_STYLE, COLORS } from "../../../../constants";
import { AccountCard, CustomButton, DropDownInput, Input } from "../../../../components";
import { DailySingleLimitSlide } from "../../../components";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  transferNumber: Yup.object().required("Required"),
});
const SendMoneyMultiple = ({navigation}) => {
  const { accounts, bvn } = useSelector((state) => state.auth.user);
  return (
    <ScrollView contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobalNopadding, {justifyContent: "flex-start",marginTop: 10}]}>
      {/* <AccountCard data={accounts} /> */}
    
      <Formik
        initialValues={{
            title: "",
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
            {/* <DailySingleLimitSlide /> */}
              <Input placeholder="Tansfer title" 
              value={values.title}
              onBlur={handleBlur("title")}
              onChangeText={handleChange("title")}
              placeholderTextColor={COLORS.primaryBlue}
              error={
                errors.title &&
                touched.title &&
                errors.title
              }
              />
              <DropDownInput
                data={[
                  { label: "1" },
                  { label: "2" },
                  { label: "3" },
                  { label: "4 "},
                  { label:" 5 "},
                  { label: "6 "},
                  // { label: "7" },
                  // { label: "8" },
                  // { label: "9" },
                  // { label: "10" },
                ]}
                labelCustomStyle={styles.inputLabel}
                labelField="label"
                valueField="label"
                placeholder="Select number of transfer"
                value={values.transferNumber.label}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                onChange={(text) => setFieldValue("transferNumber",text)
    
                }
                error={
                    errors.transferNumber &&
                    touched.transferNumber &&
                    errors.transferNumber
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

export default SendMoneyMultiple;

const styles = StyleSheet.create({
    container: { paddingHorizontal: "5%", marginBottom: 20 ,  flex: 1, justifyContent: "space-between"}
});
