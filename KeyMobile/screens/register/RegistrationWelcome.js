import { useState } from "react";
import {StyleSheet,ScrollView, View, Text,TouchableOpacity,TextInput,Button,Keyboard, TouchableWithoutFeedback } from "react-native";
import { GLOBAL_STYLE,COLORS } from "../../../constants";
import { Feather } from '@expo/vector-icons';
import TopBarCalc from "./TopBarCalc";

//formik
import { Formik, useFormik } from "formik";
import * as yup from 'yup';

//components
import { CustomButton,Input,CustomSnackBar,DropDownInput,AuthenticationDropDown } from "../../../components";
import ToggleSwitch from "toggle-switch-react-native";
import { HouseIcon } from "../../../constants/icons";

//data/backend fetching
import { registerClientAction } from "../../../utilities/redux/keyMobile/axiosService/registerClientAction";


const RegistrationWelcome=({navigation})=>{
    const [usingDebitCard,setUsingDebitCard]=useState(false);
    const [usingToken,setUsingToken]=useState(false);
    const [error,setError]=useState('');
    const [value, setValue]=useState(null)


    //the schemas for Formik
    //for token
    const formSchema= yup.object({
        accountNumber: yup.string().required('This field is required')
            .min(10,'Enter only 10 digits in the field')
            .max(10,'Enter only 10 digits in the field'),
        bvn: yup.string().required('This field is required')
            .min(11,'Enter only 11 digits in the field')
            .max(11,'Enter only 11 digits in the field'),
        OTP: yup.string().required('This field is required')
            .min(4,'Enter only 4 digits in the field')
            .max(4,'Enter only 4 digits in the field'),
        token: yup.string().required('This field is required')
            .min(6,'Enter only 4 digits in the field')
            .max(6,'Enter only 4 digits in the field'),
    })

    //for card
    const formSchema2= yup.object({
        accountNumber: yup.string().required('This field is required')
            .min(10,'Enter only 10 digits in the field')
            .max(10,'Enter only 10 digits in the field'),
        bvn: yup.string().required('This field is required')
            .min(11,'Enter only 11 digits in the field')
            .max(11,'Enter only 11 digits in the field'),
        cardNumber: yup.string().required('This is required')
            .min(16,'Enter only 16 digits in the field')
            .max(16,'Enter only 16 digits in the field'),
        cardMonthYear: yup.string().required('This is required')
            .min(7,'Enter expected digits')
            .max(7,'Enter expected digits'),
        cardCVV: yup.string().required('This is required')
            .min(3,'Enter only 3 digits')
            .max(3,'Enter only 3 digits'),
        cardPin: yup.string().required('This is required')
            .min(4,'Enter only 4 digits')
            .max(4,'Enter only 4 digits'),
    })


    return( 
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <ScrollView style={{flex:1,backgroundColor:COLORS.white}}>
            {/* <View style={{height:5, backgroundColor:COLORS.primaryBlue2, width:`${TopBarCalc(1)}%`}}/> */}

            <View style={styles.container}>
                <Text style={[GLOBAL_STYLE.h1,{textAlign:'center'}]}>Customer Authentication</Text>
                    <Formik
                        initialValues={{
                            bvn:'',
                            accountNumber:'',
                            cardNumber:'',
                            cardPin:'',
                            cardMonthYear:'',
                            cardCVV:'',
                            OTP:'',
                            token:''
                        }}
                        validationSchema={usingDebitCard ? formSchema2 : formSchema}
                        onSubmit={(values,{ resetForm })=>{
                            const payload={
                                "source": "mobile",
                                "nubanAccount": values.accountNumber,
                                "Last6Digit": values.cardNumber
                            }
                            console.log('see')
                            return navigation.navigate('RegistrationCompleting')

                            //if the user does uses a DEBIT CARD
                            if(usingDebitCard){
                                console.log('mama')

                                registerClientAction(payload)
                                  .then((res) => {
                                  console.log(res,'resss')
                                  if (res?.data?.responseCode == "00") {
                                    navigation.navigate('RegistrationCompleting')
                                  } else {
                                    //this shows if the responseCode is not "00" and also not an error
                                    console.log(res, "error resssss-")
                                    //   console.log(res.data.ResponseMessage,'main',res.data.ResponseCode)
                                    //   setError(res.data.ResponseMessage)
                                      
                                  }
                                  })
                                  .catch((err) => {
                                    console.log(err.response.data, "error")
                                    Keyboard.dismiss()
                                    setError(
                                        err.response.data.Message || "An error occured"
                                    );
                                  })
                                
                            }else{
                                //if the user uses TOKEN
                                      registerClientAction(payload)
                                        .then((res) => {
                                        console.log(res.data)
                                        if (res?.data?.responseCode == "00") {
                                            navigation.navigate('RegistrationOTP')
                                        } else {
                                            console.log(res.data.ResponseMessage,'main',res.data.ResponseCode)
                                            setError(res.data.ResponseMessage)
                                            
                                        }
                                        })
                                        .catch((err) => {
                                          setError(
                                            res.data.ResponseDescription || "An error occured"
                                          );
                                        })
    
                                }

                            // resetForm();//don't forget to reimplement after integration
                           
                            
                          // return usingDebitCard ? navigation.navigate('RegistrationCompleting') :navigation.navigate('RegistrationOTP')
                        }}
                    >
                        {({values,handleBlur,handleChange,handleSubmit,errors,touched})=>{

                            return(
                            <View>
                                <View style={{marginVertical:40}}>
                                    <Input
                                        placeholder={'BVN'}
                                        placeholderTextColor={COLORS.grey}
                                        inputCustomStyle={{borderWidth:0.3}}
                                        icon={<Feather name="hash" size={16} color={COLORS.grey} />}
                                        value={values.bvn}
                                        onChangeText={handleChange('bvn')}
                                        keyboardType='numeric'
                                        onBlur={handleBlur('bvn')}
                                        error={ errors.bvn}
                                    />
                                    <Input
                                        placeholder={'Enter NUBAN Account Number'}
                                        placeholderTextColor={COLORS.grey}
                                        inputCustomStyle={{borderWidth:0.3}}
                                        icon={<Feather name="hash" size={16} color={COLORS.grey} />}
                                        value={values.accountNumber}
                                        onChangeText={handleChange('accountNumber')}
                                        keyboardType='numeric'
                                        onBlur={handleBlur('accountNumber')}
                                        error={ errors.accountNumber}
                                    />

                                    <AuthenticationDropDown
                                        values={values}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        handleSubmit={handleSubmit}
                                        errors={errors}
                                        usingDebitCard={usingDebitCard}
                                        setUsingDebitCard={setUsingDebitCard}
                                        setUsingToken={setUsingToken}
                                        dropDownOptions={[{label:'Debit Card',value:'Debit Card'}]}
                                    />
            
                                </View>
            
                                <CustomButton
                                    buttonText={'CONTINUE'}
                                    onPress={handleSubmit}
                                    buttonContainerStyle={{marginBottom:90}}
                                />
                            </View>
                            )
                        }}
                    </Formik>

                

                <TouchableOpacity onPress={()=>navigation.navigate("account opening")}>
                    <View style={{flexDirection:'row',marginBottom:20, justifyContent:'center'}}>
                        <HouseIcon/>
                        <Text style={[GLOBAL_STYLE.h4,{color:COLORS.primaryBlue2}]}>Open Account</Text>
                    </View>
                </TouchableOpacity>
                
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={[GLOBAL_STYLE.h4,{color:COLORS.grey,textAlign:'center'}]}>Have an account? </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("key mobile")}>
                        <Text style={[GLOBAL_STYLE.h4Bold,{color:'black'}]}>Login here</Text>
                    </TouchableOpacity>
                </View>
                
                <CustomSnackBar show={error} message={error} />
                
            </View>
            
        </ScrollView>
    </TouchableWithoutFeedback>
    )
}

export default RegistrationWelcome;

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white,
        paddingHorizontal:20,
        paddingVertical:50,
    }
})



