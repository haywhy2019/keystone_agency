import { ScrollView,View,Text,FlatList } from "react-native"

//components
import { CustomButton } from "../../../components"

const pricipalDummy=[
    {
    id:"MMM098",
    amount:'69739',
    date:'23-29-2002'
    },
    {
    id:"MMM098",
    amount:'69739',
    date:'23-29-2002'
    },
]

const LiquidateScreen=()=>{
    return(
    <View>
        <View>
            <Text>₦{"250,890II"}</Text>
            <Text>Investment Amount</Text>
            <CustomButton
                buttonText={"LIQUIDATE"}
            />
        </View>
        <View>
            <Text>Investment Details</Text>
            <View>
              <FlatList
                data={pricipalDummy}
                renderItem={renderItem}
                keyExtractor={(item,index)=>index}
              />
            </View>    
        </View>
    </View>
    )
}

export default LiquidateScreen

const renderItem=({item})=>{
    return(
    <View style={{height:80,backgroundColor:'pink'}}>
        <Text>MM098767</Text>
    </View>
    )
}