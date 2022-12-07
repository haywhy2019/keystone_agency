import { View, Text } from 'react-native'
import React from 'react'
import { MenuOptionsCard } from '../../components'
import { GLOBAL_STYLE } from '../../../constants'

const BeneficiaryMenu = ({navigation}) => {
  return (
    <View style={GLOBAL_STYLE.background}>
    <View style={{marginTop: 15}}>
    <MenuOptionsCard label="Send Money Beneficiary" screen="Beneficary" navigation={navigation}/>
    </View>

     <MenuOptionsCard label="Airtime / Bills Beneficiary" screen="BillBeneficary" navigation={navigation}/>

    </View>
  )
}

export default BeneficiaryMenu