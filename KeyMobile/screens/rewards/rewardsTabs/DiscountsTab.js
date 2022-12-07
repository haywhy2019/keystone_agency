import { useState } from "react";
import {StyleSheet, View,Text } from "react-native";
import { GLOBAL_STYLE,COLORS } from "../../../../constants";

//components
import { InfoIconCard } from "../../../../components";
import { SpeakerSmallIcon,DiscountCartIcon } from "../../../../constants/icons";

const DiscountsTab=()=>{
    const [isThereDiscount, setIsThereDiscout]=useState(false);

    return(
    <View style={{paddingTop:20}}>
        <InfoIconCard
            cardText={'Get points on each Referral of our BYond Mobile Application, and extra For every supsequent referral'}
            cardIcon={<SpeakerSmallIcon/>}
            buttonText={'Invite Friends'}
        />
        {
            //this shows if there is no discounts
        !isThereDiscount && (
            <View style={{alignItems:'center',}}>
                <DiscountCartIcon style={{marginVertical:20,}}/>
                <Text style={[GLOBAL_STYLE.h1Bold,{textAlign:'center'}]}>No Discounts Available.</Text>
                <Text style={[GLOBAL_STYLE.h3,{color:COLORS.grey,textAlign:'center'}]}>Please come back later to get updated</Text>
            </View>
        
        )
        }
    </View>
    )
}

export default DiscountsTab