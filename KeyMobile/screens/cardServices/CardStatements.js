import { StyleSheet, ScrollView, View, Text} from "react-native";
import { COLORS } from "../../../constants";

//components
import ThirdTab from "../Transactions/Tabs/ThirdTab";

const CardStatements=()=>{
    return(
    <ScrollView style={styles.scrollContainer}>
        <ThirdTab/>
    </ScrollView>
    )
}

export default CardStatements

const styles=StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        paddingHorizontal:20
    }
})