import { View, StyleSheet} from 'react-native'
import React from 'react'
import MenuOptionsCard from '../../components/MenuOptionsCard'

const Account = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MenuOptionsCard label="Account list" navigation={navigation} screen="account details"/>
      <MenuOptionsCard label="Bank codes" navigation={navigation} screen="account codes"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})
export default Account