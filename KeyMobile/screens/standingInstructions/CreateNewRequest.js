import { useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView,TouchableOpacity,Modal,FlatList,Pressable } from "react-native";
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { HomeHomeIcon,HomeSendIcon } from "../../../constants/icons";
import moment from "moment";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

//hooks / Utils
import getUserHook from "../../../utilities/hooks/getUserHook";
import getPossibleBankHooks from "../../../utilities/hooks/getPossibleBankHooks";
import getBanksHook from "../../../utilities/hooks/getBanksHook";
import getPossibleBankUtil from "../../../utilities/helperFunctions/getPossibleBankUtil";
import getBankUtil from "../../../utilities/helperFunctions/getBankUtil";
import getAccountNameHook from "../../../utilities/hooks/getAccountNameHook";
import { setStandingInstruction } from "../../../utilities/redux/keyMobile/axiosService/standingInstructionUsername";
import { 
    billsCategoryAction,
    billCategoryOptionAction,
    billItemsAction,
    billValidateAction
  } from "../../../utilities/redux/keyMobile/axiosService/billsPayment";
import { thousandOperator } from "../../../utilities/helperFunctions/thousandOperator";

//components
import { 
    DropDownInput,
    Input,
    CustomButton,
    OptionBox,
    AccountCard,
    DatePicker,
    SpinnerImage,
    BottomNotificationModal,CustomSnackBar,} from "../../../components";
import { BankListItemCard,ModalList } from "../../components";

//redux
import { useSelector } from "react-redux";

//formik
import { ErrorMessage, Formik, useFormik,useFormikContext } from "formik";
import * as yup from 'yup';



const deliveryData=[
    {boxText:'Send Money', icon: <HomeSendIcon />},
    {boxText:'Pay Bills', icon:<HomeHomeIcon />}
]

const sendMoneyValidationSchema=yup.object({
        craccount: yup.string().required('This field is required')
            .min(10,'Enter only 10 digits in the field')
            .max(10,'Enter only 10 digits in the field'),
        startday: yup.number().typeError('This field is required').required('This field is required'),
        startmonth: yup.number().required('This field is required'),
        startyear: yup.number().required('This field is required'),
        endday: yup.number().typeError('This field is required').required('This field is required'),
        endmonth: yup.number().required('This field is required'),
        endyear: yup.number().required('This field is required'),
        frequency: yup.string().required('This field is required'),
        amount: yup.number().typeError('This field is required and should be a number').required('This field is required').min(0,'This field is required'),
        charge: yup.number().required('This field is required'),
        TransactionPin: yup.string().required('This field is required and should be a max of 4').min(4).max(4),
        craccountname:yup.string().required()
})

const payBillValidationSchema=yup.object({
        billername: yup.string().required('This field is required'),
        billerid: yup.string().required('This field is required'),
        billercustomerid:yup.string().required('This field is required'),
        billercustomername:yup.string().required('This field is required'),
        categoryid:yup.string().required('This field is required'),
        startday: yup.number().typeError('This field is required').required('This field is required'),
        startmonth: yup.number().required('This field is required'),
        startyear: yup.number().required('This field is required'),
        endday: yup.number().typeError('This field is required').required('This field is required'),
        endmonth: yup.number().required('This field is required'),
        endyear: yup.number().required('This field is required'),
        frequency: yup.string().required('This field is required'),
        amount: yup.number().typeError('This field is required and should be a number').required('This field is required').min(0,'This field is required'),
        charge: yup.number().required('This field is required'),
        TransactionPin: yup.string().required('This field is required and should be a max of 4').min(4).max(4),
})



const CreateNewRequest=()=>{
    const customerDetails = useSelector((state) => state.auth.user);
    const selectedAccount = useSelector(state => state.selectedAccount.accountDetails)
    const [user] = getUserHook();
    const [loading,setLoading]=useState(false)
    const [toggle, setToggle]= useState('Send Money')
    const [pinSecureInput, setPinSecureInput]=useState(true);
    const [notice, setNotice]  = useState(false);
    const [error,setError]=useState('')
    const [ErrorMessage,setErrorMessage]=useState('')
    const id = uuid.v4();
    const navigation=useNavigation()
    
    //some fields
    const [instructFrequency, setInstructFrequency]=useState("")
    const [instructAmount, setInstructAmount]=useState(-1)
    const [beneficiaryAccount, setBeneficiaryAccount]=useState('')
    const [thePin, setThePin]=useState("")
    const [theNarration,setTheNarration]=useState("")
    const [instructName, setInstructName]=useState("")

    //biller
    const [billerModal, setBillerModal]=useState(false)
    const [billerCategories,setBillerCategories]=useState([])
    const [subCategory,setSubCategory]=useState('')//this determines what render method would show in the "modalList component"
    const [billDescDetail,setBillDescDetail]=useState("")
    const [isAmountFixed,setIsAmountFixed]=useState(false)
    const [mainBiller, setMainBiller]=useState({})
    const [custBillDetails,setCustBillDetails]=useState("")
    const [billerCustInput,setBillerCustInput]=useState("Customer ID")
    const [confirmedCustName, setConfirmedCustName]=useState("");
    const [confirmedCustNameLoading, setConfirmedCustNameLoading]=useState(false);

    //bank
    const [bankModal,setBankModal ]=useState(false)
    const toggleBankModal = () => {
        setBankModal(!bankModal)
        setSeeAllBanks(false)//this makes the only the possible banks load on next try
    };
    const [searchBankText, setSearchBankText] = useState("");
    const [searchedBank, setSearchedBank ]= useState([])
    const [bankDetails, setBankDetails] = useState("");
    const [bankDetailsLoaded,setBankDetailsLoaded]=useState(false)
    const [banksLoaded,setBanksLoaded]=useState([])
    const [seeAllBanks, setSeeAllBanks]=useState(false)
    const [bankName,setBankName]=useState("")


    //for date picker
    const [showFirst, setShowFirst] = useState(false)
    const [firstDate, setFirstDate]=useState(new Date())
    const [firstDatePlaceholder, setFirstDatePlaceholder]=useState('Start Date')
    const [showEnd, setShowEnd] = useState(false)
    const [endDate, setEndDate]=useState(new Date())
    const [endDatePlaceholder, setEndDatePlaceholder]=useState('End Date')

    const renderBankList = ({ item }) => {
        return (
          <BankListItemCard
            onPress={() => selectBeneficairyBankDetails(item)}
            item={item}
          />
        );
    };

    const selectBeneficairyBankDetails = (item) => {
        setBankName(item.BankName);
        setBankDetails(item);
        setBankModal(false);
    };

    //get possible banks
    const [bankList, bankListModal, loadingBank]=getPossibleBankHooks(beneficiaryAccount);

    //get all banks
    const getBank=()=>{
        setSeeAllBanks(true)
    }
    const [allBankList,  loadingAllBanks]=getBanksHook(seeAllBanks)

    //search bank
    const filterBankName = (textToSearch) => {
        setSearchedBank((prev)=>{
            return banksLoaded.filter((item)=>item.BankName.toLowerCase().includes(textToSearch.toLowerCase()))
        })
      };

    // get beneficiary account name
    const AccountNamePayload = {
        requestid: id,
        accountno: beneficiaryAccount,
        source: "mobile",
        bankcode: bankDetails?.BankCode ,
        username: user
      };
    const [crAccountName, loadingAccountName]=getAccountNameHook(bankDetails,AccountNamePayload)
   
    const closeNotification=()=>{
        setNotice(false)
    }

    //get the Billers Category
    const fetchBillersCategory=()=>{
        console.log('pie')
        setSubCategory('billerCat')//determines the "renderItem" to use
        setBillDescDetail("")
        setLoading(true)

        billsCategoryAction()
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data,'la biller')
                    const filteredCategory=res.data.filter((item)=>item.categoryid.match(/^(1|2|4|9|15|16)$/ ))//makes a filter that strictly matches
                    setBillerCategories(filteredCategory)
                    setBillerModal(true)
                } else {
                    console.log(res,'errore')
                    setError(true)
                setErrorMessage("An error occured. cant't fetch biller");
                }
            })
            .catch((err) => {
                setErrorMessage(err.message || "An error occured. cant't fetch biller");
            })
            .finally(() => {
                setLoading(false);
                setError(false)
            });
    }

    //get Biller by Categories
    const fetchCategoriesOfBillers=(id)=>{
        setLoading(true)
        setSubCategory('billerSub')//determines the render item to use
        setBillerCategories([]);

        billCategoryOptionAction(id)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data,'more billers')
                    setBillerCategories(res.data)
                    setBillerModal(true)
                } else {
                    console.log(res,'errore')
                    setError(true)
                setErrorMessage("An error occured. cant't fetch biller");
                }
            })
            .catch((err) => {
                setError(true)
                setErrorMessage(err.message || "An error occured. cant't fetch biller");
            })
            .finally(() => {
                setLoading(false)
                setError(false)
            });
    }

    //get exact billing Description
    const fetchBillingDescription=(innerCat)=>{
        setLoading(true)
        setSubCategory('billerDesc')//determines the render item to use
        setBillerCategories([]);
        setMainBiller(innerCat)

        billItemsAction(innerCat.billerid)
            .then((res) => {
                if (res.status == 200) {
                    // console.log(res.data,'bill description')
                    setBillerCategories(res.data)
                    setBillerModal(true)
                } else {
                    console.log(res,'errore')
                    setError(true)
                setErrorMessage("An error occured. cant't fetch biller");
                }
            })
            .catch((err) => {
                setError(true)
                setErrorMessage(err.message || "An error occured. cant't fetch biller");
            })
            .finally(() => {
                setLoading(false)
                setError(false)
            });
    }

    //get biller customer's name
    const fetchBillerCustomerName=()=>{
        console.log("updating...")
        setConfirmedCustNameLoading(true)
        const payload={
            customerId: custBillDetails,
            paymentCode: billDescDetail.paymentCode
        }

        console.log(payload,'the payload')

        if(custBillDetails){
            billValidateAction(payload)
                .then((res) => {
                    if (res.data.ResponseStatus == "00") {
                        console.log(res.data,'bill customer name')
                        setConfirmedCustName(res.data.fullName)
                    } else {
                        console.log(res,'errore')
                        setError(true)
                    setError("An error occured. cant't fetch biller");
                    }
                })
                .catch((err) => {
                    setError(true)
                    // setErrorMessage(err.message || "An error occured. cant't fetch biller");
                    console.log(err.message)
                    setError("An error occured.");
                })
                .finally(() => {
                    setConfirmedCustNameLoading(false)
                    setError(false)
                });
        }
    }

    
    const changeNumberToThousand=(number)=>{
        let numberString=instructAmount;
        if(instructAmount.includes(",")){
            numberString=instructAmount.replace(/[,.]/g,"")
        }
        numberString=numberString.toString().split("").reverse() || "";
        let formattedNumber=""
        
        for(let i=0;i<numberString.length;i++){
            formattedNumber+=numberString[i]
            if((i+1)%3===0 && i>0){
                formattedNumber+=','
            }
        }
        
        formattedNumber=formattedNumber.split("")
        if(formattedNumber[formattedNumber.length-1]===","){
            formattedNumber.pop()
        }
        formattedNumber=formattedNumber.reverse().join("")
        
        return formattedNumber
    }
    
    useEffect(()=>{
        //if it is not a phone number
        if(custBillDetails.length===11 && billDescDetail.categoryid !== "4"){
            fetchBillerCustomerName()
        }
    },[custBillDetails])

    useEffect(()=>{
        setBanksLoaded([])
        if( bankList.length>0){
            setBanksLoaded([...bankList])
            setSearchedBank([...bankList])
            setBankModal(true)
        }

        if(allBankList.length>0){
            setBanksLoaded([...allBankList])
            setSearchedBank([...bankList])
            setBankModal(true)
        }
       
    },[loadingBank,loadingAllBanks])



    const renderBillerCategory=({item})=>{

        if (subCategory === "billerCat")return(
        <TouchableOpacity onPress={()=>fetchCategoriesOfBillers(item.categoryid)}>
            <View style={styles.billerCard}>
                <Text>{item.categoryname}</Text>
            </View>
        </TouchableOpacity>
        )

        if(subCategory === "billerSub")return (
            <TouchableOpacity onPress={()=>fetchBillingDescription(item)}>
                <View style={styles.billerCard}>
                    <Text>{item.billername}</Text>
                </View>
            </TouchableOpacity>
            )
        
        if(subCategory === "billerDesc")return (
            <TouchableOpacity onPress={()=>displayTheBill(item)}>
                <View style={styles.billerCard}>
                    <Text>{item.paymentitemname}</Text>
                </View>
            </TouchableOpacity>
            )
    }

    const displayTheBill=(bill)=>{
        setBillDescDetail(bill)
        setIsAmountFixed(bill.isAmountFixed)//this determines if the user can type in the Amount input or not
        setInstructAmount(-1)//this resets the amount if something was in it previously
        if(bill.isAmountFixed){
            setInstructAmount(bill.amount)
        }
        setBillerModal(false)
        
        switch(bill.categoryid){
            case "1":
                return setBillerCustInput("Meter Number")
            case "2":
                return setBillerCustInput("Card Number")
            case "4":
                return setBillerCustInput("Phone Number")
            case "9":
                return setBillerCustInput("Account ID/User ID")
            case "15":
                return setBillerCustInput("Booking Referend No.")
            default:
                setBillerCustInput("Customer ID")

        }
        
    }

    useEffect(()=>{

    },[firstDate])

    
    if(loadingBank || loadingAllBanks || loading){
        return <SpinnerImage/>
    }
    

    return(
    <ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingBottom:40}}>
        <AccountCard data={customerDetails.accounts} hideCard />

        <View style={{flexGrow:1,paddingHorizontal:20}}>

            <View style={{marginTop:20}}>
                <Text style={[GLOBAL_STYLE.h3]}>
                    Select Source Mode
                </Text>
            </View>
            <View style={styles.OptionBoxContainer}>
                {
                    deliveryData.map((item, index)=>{
                        const {icon, boxText}= item;
                        return(
                            <OptionBox 
                                icon={icon}
                                tickIconColor={'green'}//this determines the color of the tick
                                boxText={boxText} 
                                key={boxText+index}
                                onPress={()=> setToggle(boxText)}
                                choosenState={toggle===boxText ? true : false}//this determines if the tick shows or not
                            />
                        )
                    })
                }
            </View>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    "username": user,
                    "siname": instructName,//confirm if compulsory
                    "draccount": selectedAccount.accountno,
                    "draccountname": selectedAccount.accountname,
                    "craccount": beneficiaryAccount,
                    "craccountname": crAccountName,
                    "bankcode": bankDetails?.BankCode,
                    "bankname": bankName,
                    "startday": firstDate && new Date(firstDate).getDate(),
                    "startmonth": firstDate && new Date(firstDate).getMonth()+1,//confirm if we are using the normal index
                    "startyear": firstDate && new Date(firstDate).getFullYear(),
                    "endday": endDate && new Date(endDate).getDate(),
                    "endmonth": endDate && new Date(endDate).getMonth()+1,
                    "endyear": endDate && new Date(endDate).getFullYear(),
                    "frequency": instructFrequency,
                    "amount": Number(instructAmount),
                    "charge": 0,
                    "narration": theNarration,
                    "requestid": id,
                    "source": "mobile",
                    "billername": mainBiller.billername,
                    "billerid": mainBiller.billerid,
                    "paymentitemcode": billDescDetail.paymentCode,//confrim if this is paymentCode 
                    "billercustomerid": custBillDetails,//confirm
                    "categoryid": billDescDetail.categoryid,
                    "sitype": toggle,//confirm
                    "sireference": id,
                    "billercustomername": confirmedCustName,//confirm is this the debtors name of the name in the biller
                    "customerid": selectedAccount.customerid,
                    "TransactionPin": thePin
                  }}

                validationSchema={ toggle==='Send Money'? sendMoneyValidationSchema: payBillValidationSchema}

                onSubmit={(values,{resetForm})=>{
                    
                    console.log(values)
                    if(endDate<firstDate){
                        setError(true)
                        setErrorMessage('End Date cannot be less than Start Date')
                        return
                    }

                    
                    setLoading(true)
                    setStandingInstruction(values)
                        .then((res) => {
                            console.log(res,'resss')
                            if (res?.data?.ResponseCode == "00") {
                                setLoading(false)
                                setNotice(true)
                                
                            } else {
                                //this shows if the responseCode is not "00" and also not an error
                                console.log(res, "error resssss-")
                                //   console.log(res.data.ResponseMessage,'main',res.data.ResponseCode)
                                    setLoading(false)
                                    setErrorMessage(res.data.ResponseDescription)
                                    setError(true)
                                    
                            }
                            })
                            .catch((err) => {
                                console.log(err,'the error message')
                                // console.log(err.response.data, "error")
                                
                                setLoading(false)
                                setErrorMessage(err.response.data.Message || "An error occured" )
                                setError(true)
                            }).finally(()=>{
                                setError(false)
                            })
                    

                    

                    
                }}
            >
            {({values,handleChange,handleBlur,handleSubmit,setFieldValue,errors})=>{
                return(
                <>
                <Input
                    placeholder="Standing Instruction Name"
                    value={instructName}
                    style={styles.reactivateInput}
                    inputCustomStyle={{backgroundColor:COLORS.grey2}}
                    placeholderTextColor={COLORS.primaryBlue}
                    onChangeText={(text)=>setInstructName(text)}
                    icon={null}
                />
                <DropDownInput
                    data={[
                        {label:'Once',value:'Once'},
                        {label:'Daily',value:'Daily'},
                        {label:'Weekly',value:'Weekly'},
                        {label:'Monthly',value:'Monthly'},
                    ]}
                    labelCustomStyle={styles.inputLabel}
                    labelField="label"
                    valueField="value"
                    placeholder="Frequency"
                    value={values.frequency}
                    onChange={(item)=>{
                        setInstructFrequency(item.value);
                    }}
                    placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                    error={errors.frequency}
                />

                <TouchableOpacity onPress={() => setShowFirst(true)}>
                    <DatePicker
                        placeholder={firstDatePlaceholder}
                        show={showFirst}
                        value={firstDate}
                        minimumDate={new Date()}
                        onChange={(event, date) => {
                            setFirstDate(date)
                            setShowFirst(false)
                            setFirstDatePlaceholder(false)
                        }}
                        error={errors.startday}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>  setShowEnd(true)}>
                    <DatePicker
                        placeholder={endDatePlaceholder}
                        show={showEnd}
                        value={endDate}
                        minimumDate={new Date()}
                        onChange={(event,date)=>{
                            setEndDate(date )
                            setEndDatePlaceholder(false)
                            setShowEnd(false)
                        }}
                        error={errors.endday}
                    />
                    
                </TouchableOpacity>

                {
                toggle==='Send Money'&&
                    <Input
                        label={loadingAccountName?"...." : crAccountName}
                        placeholder="Beneficiary Account Number"
                        value={values.craccount}
                        onChangeText={(text)=>{
                            // checkAccountLength()
                            setBeneficiaryAccount(text)}}
                        keyboardType='numeric'
                        onBlur={handleBlur('craccount')}
                        error={ errors.craccount}
                        style={styles.reactivateInput}
                        inputCustomStyle={{backgroundColor:COLORS.grey2}}
                        placeholderTextColor={COLORS.primaryBlue}
                        icon={null}
                    />
                }
                {
                toggle==='Pay Bills'&&<>
                    <ModalList 
                        placeholder="Biller"
                        value={billDescDetail ?`${mainBiller.billername} | ${billDescDetail.paymentitemname}`:"Biller"}
                        onRequestClose={()=>null}
                        visible={billerModal}
                        setVisible={()=>fetchBillersCategory()}
                        icon={
                              <FontAwesome
                                name="chevron-down"
                                size={16}
                                color={COLORS.grey}
                              />
                          }
                        data={ subCategory === "billerDesc" ? billerCategories.paymentitems :billerCategories}
                        renderItem={renderBillerCategory} 
                        emptyListText={
                            <Text style={GLOBAL_STYLE.h4Bold}>
                              An error occured
                            </Text>
                          }
                        error={errors.billerid}
                    />

                    <Input
                        label={confirmedCustNameLoading? "....":confirmedCustName}
                        placeholder={billerCustInput}
                        value={custBillDetails}
                        style={styles.reactivateInput}
                        inputCustomStyle={{backgroundColor:COLORS.grey2}}
                        placeholderTextColor={COLORS.primaryBlue}
                        keyboardType="numeric"
                        onChangeText={(text)=>{
                            if(!billDescDetail){
                                return setConfirmedCustName('Kindly choose a biller first')
                            }
                            setConfirmedCustName('')
                            setCustBillDetails(text)
                            
                            
                        }}
                        icon={null}
                        error={errors.billercustomerid}
                    />

                    
                    </>
                }

                <Input
                    placeholder="Amount"
                    value={instructAmount<=0? 0 : changeNumberToThousand(instructAmount)}
                    editable={!isAmountFixed}
                    style={styles.reactivateInput}
                    inputCustomStyle={{backgroundColor:COLORS.grey2}}
                    placeholderTextColor={COLORS.primaryBlue}
                    onChangeText={(text)=>{
                        let numbering=text
                        if(text.includes(",")){
                            numbering=numbering.replace(/[,.]/g,"")
                        }
                        setInstructAmount(numbering)
                    }}
                    keyboardType='numeric'
                    icon={null}
                    error={errors.amount}
                />

                <Input
                  placeholder={'Pin'}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{borderWidth:0.3}}
                  value={thePin}
                  onChangeText={(text)=>setThePin(text)}
                  keyboardType='numeric'
                  onBlur={handleBlur('pin')}
                  error={ errors.TransactionPin}
                  secureTextEntry={pinSecureInput}
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
                    placeholder="Narration"
                    value={theNarration}
                    style={styles.reactivateInput}
                    inputCustomStyle={{backgroundColor:COLORS.grey2}}
                    placeholderTextColor={COLORS.primaryBlue}
                    onChangeText={(text)=>setTheNarration(text)}
                    icon={null}
                />

                <View style={{flex:1}}/>


                <CustomButton
                    buttonContainerStyle={styles.buttonLogin}
                    buttonText={'Submit'}
                    buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
                    onPress={()=>handleSubmit()}
                />
                
                </>
                )
            }}
            </Formik>
        </View>

        <BottomNotificationModal
            show={notice}
            headerText="Transaction Successful"
            // infoText={`you have successfully sent ${success.amount} to ${success.CustomerName}`}
            infoText={`You have successfully set the instruction`}
            onPress={()=>{
                closeNotification();
                navigation.replace("StandingInstructionTabMenu")
            }}
            buttonText={"Continue"}
        />

        <CustomSnackBar show={error} message={ErrorMessage}/>
        

        <View>
          <Modal
            visible={bankModal}
            animationType="slide"
            onRequestClose={toggleBankModal}
          >
            <View style={{ marginHorizontal: "5%" }}>
              <FlatList
                ListHeaderComponent={
                  <Input
                    icon={
                      <FontAwesome name="search" size={16} color={COLORS.grey} />
                    }
                    placeholder="search"
                    value={searchBankText}
                    onChangeText={(text) => {
                        setSearchBankText(text)
                        filterBankName(text)
                    }}
                  />
                }
                data={searchedBank}
                renderItem={renderBankList}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                  <Pressable onTouchStart={getBank}>
                    {!seeAllBanks && <Text
                      style={[
                        GLOBAL_STYLE.h4Bold,
                        {
                          color: COLORS.primaryBlue2,
                          textAlign: "center",
                          paddingVertical: 10,
                        },
                      ]}
                    >
                      See more
                    </Text>}
                  </Pressable>
                }
              />
            </View>
          </Modal>
        </View>

    </ScrollView>
    )
}


const styles=StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        paddingVertical:20,
    },
    OptionBoxContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    inputLabel:{
        marginLeft:0,
    },
    reactivateInput:{
		backgroundColor:COLORS.grey2,
	},
    buttonLogin: {
		backgroundColor:COLORS.primaryBlue,
		width:'100%',
		marginTop: 40,
		marginBottom: 30,
	},
    billerCard:{
        height:45, 
        paddingHorizontal:20,
        borderBottomColor:COLORS.grey,
        borderBottomWidth:0.5,
        justifyContent:'center'
    }
})
export default CreateNewRequest;
