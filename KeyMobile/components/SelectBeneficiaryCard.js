import { StyleSheet, Text, View , Image, Pressable} from 'react-native'
import React from 'react'
import { COLORS, FONTS,images } from '../../constants';

const SelectBeneficiaryCard = ({item,onPress}) => {
    return (
        <Pressable onPress={onPress}>
          <View>
            <View style={styles.allAccountCardContainer}>
              <Image
                source={images.keyMobileLogoRound}
                style={styles.logoImage}
              />
              <View>
                <Text style={styles.accountNameText}>{item.accountname}</Text>
                <View style={styles.accountDetailsContainer}>
                  <Text style={styles.accountTypeText}>{item.bankname}</Text>
                  <Text style={styles.accountNoText}>{item.accountnumber}</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      );
}

export default SelectBeneficiaryCard

const styles = StyleSheet.create({
    allAccountCardContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.secondaryBlue2,
      },
      accountDetailsContainer: {
        flexDirection: "row",
      },
    accountNameText: {
        color: COLORS.primaryBlue,
        fontFamily: FONTS.normal,
        fontSize: 16,
      },
      accountTypeText: {
        color: COLORS.grey,
        fontFamily: FONTS.normal,
        marginRight: 5,
      },
      accountNoText: {
        color: COLORS.primaryBlue,
        fontFamily: FONTS.normal,
        marginRight: 5,
      },
      logoImage: {
        width: 40,
        height: 40,
        marginRight: 20,
      },
})