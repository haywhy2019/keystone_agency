import { View,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

//components
import { InfoIconCard } from "../../../../components";
import { SpeakerSmallIcon, StarAwardIcon } from "../../../../constants/icons";

const RewardsTab=()=>{
    const navigation= useNavigation();

    return(
    <View style={{paddingTop:20}}>
        <InfoIconCard
            cardText={'Get points on each Referral of our BYond Mobile Application, and extra For every supsequent referral'}
            cardIcon={<SpeakerSmallIcon/>}
            buttonText={'Invite Friends'}
        />
        <InfoIconCard
            cardHeading={'Redeem Cash'}
            cardText={'Redeem cash from referrals.'}
            cardIcon={<StarAwardIcon/>}
            buttonText={'Redeem'}
            cardBodyStyle={{backgroundColor:'rgba(163, 216, 245, 0.3)'}}
            onPress={()=>navigation.navigate('RedeemPoints')}
        />
    </View>
    )
}

export default RewardsTab