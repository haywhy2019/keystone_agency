import { StyleSheet, Text, View , ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Input, DatePicker, CustomButton , SpinnerImage, BottomNotification, CustomSnackBar, DropDownInput} from "../../../components";
import { GLOBAL_STYLE , COLORS, isAndroid} from "../../../constants";
import { useSelector } from "react-redux";
import moment from "moment";
import { enquiresAction } from "../../../utilities/redux/keyMobile/axiosService/enquiries";


const Enquiries = ({navigation}) => {

  const[name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [userEmail, setuserEmail] = useState("")
  const [date, setDate] = useState(new Date())
  const [comment, setComment] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [error, setError] = useState({})
  const {CustomerName,email,phoneno } = useSelector(state => state.auth.user)
 const [success, setSuccess] = useState(false)
 const [sendError, setSendError] = useState(false)
 const [type, setType] = useState("")
 useEffect(() => {
  setName(CustomerName)
  setuserEmail(email)
  setPhoneNo(phoneno)
},[])

const selectedAccount = useSelector(
  (state) => state.selectedAccount.accountDetails.accountno
);

const payload = {
  id: 0,
  FeedbackType: type,
  customername: name,
  entrydate: date,
  phone: phoneNo,
  email: userEmail,
  comment: comment,
  accountno: selectedAccount,
  source: "mobile"

}

const submitHandler = () => {
  if(!comment){
   return setError({comment:"message cannot be empty"})
  }
  setError("")
  setLoading(true)
 enquiresAction(payload)
 .then(res => {

   if(res.status == 200){
     setSuccess(res.data)
     setTimeout(() => navigation.goBack(), 3000)

   }else {
     setSendError("An error occured. try again")
   }
 
 })
 .catch(err => {
   setSendError(err.message || "An error occured. try again")
 }).finally(() => setLoading(false))
 }

 if(loading){
   return <SpinnerImage />
 }
  return (
    <View style={{flex: 1}}>
    <ScrollView contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobalNopadding, {justifyContent: 'flex-start'}]}>
    <View style={{marginTop: 15, paddingHorizontal: '5%', marginBottom: 10}}>
    
    <DropDownInput
        placeholderStyle={isAndroid ? GLOBAL_STYLE.h3 : GLOBAL_STYLE.h4}
        placeholder="Select Type"
        data={[
          { label: "Feedback"},
          { label: "Complaints"},
          { label: "Request"},
          { label: "Enquiries"}
        ]}
        value={type}
        labelField="label"
        valueField="label"
        onChange={(item) => {
         setType(item.label)
        }}
        
      />
    <Input 
      // label="Name"
      placeholder="Enter your name" 
         value={name}
         onChange={(text) => setName(text)}
         editable={false}
         placeholderTextColor={COLORS.primaryBlue}
      />
      <Input 
      // label="Email"
      placeholder="Enter your email" 
      value={userEmail}
      onChange={(text) => setuserEmail(text)}
      editable={false}
      placeholderTextColor={COLORS.primaryBlue}
      />
      <Input 
      // label="Phone number"
      placeholder="Enter your number" 
      value={phoneNo}
      onChange={(text) => setPhoneNo(text)}
      placeholderTextColor={COLORS.primaryBlue}
      />
    
      <Input 
      // label="Date"
      value={moment(date).format("DD - MM - YYYY")}
      editable={false}
      placeholderTextColor={COLORS.primaryBlue}
      />
    
      <Input
        placeholder="Enter your message"
        multiline={true}
        numberOfLines={7}
        inputCustomStyle={{
          height: 100,
          flexDirection: "row",
          alignItems: "flex-start",
        
        }}
        style={{ textAlignVertical: "top" }}
        value={comment}
        onChangeText={(text) => setComment(text)}
        error={error.comment}
        placeholderTextColor={COLORS.primaryBlue}
      />
      <CustomButton buttonText="Send message"
      onPress={submitHandler}
      />
    
      </View> 
     
   
    </ScrollView>
    <CustomSnackBar 
        show={sendError || success} 
        message={sendError || success}
        success={success ? success : false}
        />
    </View>
 
  )
}

export default Enquiries

const styles = StyleSheet.create({})