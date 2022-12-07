import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, GLOBAL_STYLE, SIZES } from "../../../constants";
import Checkbox from "expo-checkbox";
import { FontAwesome } from "@expo/vector-icons";
import { formattedAmount } from "../../../utilities/helperFunctions/formatAmount";
import UserDetails from "../../../utilities/hooks/getUserHook";
import uuid from "react-native-uuid";

//formik
import { Formik } from "formik";
import * as yup from 'yup';

//components
import { CustomButton, Input, DropDownInput,AccountCard,CustomSnackBar,SpinnerImage } from "../../../components";

//redux
import { useSelector} from "react-redux";

//axios
import { createNewInvestementAction, getFixedDepositTypes,getFixedDepositProducts,getInterestRate } from "../../../utilities/redux/keyMobile/axiosService/investment";
import NumberFormat from "react-number-format";


const formSchema=yup.object({
  amount: yup.string().required('This field is required'),
  // category: yup.string().required('This field is required'),
  investmentType:yup.string().required('This field is required'),
  investmentProduct:yup.string().required('This field is required'),
  intRate:yup.string().required('This field is required'),
})


const NewInvestment = () => {
  const customerDetails = useSelector((state) => state.auth.user);
  const {accountno}= useSelector((state)=>state.selectedAccount.accountDetails)

  const [loading,setLoading]=useState(false)
  const [user]=UserDetails();
  const refId=uuid.v4();
  const [fixedTypes,setFixedTypes]=useState([]);
  const [productTypes,setProductTypes]=useState([]);
  const [allProductTypes,setAllProductTypes]=useState([]);
  const [specificProductType,setSpecificProductType]=useState({});
  // const [error,setError]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const [fixedAmount, setFixedAmount]=useState("");
  // const [doaCode,setDoaCode]=useState("");
  const [interestRate,setInterestRate]=useState("");
  const [investmentDuration,setInvestmentDuration]=useState(0)
  const [typeValue, setTypeValue]=useState("")
  const [productValue, setProductValue]=useState("")

 

  const getDepositType=()=>{
    setLoading(true)
    getFixedDepositTypes()
      .then((response)=>{
        if(response.status===200){
          const theTypes= response.data.map((item)=>{
            // console.log(item.investmentdescription)
            const innerType={label:item.investmentdescription,value:item.investmenttype}
            return innerType;
          })
          setFixedTypes(theTypes);
        }else{
          setErrorMessage("An error occured")
        }
      })
      .catch((error)=>{
          
          setErrorMessage(error.message)
      })
      .finally(()=>setLoading(false))
  }

  const getProductType=()=>{
    setLoading(true)
    getFixedDepositProducts(typeValue)
      .then((response)=>{
        
        if(response.status===200){
          setAllProductTypes(response.data)
          //this is for the product type dropdown
          const theTypes= response.data.map((item)=>{
            const innerType={label:item.productname,value:item.productcategory}
            return innerType;
          })
          setProductTypes(theTypes)

        }else{
          setErrorMessage("An error occured")
        }
      })
      .catch(()=>{
        
        setErrorMessage(error.message)
      })
      .finally(()=>setLoading(false))
  }

  const getInterest=()=>{
    // console.log('in interest',JSON.stringify(specificProductType) === '{}',!fixedAmount)
    if(JSON.stringify(specificProductType) === '{}' && !fixedAmount)return

    const payload={
      "amount": fixedAmount.replace(/,/, ""),
      "depositCategory": specificProductType.productcategory,
      "currency": "NGN",
      "depositType": specificProductType.producttype
    }

    // return console.log(payload,'payload',specificProductType)
    setLoading(true)
    getInterestRate(payload)
      .then((response)=>{
        // console.log(response,'kimono', response.data)
        if(response.status===200){
          console.log(typeof(response.data.maxRate),'max rate')
          setInterestRate(response.data.maxRate.toString())
          

        }else{
          setErrorMessage("An error occured")
        }
      })
      .catch(()=>{
        console.log(error,'fixed dep error')
        setErrorMessage(error.message)
      })
      .finally(()=>setLoading(false))
  }

  const calcMaturityDate=()=>{
    const todayDate=new Date();
    todayDate.setDate(todayDate.getDate() + Number(specificProductType.duration));//this adds the investment duration to today's date
    
    function calcPeriod(theDate){
      if(theDate<10){
        return `0${theDate}` //this puts a '0' in front of the number if it's less than 10
      }
      return theDate
    }

    const theMonth=calcPeriod(todayDate.getMonth()+1);
    const theDay=calcPeriod(todayDate.getDate())
    const maturityDate=`${todayDate.getFullYear()}${theMonth}${theDay}`
    return maturityDate
  }

  useEffect(()=>{
    getDepositType()
  },[])

  useEffect(()=>{
    if(typeValue.length>0){
      getProductType()
    }
  },[typeValue])

  // useEffect(()=>{
  //   if(specificProductType.length>0 && parseInt(fixedAmount.replace(/,/, ""))>0){
  //     getInterest()
  //   }
  // },[specificProductType,fixedAmount])

  if(loading){
    return <SpinnerImage/>
  }
  
  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobalNopadding}>
      <View style={{paddingVertical:40,}}>
        <AccountCard data={customerDetails.accounts} />
      </View>

      <CustomSnackBar show={errorMessage} message={errorMessage}/>

      <Formik
        initialValues={{
          "amount": fixedAmount,
          "intRate": interestRate,
          "daocode": "",
          investmentType:typeValue,
          investmentProduct:productValue,
        }}
        validationSchema={formSchema}
        enableReinitialize={true}
        onSubmit={(values)=>{
          // console.log(values.amount, "vlaue amount")
          // return console.log(calcMaturityDate())

          const payload={
            "username": user,
            "reference": refId,
            "amount": fixedAmount.replace(/,/, ""),
            "intRate": interestRate,
            "maturityDate": calcMaturityDate(),//confirm this
            "accountNumber": accountno,
            "category": specificProductType.productcategory,
            "daocode": values.daocode
          }

          return console.log(payload,'mimi')
          createNewInvestementAction(payload)
          .then((response)=>{
            console.log(response)
          })
          .catch((error)=>{
            console.log(error.message)
          })
        }}
      >
      {({values,handleChange,handleBlur,handleSubmit,errors,touched})=>{
        return(
          <>
          <View style={{paddingHorizontal:15,}}>
            <DropDownInput  
              placeholder="Select Investment Type"
              data={fixedTypes}
              labelField="label"
              valueField="value"
              value={typeValue}
              // onFocus={() => setIsFocus(true)}
              onChange={item => {
                  setTypeValue(item.value)
                  setInterestRate("")//resets the interest rate
                  }}
              error={errors.investmentType}
            />

            <DropDownInput  
              placeholder="Select product"
              data={productTypes}
              labelField="label"
              valueField="value"
              value={productValue}
              // onFocus={() => setIsFocus(true)}
              onChange={item => {
                  setInterestRate("")//resets the interest rate
                  setProductValue(item.value)//this is to help change the dropdown

                  //this  filters all the product type and picks based on the item value above
                  const theSpecific=allProductTypes.filter((product)=>{
                    return product.productcategory === item.value
                  })

                  setSpecificProductType(theSpecific[0])
                }}
              error={errors.investmentProduct}
            />

            <NumberFormat
              value={fixedAmount}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => (
                <Input 
                  placeholder="Amount"
                  value={value}
                  onChangeText={(text)=>{
                    setFixedAmount(text)
                    // setInterestRate("")//resets the interest rate
                  }}
                  keyboardType="numeric"
                  error={errors.amount}
                />
              )}
            />

            <Input 
              placeholder="Interest Rate"
              value={interestRate}
              editable={false}
              onPressIn={()=>getInterest()}
              error={errors.intRate}
              style={{height:'100%'}}
            />

            <Input 
              placeholder="DAO Code(optional)"
              value={values.daocode}
              // onChange={(text)=>setDoaCode(text)}
              onChangeText={handleChange("daocode")}
            />
          </View>

      <View style={styles.button}>
        <CustomButton
          buttonText={"submit"}
          buttonContainerStyle={{ marginBottom: 20 }}
          onPress={() => handleSubmit()}
        />
      </View>
          </>
        )
      }}

      </Formik>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
  },
  checkContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  button: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "flex-end",
    marginTop: 10,
    paddingHorizontal:15
  },
  inputBox:{
    flexDirection: "row",
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.grey2,
    justifyContent: "space-between",
    backgroundColor: COLORS.grey2,
  },
});

export default NewInvestment;
