import {StyleSheet,View,Text} from 'react-native';
import { GLOBAL_STYLE,COLORS } from '../../../constants';

//components
import { ReferFriendManIcon } from '../../../constants/icons';
import { CustomButton } from '../../../components';

const ReferFriendMenu=({navigation})=>{
    return(
    <View style={styles.container}>
        <View style={{alignItems:'center'}}>
            <ReferFriendManIcon style={{marginVertical:20}}/>
            <Text style={[GLOBAL_STYLE.h2Bold]}>GET POINTS AS YOU REFER!</Text>
            <Text style={[GLOBAL_STYLE.h4,{color:COLORS.grey,textAlign:'center'}]}>Get points on each Refferal of our Keymobile Application, and extra 
                for every subsequent refferal made by those you referred</Text>
        </View>

        <View style={{flex:1}}/>

        <View>
            <CustomButton
                buttonText={'REFER A FRIEND'}
                buttonContainerStyle={styles.btnStyle}
            />
            <CustomButton
                buttonText={'REFER A FRIEND WITH GIFT'}
                buttonContainerStyle={styles.btnStyle}
                onPress={()=>navigation.navigate('GiftAFriend')}
            />
        </View>
    </View>
    )
}

export default ReferFriendMenu

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.white,
        paddingVertical:50, 
        paddingHorizontal:20,
        
    },
    btnStyle:{
        width:'100%',
        marginVertical:20,
    }
})