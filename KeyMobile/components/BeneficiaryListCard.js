import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { GLOBAL_STYLE, COLORS, } from '../../constants';

import {
    Feather,
    MaterialIcons,
    FontAwesome,
    Entypo,
  } from "@expo/vector-icons";

const BeneficiaryListCard = ({item, onEdit, onDelete}) => {

    return (
        <View
          style={[
            GLOBAL_STYLE.rowBetween,
            {
              borderColor: COLORS.primaryBlue2,
              paddingVertical: 20,
              borderTopWidth: 0.6,
              // borderBottomWidth: 0.6,
  
              paddingHorizontal: "5%",
            },
          ]}
        >
          <View style={[GLOBAL_STYLE.rowBetween]}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: COLORS.primaryBlue2,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              
              <Text style={[GLOBAL_STYLE.h1Bold,{textTransform: "capitalize"}]}>{item.accountname ? item.accountname?.slice(0,1) : item.alias?.slice(0,1)}</Text>
            </View>
  
            <View style={[GLOBAL_STYLE.rowBetween, { flexDirection: "column" }]}>
              <Text style={[GLOBAL_STYLE.h4]}>{item.accountname? item.accountname?.slice(0,18) : item.alias?.slice(0,18)}</Text>
              <Text style={[GLOBAL_STYLE.h5, { color: COLORS.grey }]}>
                {item.accountnumber ? item.accountnumber : item.billercustomerid}
              </Text>
            </View>
          </View>
          <View style={[GLOBAL_STYLE.rowBetween]}>
            <TouchableOpacity style={[GLOBAL_STYLE.rowBetween, { height: 35 }]}
            onPress={onEdit}
            >
              <Feather
                name="edit"
                size={16}
                color={COLORS.primaryBlue}
                style={{ marginRight: 5 }}
              />
              <Text style={GLOBAL_STYLE.h5}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[GLOBAL_STYLE.rowBetween, { marginLeft: 10, height: 35 }]}
              onPress={onDelete}
            >
              <MaterialIcons
                name="cancel"
                size={16}
                color={COLORS.error}
                style={{ marginRight: 5 }}
                
              />
              <Text style={GLOBAL_STYLE.h5}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default BeneficiaryListCard

const styles = StyleSheet.create({})