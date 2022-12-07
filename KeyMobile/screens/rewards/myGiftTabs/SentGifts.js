import {View, Text } from "react-native";

//components
import { HistoryCard } from "../../../components";

const dummyData=[
    {
        Craccount:'himn',
        Craccountname:'OluwaTayo',
        Narration:'Stipends',
        Amount:200,
    },
    {
        Craccount:'himn',
        Craccountname:'OluwaTayo',
        Narration:'Stipends',
        Amount:200,
    },
]

const SentGifts=()=>{
    return(
    <View>
        {
        dummyData.map((item,index)=>{
            return(
            <HistoryCard item={item} key={index+item.Narration}/>
            )
        })
        }
    </View>
    )
}

export default SentGifts;