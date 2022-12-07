import { useState } from "react";
import { StyleSheet,View,Text,TouchableOpacity } from "react-native";
import { GLOBAL_STYLE,COLORS } from "../constants";
import {  Ionicons } from "@expo/vector-icons";


//components
import DropDownInput from "./DropDownInput";
import Input from "./Inputs";
import InputsDouble from "./InputsDouble";

//THE COMPONENT IS DESIGNED TO WORK INSIDE FORMIK
//"values,handleBlur,handleChange,handleSubmit, errors" ARE COMING FROM FORMIK
//SEE 'RegistrationWelcome.js' FOR AN EXAMPLE OF HOW IT SHOULD BE IMPORTED INTO YOUR PROJECT

const AuthenticationDropDown=(props)=>{
    const {
      values,
      dropDownOptions,
      handleBlur,
      handleChange,
      handleSubmit,
      errors,
      setUsingDebitCard,
      setUsingToken,
      setIsUsingOTP,
      setUsingPin,
      containerStyle,
      fullPanDetails,
      setIsVerificationPicked
    }=props;
    const [value,setValue]=useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [valueLabel,setValueLabel]=useState("");
    const [secureInput, setSecureInput]=useState(true);
    

    return(
        <View style={{...containerStyle}}>
          <DropDownInput
                
                data={dropDownOptions}
                labelCustomStyle={styles.inputLabel}
                labelField="label"
                valueField="label"
                placeholder="Select Verification Option"
                value={value}
                onFocus={() => setIsFocus(true)}
                onChange={item => {
                    setValue(item.value);
                    setValueLabel(item.label) //this makes the debit or token area show
                    setIsVerificationPicked(true)

                    //this tells the parent what label has been picked
                    if(item.label==='Debit Card'){
                      setUsingDebitCard(true)
                      setUsingToken(false)
                      setIsUsingOTP(false)
                      setUsingPin(false)
                    }else if(item.label==='Hard or Soft Token'){
                      setUsingDebitCard(false)
                      setUsingToken(true)
                      setIsUsingOTP(false)
                      setUsingPin(false)
                    }else if(item.label==='SMS OTP'){
                      setUsingDebitCard(false)
                      setUsingToken(false)
                      setIsUsingOTP(true)
                      setUsingPin(false)
                    }else {
                      setUsingDebitCard(false)
                      setUsingToken(false)
                      setIsUsingOTP(false)
                      setUsingPin(true)
                    }
                    }}
                placeholderStyle={[GLOBAL_STYLE.h3, { color: COLORS.grey}]}
            />
            {errors.isVerificationPicked && <Text style={{color:COLORS.error,fontSize:12}}>{errors.isVerificationPicked}</Text>}
                    {
                      //this shows when user chooses Debit Card
                      valueLabel==='Debit Card' && (
                      <>
                          <Input
                              placeholder={fullPanDetails ? 'Full Card Number' : 'Last 6 Card Digits'}
                              placeholderTextColor={COLORS.grey}
                              inputCustomStyle={{borderWidth:0.3}}
                              value={values.cardNumber}
                              onChangeText={handleChange('cardNumber')}
                              keyboardType='numeric'
                              onBlur={handleBlur('cardNumber')}
                              error={ errors.cardNumber}
                          />

                          {fullPanDetails && <InputsDouble>
                              <Input
                                  placeholder={'MM/YYYY'}
                                  placeholderTextColor={COLORS.grey}
                                  inputCustomStyle={{borderWidth:0.3}}
                                  value={values.cardMonthYear}
                                  onChangeText={handleChange('cardMonthYear')}
                                  onBlur={handleBlur('cardMonthYear')}
                                  error={ errors.cardMonthYear}
                              />
                              <Input
                                  placeholder={'CVV'}
                                  placeholderTextColor={COLORS.grey}
                                  inputCustomStyle={{borderWidth:0.3}}
                                  value={values.cardCVV}
                                  onChangeText={handleChange('cardCVV')}
                                  keyboardType='numeric'
                                  onBlur={handleBlur('cardCVV')}
                                  error={ errors.cardCVV}
                              />
                          </InputsDouble>}

                          {fullPanDetails && <Input
                              placeholder={'Card Pin'}
                              placeholderTextColor={COLORS.grey}
                              secureTextEntry={secureInput}
                              inputCustomStyle={{borderWidth:0.3}}
                              icon={
                                  secureInput ? (
                                    <TouchableOpacity
                                      style={{
                                        width: 40,
                                        height: 40, 
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                      onPress={() => setSecureInput(!secureInput)}
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
                                      onPress={() => setSecureInput(!secureInput)}
                                    >
                                      <Ionicons
                                        name="eye-off"
                                        size={16}
                                        color={COLORS.grey}
                                        
                                      />
                                    </TouchableOpacity>
                                  )
                                }
                              value={values.cardPin}
                              onChangeText={handleChange('cardPin')}
                              keyboardType='numeric'
                              onBlur={handleBlur('cardPin')}
                              error={ errors.cardPin}
                          />}
                          
                      </>
                      )
                    }
                    {
                        //this shows when user chooses token
                        valueLabel==='Hard or Soft Token' && (
                            <>
                            <Input
                                placeholder={'Enter Token'}
                                placeholderTextColor={COLORS.grey}
                                inputCustomStyle={{borderWidth:0.3}}
                                value={values.token}
                                onChangeText={handleChange('token')}
                                keyboardType='numeric'
                                onBlur={handleBlur('token')}
                                error={ errors.token}
                            />
                            </>
                        )
                      }
                    {
                        //this shows when user chooses SMS Token
                        valueLabel==='SMS OTP' && (
                            <>
                            <Input
                                placeholder={'Enter SMS OTP'}
                                placeholderTextColor={COLORS.grey}
                                inputCustomStyle={{borderWidth:0.3}}
                                value={values.OTP}
                                onChangeText={handleChange('OTP')}
                                keyboardType='numeric'
                                onBlur={handleBlur('OTP')}
                                error={ errors.OTP}
                            />
                            </>
                        )
                      }
                    {
                        //this shows when user chooses Pin
                        valueLabel==='Pin' && (
                            <>
                            <Input
                                placeholder={'Enter Pin'}
                                placeholderTextColor={COLORS.grey}
                                inputCustomStyle={{borderWidth:0.3}}
                                value={values.Pin}
                                onChangeText={handleChange('Pin')}
                                keyboardType='numeric'
                                onBlur={handleBlur('Pin')}
                                error={ errors.Pin}
                                secureTextEntry={secureInput}
                                icon={
                                  secureInput ? (
                                    <TouchableOpacity
                                      style={{
                                        width: 40,
                                        height: 40, 
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                      onPress={() => setSecureInput(!secureInput)}
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
                                      onPress={() => setSecureInput(!secureInput)}
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
                            </>
                        )
                      }
            
        </View>
    )
}

export default AuthenticationDropDown

const styles= StyleSheet.create({

})

