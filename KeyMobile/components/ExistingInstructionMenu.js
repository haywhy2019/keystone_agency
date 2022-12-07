import React, { useState, useEffect,getUserHook } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, FONTS,GLOBAL_STYLE } from '../../constants'
import { AntDesign,MaterialIcons,Ionicons  } from '@expo/vector-icons';
import { thousandOperator } from "../../utilities/helperFunctions/thousandOperator";

//component
import StandingInstructionItemDisplay from "./StandingInstructionItemDisplay";

const ExistingInstructionMenu = ({dataItem,leftIcon,onPress,setOuterSiReference,setDeletePinModal}) => {
  const {categoryid,
    sitype,
    narration,
    startday,
    startmonth,
    startyear,
    endday,
    endmonth,
    endyear,
    craccount,
    craccountname,
    frequency,
    amount,
    billerid,
    billername,
    sireference
  }=dataItem

  const [isCardControlOpen, setIsCardControlOpen]=useState(false);
	const openCardControl=()=>{
		setIsCardControlOpen(!isCardControlOpen)//open the panel and changes the chevron
	}

  const startingPeriod=`${startyear}-${startmonth}-${startday<10?'0'+startday: startday}`;
  const endingPeriod=`${endyear}-${endmonth}-${endday<10?'0'+endday:endday}`

  

  return (
    <TouchableOpacity onPress={openCardControl}>
       <View>
        <View style={styles.menuCardContainer}>
          <View style={{ flexDirection: "row",alignItems:'center',width:'76%'}}>
              <View style={{backgroundColor:'white'}}>
              {leftIcon ? leftIcon : (  
                <Ionicons
                name="lock-closed-sharp"
                size={18}
                color={COLORS.primaryBlue}
              /> )}
              </View>
              <View style={{width:'100%',height:48, marginHorizontal:15,justifyContent:'space-between'}}>
                <Text style={styles.menuCardContainerText} numberOfLines={1}>{`${sitype} | ${narration}`}</Text>
                <Text style={styles.menuCardContainerTexttwo}>{`${startingPeriod} | ${endingPeriod}`}</Text>
              </View>
          </View>

          { isCardControlOpen ?
            <Ionicons name="chevron-down-outline" size={24} color="#002E5B" />
          : 
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#002E5B" />
          }
        </View>

      {(isCardControlOpen && sitype === "Send Money") && (
      <View style={styles.background}>
        <StandingInstructionItemDisplay
          leftLabel={'Amount'}
          leftText={amount<=0 ? 0 : thousandOperator(amount)}
          rightLabel={'Beneficiary'}
          rightText={craccount}
          />
        <StandingInstructionItemDisplay
          leftLabel={'Narration'}
          leftText={narration}
          rightLabel={'Account Name'}
          rightText={craccountname}
          />
        <StandingInstructionItemDisplay
          leftLabel={'Frequency'}
          leftText={frequency}
          rightLabel={'Creation Date'}
          rightText={startingPeriod}
        />

        <TouchableOpacity onPress={()=>{
          setDeletePinModal(true)
          setOuterSiReference(sireference)
        }}
        >
          <View style={styles.Decline}>
            <Text style={[GLOBAL_STYLE.h2,{color: COLORS.primaryBlue,}]}>DECLINE</Text>
            <View style={{backgroundColor:'#fce3e3',borderRadius:10,height:20,width:20,justifyContent:'center',alignItems:'center',marginTop:'2%'}}>
              <AntDesign name="closecircleo" size={13} color='#EB5757' />
            </View>
          </View>
        </TouchableOpacity>

      </View>
        )
      }


      {(isCardControlOpen && sitype === "Pay Bills")&&(
      <View style={styles.background}>
        <StandingInstructionItemDisplay
          leftLabel={'Amount'}
          leftText={amount<=0 ? 0 : thousandOperator(amount)}
          rightLabel={'Biller'}
          rightText={billername}
        />
        <StandingInstructionItemDisplay
          leftLabel={'Narration'}
          leftText={narration}
          rightLabel={'Biller Detail'}
          rightText={billerid}
        />
        <StandingInstructionItemDisplay
          leftLabel={'Frequency'}
          leftText={frequency}
          rightLabel={'Creation Date'}
          rightText={startingPeriod}
        />

        <TouchableOpacity onPress={()=>{
          setDeletePinModal(true)
          setOuterSiReference(sireference)
        }}>
          <View style={styles.Decline}>
            <Text style={[GLOBAL_STYLE.h2,{color: COLORS.primaryBlue,}]}>DECLINE</Text>
            <View style={{backgroundColor:'#fce3e3',borderRadius:10,height:20,width:20,justifyContent:'center',alignItems:'center',marginTop:'2%'}}>
              <AntDesign name="closecircleo" size={13} color='#EB5757' />
            </View>
          </View>
        </TouchableOpacity>

      </View>
        )
      }


        </View>

    </TouchableOpacity>
    
  )
}

export default ExistingInstructionMenu

const styles = StyleSheet.create({
  menuCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 75,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    paddingHorizontal: 20,
    fontFamily: FONTS.normal,
  },
  menuCardContainerText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    fontSize:13,
  },
  menuCardContainerTexttwo: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
    fontSize:13
  },
  Decline:{
    width:'30%',
    paddingVertical:'1%',
    marginTop:'2%',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#EB5757',
    flexDirection:'row',
    justifyContent:'space-around',
    marginLeft:'28%'
},
background:{backgroundColor:'#f2f2f2',
alignItems:'center',
justifyContent:'center',
paddingVertical:10,
justifyContent:'center',
width:'93%',
marginLeft:'3.5%',
borderRadius:7},

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
