import {useState} from 'react'
import { StyleSheet,View,Text,TouchableOpacity,Keyboard,TouchableWithoutFeedback } from "react-native";
import { COLORS,GLOBAL_STYLE } from "../../../constants";
import { AntDesign,Ionicons } from '@expo/vector-icons';
import TopBarCalc from "./TopBarCalc";
import { customerOnboardingAction } from '../../../utilities/redux/keyMobile/axiosService/registerClientAction';

//formik
import { Formik, useFormik } from "formik";
import * as yup from 'yup';

//components
import { CustomButton,Input } from "../../../components";

const RegistrationCompleting=({navigation})=>{
    const [passwordSecureInput,setPasswordSecureInput]=useState(true)
    const [confirmPassSecureInput,setConfirmPassSecureInput]=useState(true)
    const [pinSecureInput,setPinSecureInput]=useState(true)
    const [confirmPinInput,setConfirmPinInput]=useState(true)


    //the schemas for Formik
    const formSchema= yup.object({
      username: yup.string().required()
          .matches(
            /^[a-zA-Z0-9]+$/,
            "This field cannot contain white space and special character"
          ),
      password: yup.string().required('This field is required')
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            "Not less than 8 characters that inlcudes one uppercase, one lowercase, one special character, and one number"
          ).min(8),
      confirmPassword: yup.string().required('This field is required'),
      pin: yup.string().required()
          .min(4,'Enter only 4 digits')
          .max(4,'Enter only 4 digits'),
      confirmPin: yup.string().required('This field is required'),
      OTP: yup.string().required('This field is require').min(4),
          
  })


    return(
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={{flex:1}}>
            {/* <View style={{height:5, backgroundColor:COLORS.primaryBlue2, width:`${TopBarCalc(3)}%`}}/> */}

            <View style={styles.container}>
                <Text style={[GLOBAL_STYLE.h1,{textAlign:'center'}]}>Customer Authentication</Text>

                <Formik
                      initialValues={{
                          username:'',
                          password:'',
                          confirmPassword:'',
                          pin:'',
                          confirmPin:'',
                          OTP:''
                      }}
                      validationSchema={formSchema}
                      onSubmit={(values)=>{
                        const payload={
                          "appversion": "string",
                          "mobiledevicedetails": "string",
                          "source": "string",
                          "username": "string",
                          "password": "string",
                          "transactionpin": "string",
                          "mobiledeviceid": "string",
                          "deviceserial": "string",
                          "deviceplatform": "string",
                          "deviceversion": "string",
                          "userversion": "string",
                          "devicemanufacturer": "string",
                          "EnrolmentID": 0,
                          "ProfilePix": "string",
                          "Otp": "string"
                        }

                        customerOnboardingAction(payload)
                         .then((res)=>{
                          
                         })
                        return navigation.navigate('RegistrationCompleted')

                        // return usingDebitCard ? navigation.navigate('RegistrationCompleting') :navigation.navigate('RegistrationOTP')
                      }}
                    >
                    {({values,handleBlur,handleChange,handleSubmit,errors,touched})=>{
                      return(
                      <>
                      <Input
                        placeholder={'Enter your username'}
                        inputCustomStyle={{borderWidth:0.3}}
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        error={ errors.username}
                        icon={<AntDesign name="user" size={16} color={COLORS.grey} />}
                    />
                    <Input
                        placeholder={'Enter Password'}
                        inputCustomStyle={{borderWidth:0.3}}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={ errors.password}
                        secureTextEntry={passwordSecureInput}
                        icon={
                            passwordSecureInput ? (
                              <TouchableOpacity
                                style={{
                                  width: 40,
                                  height: 40,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onPress={() => setPasswordSecureInput(!passwordSecureInput)}
                              >
                                <Ionicons
                                  name="eye"
                                  size={16}
                                  color={COLORS.grey}
                                  
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                style={{
                                  width: 40,
                                  height: 40,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onPress={() => setPasswordSecureInput(!passwordSecureInput)}
                              >
                                <Ionicons
                                  name="eye-off"
                                  size={16}
                                  color={COLORS.grey}
                                  
                                />
                              </TouchableOpacity>
                            )
                          }
                    />
                    <Input
                        placeholder={'Confirm Password'}
                        inputCustomStyle={{borderWidth:0.3}}
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        error={ errors.confirmPassword}
                        secureTextEntry={confirmPassSecureInput}
                        icon={
                            confirmPassSecureInput ? (
                              <TouchableOpacity
                                style={{
                                  width: 40,
                                  height: 40,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onPress={() => setConfirmPassSecureInput(!confirmPassSecureInput)}
                              >
                                <Ionicons
                                  name="eye"
                                  size={16}
                                  color={COLORS.grey}
                                  
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                style={{
                                  width: 40,
                                  height: 40,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onPress={() => setConfirmPassSecureInput(!confirmPassSecureInput)}
                              >
                                <Ionicons
                                  name="eye-off"
                                  size={16}
                                  color={COLORS.grey}
                                  
                                />
                              </TouchableOpacity>
                            )
                          }
                    />
                    <Input
                        placeholder={'PIN'}
                        inputCustomStyle={{borderWidth:0.3}}
                        value={values.pin}
                        onChangeText={handleChange('pin')}
                        onBlur={handleBlur('pin')}
                        error={ errors.pin}
                        secureTextEntry={pinSecureInput}
                        keyboardType='numeric'
                        icon={
                          pinSecureInput ? (
                            <TouchableOpacity
                              style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => setPinSecureInput(!pinSecureInput)}
                            >
                              <Ionicons
                                name="eye"
                                size={16}
                                color={COLORS.grey}
                                
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => setPinSecureInput(!pinSecureInput)}
                            >
                              <Ionicons
                                name="eye-off"
                                size={16}
                                color={COLORS.grey}
                                
                              />
                            </TouchableOpacity>
                          )
                        }
                    />
                    <Input
                        placeholder={'Confirm PIN'}
                        inputCustomStyle={{borderWidth:0.3}}
                        value={values.confirmPin}
                        onChangeText={handleChange('confirmPin')}
                        onBlur={handleBlur('confirmPin')}
                        error={ errors.confirmPin}
                        secureTextEntry={confirmPinInput}
                        icon={
                          confirmPinInput ? (
                            <TouchableOpacity
                              style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => setConfirmPinInput(!confirmPinInput)}
                            >
                              <Ionicons
                                name="eye"
                                size={16}
                                color={COLORS.grey}
                                
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{
                                width: 40,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onPress={() => setConfirmPinInput(!confirmPinInput)}
                            >e
                              <Ionicons
                                name="eye-off"
                                size={16}
                                color={COLORS.grey}
                                
                              />
                            </TouchableOpacity>
                          )
                        }
                    />

                    <Input
                      placeholder={'Enter OTP'}
                      placeholderTextColor={COLORS.grey}
                      inputCustomStyle={{borderWidth:0.3}}
                      value={values.OTP}
                      onChangeText={handleChange('OTP')}
                      keyboardType='numeric'
                      onBlur={handleBlur('OTP')}
                      error={ errors.OTP}
                    />
                    

                    <Text style={[GLOBAL_STYLE.h4,{textAlign:'center'}]}>By clicking on the continue button, you are acknowledging to
                        <Text style={{color:COLORS.danger}} > our terms </Text> 
                        and <Text style={{color:COLORS.danger}} >conditions</Text>
                    </Text>


                    <View style={{flex:1}}/>
                    <CustomButton
                        buttonText={'SUBMIT'}
                        onPress={()=>navigation.navigate('RegistrationCompleted')}
                    />
                      </>
                      )
                    }}
                    </Formik>
                
            </View>
        </View>
    </TouchableWithoutFeedback>
    )
}

export default RegistrationCompleting;

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white,
        paddingHorizontal:20,
        paddingVertical:45,
    }
})

