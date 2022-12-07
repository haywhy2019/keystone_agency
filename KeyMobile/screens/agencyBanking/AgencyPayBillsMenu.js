import {StyleSheet,View, ScrollView} from 'react-native';
import { COLORS } from '../../../constants';

//components
import MenuThreeRows from '../../components/MenuThreeRows';
import { GamingBillsIcon,InternetBillsIcon, } from '../../../constants/icons';

const AgencyPayBillsMenu=({navigation})=>{
    return(
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MenuThreeRows
            firstIcon={<InternetBillsIcon  />}
            secondIcon={<GamingBillsIcon  />}
            thirdIcon={<GamingBillsIcon  />}
            firstText={{ line1: "Internet Services" }}
            secondText={{line1:"Cable"}}
            thirdText={{ line1: "Utility" }}
            onPress1={() => navigation.navigate('InternetServices')}
            onPress2={() => navigation.navigate('CableBills')}
            onPress3={() => navigation.navigate('UtilityBills')}
        />
        <MenuThreeRows
            firstIcon={<GamingBillsIcon  />}
            firstText={{ line1: "Betting & Lottery"}}
            onPress1={() => navigation.navigate('BettingBills')}  
        />
    </ScrollView>
    )
}

export default AgencyPayBillsMenu

const styles= StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        backgroundColor: COLORS.white,
        paddingVertical:15
    }
})
