import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import Input from "../../../components/Inputs";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
import BankCodes from "../../components/BankCodes";

const AccountsCodes = () => {
  const data = [
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
    { code: "00010", name: "Stering Bank", status: "Active" },
  ];
  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <Input
          placeholder="Search Bank Code"
            icon={
              <AntDesign
                name="search1"
                size={18}
                color={COLORS.grey}
                onPress={() => console.log("icon")}
              />
            }
          />
        }
        ListHeaderComponentStyle={{ paddingHorizontal: 20 }}
        data={data}
        keyExtractor={(data, index) => index}
        renderItem={BankCodes}
      />
    </View>
  );
};

export default AccountsCodes;
