import { StyleSheet,ScrollView,View,Text } from "react-native";
import { GLOBAL_STYLE,COLORS } from "../../../../constants";

//components
import { AccountCard} from "../../../../components";
import { Transactions } from "../Transactions";

//redux
import { useSelector} from "react-redux";

const StatementsMainpage=()=>{
    const customerDetails = useSelector((state) => state.auth.user);

    return(
    <ScrollView style={styles.scrollContainer}>
        <AccountCard data={customerDetails.accounts} />
        <Text style={[GLOBAL_STYLE.h4Bold,{paddingHorizontal:20,paddingTop:20}]}>All Transactions</Text>
        <Transactions/>
        <View style={styles.mainContainer}>
            
        </View>
    </ScrollView>
    )
}

export default StatementsMainpage;

const styles = StyleSheet.create({
    scrollContainer:{
        flex:1,
        paddingTop:20,
        backgroundColor: COLORS.white
    }
})