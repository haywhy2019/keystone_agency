import { View, Text , TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const MenuOptionsCard = ({navigation, label, screen}) => {
  return (
    
 <TouchableOpacity onPress={() => navigation.navigate(screen)}>
   <View style={styles.container1}>
      <Text style={styles.container1Text}>{label}</Text>
    </View>
    </TouchableOpacity>
   
   
 
  )
}

const styles = StyleSheet.create({
 
    container1 : {
       
       paddingLeft: 60,
        borderColor: COLORS.primaryBlue,
        justifyContent: 'center',
       height: 50,
       borderBottomWidth: 0.5,
       borderBottomColor: COLORS.grey
       
  
    },
    container1Text: {
        color: COLORS.primaryBlue
    }
})
export default MenuOptionsCard