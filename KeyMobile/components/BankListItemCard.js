import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image} from 'react-native'
import React from 'react'
import { GLOBAL_STYLE, COLORS, images } from '../../constants';

import {
    Feather,
    MaterialIcons,
    FontAwesome,
    Entypo,
  } from "@expo/vector-icons";

const BankListItemCard = ({item, onPress}) => {
   
        return (
          <Pressable
            style={{
              paddingVertical: 20,
              // borderTopWidth: 0.5,
              // borderTopColor: COLORS.primaryBlue,
            }}
            onPress={onPress}
          >
            <View
              style={[
                GLOBAL_STYLE.rowBetween,
                { justifyContent: "flex-start", alignItems: "center"},
              ]}
            >
              {/* <FontAwesome
                name="bank"
                size={16}
                color={COLORS.primaryBlue2}
                style={{ marginRight: 20 }}
              /> */}
              <Image  source={images.keyMobileLogoRound} style={{height: 30, width: 30, marginRight: 20 }}/>
    
              <Text style={[GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue , flexShrink: 1 }]}>
                {item.BankName}
              </Text>
            </View>
          </Pressable>
        );
     
    
}

export default BankListItemCard
