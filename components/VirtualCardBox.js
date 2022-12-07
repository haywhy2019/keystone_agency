import { useState } from 'react';
import {StyleSheet,Text,View, ImageBackground} from 'react-native';
import cardInnerRings from '../assets/images/cardInnerRings.png'
import { GLOBAL_STYLE, COLORS } from '../constants';

//components
import { MasterCardIcon } from '../constants/icons';

const VirtualCardBox=()=>{
    const [cardNumber, setCardNumber]=useState('2039908523456735')

    const splitNumbertoFour=()=>{
        let splittedNumbers=[]
        for(let i=0; i<cardNumber.length;i++){
            if(i%4===0){
                let numberSeries=cardNumber.slice(i,i+4)
                splittedNumbers.push(<Text style={[GLOBAL_STYLE.h4,{color:COLORS.white}]} key={numberSeries}>{numberSeries}</Text>)
            }
            
        }
        
        return splittedNumbers
    }

    

    return(
        <View style={{width:'100%',alignItems:'center'}}>
            <View style={styles.virtualContainer}>
                <View style={styles.spaceOutItems}>
                  <MasterCardIcon/>
                  <Text style={[GLOBAL_STYLE.h4Bold,{color: COLORS.white}]}>VIRTUAL CARD</Text>
                </View>

                <View style={[styles.spaceOutItems,{marginVertical:30}]}>
                    {
                        splitNumbertoFour()
                    }
                </View>
                
                <ImageBackground source={cardInnerRings} resizeMode="cover" style={styles.image}/>

                <View style={styles.spaceOutItems}>
                    <Text style={[GLOBAL_STYLE.h4,{color: COLORS.white}]}>JONATHAN DAVIS</Text>
                    <View>
                        <Text style={[GLOBAL_STYLE.h4,{color: COLORS.white}]}>CVV</Text>
                        <Text style={[GLOBAL_STYLE.h4,{color: COLORS.white}]}>577</Text>
                    </View>
                    <View>
                        <Text style={[GLOBAL_STYLE.h4,{color: COLORS.white}]}>EXP</Text>
                        <Text style={[GLOBAL_STYLE.h4,{color: COLORS.white}]}>01/26</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default VirtualCardBox;

const styles= StyleSheet.create({
    virtualContainer:{
        width:'92%',
        height: 210,
        backgroundColor: COLORS.primaryBlue,
        borderRadius:15,
        padding:25,
        justifyContent:'space-between'
    },
    image: {
        flex: 1,
        justifyContent: "center",
     },
     spaceOutItems:{
        flexDirection:'row',
        justifyContent:'space-between'
     }
})