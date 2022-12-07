import { useState } from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity} from 'react-native';
import { COLORS } from '../constants';
import { Ionicons } from '@expo/vector-icons';

//components
import FilterModal from './FilterModal';


const FilterSearchBox=()=>{
    const [showFilterModal, setShowFilterModal]= useState(false)
    

    return(
    <View style={{flexDirection:'row',marginBottom:20}}>
        <View style={styles.inputArea}>
            <Ionicons name="search" size={22} color={COLORS.grey} />
            <TextInput placeholder='Search' style={{marginLeft:5}}/>
        </View>
        <TouchableOpacity 
            onPress={()=>setShowFilterModal(true)}
            style={styles.filterArea}
        >
            <Ionicons name="options-outline" size={28} color="white" />
        </TouchableOpacity>

        <FilterModal
            showFilterModal={showFilterModal}
            setShowFilterModal={setShowFilterModal}
        />
    </View>
    )
}

export default FilterSearchBox

const styles= StyleSheet.create({
    inputArea:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:COLORS.grey2,
        paddingHorizontal:10,
        marginRight:10,
        borderRadius:5
    },
    filterArea:{
        width: 50,
        height:50,
        backgroundColor:COLORS.primaryBlue,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    }
})