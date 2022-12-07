import { View, Text,  StyleSheet,ScrollView,
    ImageBackground,
    TouchableOpacity,
    Keyboard, } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import MenuOptionsCard from '../components/MenuOptionCards';


const QuickLinks = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>

    
    
    <StatusBar style="light" />
    {/* <MenuOptionsCard  label="Open Account"/> */}
    {/* <MenuOptionsCard  label="Reactivate Account"/> */}
    <MenuOptionsCard  label="Notifications" screen="Notification" navigation={navigation}/>
    <MenuOptionsCard  label="FAQ" screen="FAQ" navigation={navigation}/>
    {/* <MenuOptionsCard  label="Enquiries & Complaints"/> */}
    <MenuOptionsCard  label="Locate Us" screen="LocateUs" navigation={navigation}/>
    <MenuOptionsCard  label="Contact Us" screen="EnquiresScreen" navigation={navigation}/>
    {/* <MenuOptionsCard  label="Oxygen Chat"/> */}

 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default QuickLinks