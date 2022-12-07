import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ProfileAvatar } from "../../constants/icons";
import { COLORS } from "../../constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {Input, CustomButton} from "../../components/";


const Profile = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container1}>
        <ProfileAvatar />
        <Text style={styles.container1Text}>Elizabeth Oliseh (Initiator)</Text>
      </View>
      <View style={styles.container2}>
        <View>
          <Input
            placeholder="Enter your username"
            icon={<AntDesign name="user" size={16} color={COLORS.grey} />}
          />
          <Input
            placeholder="Enter Old password"
            icon={<AntDesign name="eyeo" size={16} color={COLORS.grey} />}
          />
          <Input
            placeholder="Enter New password"
            icon={<AntDesign name="eyeo" size={16} color={COLORS.grey} />}
          />
        </View>

        <View style={styles.button}>
          <CustomButton
            buttonText="Reset Password"
            onPress={() =>
              navigation.navigate("home", {
                userName: "Hi Lizzy 👋",
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    alignItems: "center",
    backgroundColor: COLORS.grey2,
    padding: 40,
  },
  container1Text: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 13,
    color: COLORS.primaryBlue,
  },
  container2: {
    flex: 1,
    paddingHorizontal: "10%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    marginBottom: '10%'
  }
});
export default Profile;
