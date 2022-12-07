import React, { useState, useEffect } from "react";
import {StyleSheet, 
	Text, 
	View, 
	Image,
	ScrollView, 
	TouchableOpacity,
	FlatList,
	Modal} from 'react-native';
import { images,COLORS,GLOBAL_STYLE} from "../../../constants";
import { MaterialIcons,AntDesign,Ionicons } from '@expo/vector-icons';
import { standingInstructionUsernameAction,
	deleteStandingInstruction } from "../../../utilities/redux/keyMobile/axiosService/standingInstructionUsername";

//components
import { SpinnerImage,CustomSnackBar,Input,CustomButton } from "../../../components";
import ExistingInstructionMenu from "../../components/ExistingInstructionMenu";



const StandingInstructionItem=({navigation})=>{
	const [loading, setLoading] = useState(false);
	const [standingData, setStandingData]=useState(null);
	const [error,setError]=useState("")
	const [deletePinModal,setDeletePinModal]=useState(false);
	const [deletePin,setDeletePin]=useState('')
	const [pinLabel,setPinLabel]=useState('')
	const [pinSecureInput,setPinSecureInput]=useState(true)
	const [sireference,setOuterSiReference]=useState('')

	const getStandingInstructions = () => {
		setLoading(true);
		standingInstructionUsernameAction()
		  .then((res) => {
			console.log(res, "res------")
			if (res?.status == "200") {
			console.log(res, "correct res")
				setStandingData(res.data)
			  } else {
				setError("An error occured");
			  }
			  
	   
		  })
		  .catch((err)=>{
			console.log(err, "errr");
        	setError(err.message || "An error occured")
		  })
		  .finally(() => setLoading(false));
	
	  };

	  
	const deleteInstruction=()=>{
		console.log(sireference,'ref')
		if(!deletePin || deletePin.length>4){
			setPinLabel('Please input a 4-digit pin')
			setTimeout(()=>setPinLabel(''),3000)
			return
		}

		const payload={
		Sireference: sireference,
		TransactionPin: deletePin
		}
		  console.log(payload)
		  setDeletePinModal(false)
		  setDeletePin('')
		  setLoading(true);

		deleteStandingInstruction(payload)
		.then((res)=>{
		
			if (res?.data?.ResponseCode == "00") {

			//   setStandingData((prev)=>{
			// 	console.log(prev,'prev')
			// 	return prev.filter((item)=>item.sireference !== sireference)
			//   })
			getStandingInstructions()
			
				console.log(res.data, "res data")
				console.log(standingData, "standing")
			} else {
				setError("An error occured");
			}
		})
		.catch((err)=>{
			console.log(err.message, "errr");
			setError( "An error occured")
		}).finally(()=>setLoading(false))
			
	}
		
		useEffect(()=>{
		  getStandingInstructions()
		},[])

	  const renderItem=({item})=>{
		
		return(
			<ExistingInstructionMenu
				leftIcon={
					<Image
						source={images.keyMobileLogoRound}
						style={styles.logoImage}
					/>}
				dataItem={item}
				setOuterSiReference={setOuterSiReference}
				// onPress={()=>setDeletePinModal(true)}
				setDeletePinModal={setDeletePinModal}
			/>	
		)
	  }

	  if(loading){
		return <SpinnerImage/>
	  }



	return(
	<View style={styles.scrollContainer}>
		<View style={styles.container}>

		{
			(standingData && standingData?.length>0) &&	<FlatList
								data={standingData}
								renderItem={renderItem}
								keyExtractor={(item,index)=>{
									return index
								}}//CHANGE THIS LATER TO item.requestid because it's unique
							/>
		}	
		{
			(standingData && standingData.length<1) && <Text style={{textAlign:'center',marginTop:10}}>No Standing Instruction</Text>
		}	

		</View>

		<CustomSnackBar show={error} message={error} />

		<Modal
			visible={deletePinModal}
			// visible={true}
			onRequestClose={()=>{
				setDeletePinModal(false)
				setDeletePin('')
			}}
			transparent={true}
		>
			<TouchableOpacity 
				onPress={()=>setDeletePinModal(false)}
				style={{flex:1,justifyContent:'center', paddingHorizontal:20,backgroundColor:'rgba(0,0,0,0.1)'}}
			>
			
				<View style={{height:320,borderRadius:10,padding:20,paddingVertical:30,backgroundColor:COLORS.white}}>
					<View style={{alignItems:'center'}}>
						<Text style={[GLOBAL_STYLE.h1Bold]}>Enter Transaction PIN</Text>
						<Text style={[GLOBAL_STYLE.h4,{width:200,textAlign:'center'}]}>Kindly enter you transaction PIN to confirm</Text>
					</View>

					<View style={{flex:1,justifyContent:'space-between', marginTop:15}}>
						<Input
						label={pinLabel}
						placeholder={'Enter PIN'}
						placeholderTextColor={COLORS.grey}
						inputCustomStyle={{borderWidth:0.3}}
						value={deletePin}
						onChangeText={(text)=>setDeletePin(text)}
						keyboardType='numeric'
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
						<CustomButton
							buttonText={'submit'}
							onPress={()=>deleteInstruction()}
						/>
					</View>
				

					
				</View>
			</TouchableOpacity>
		</Modal>


	</View>
	)
   
	
}

export default StandingInstructionItem;

const styles=StyleSheet.create({
	scrollContainer:{
		flex:1,
		backgroundColor:COLORS.white,
	},
	container:{
		flex:1,
	},
	logoImage: {
		width: 20,
		height: 20,
		marginRight: 5,
	  },



})

