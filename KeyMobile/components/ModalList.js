import { StyleSheet, Text, View, FlatList, Modal,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { GLOBAL_STYLE, COLORS } from "../../constants";
import { Input } from "../../components";
import { FontAwesome } from "@expo/vector-icons";
import { set } from "react-native-reanimated";

const ModalList = ({
  visible,
  icon,
  value,
  setVisible,
  headerText,
  emptyListText,
  data,
  searchValue,
  search,
  placeholder,
  inputPress,
  onChangeText,
  onRequestClose,
  renderItem,
  error,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [flatListData, setFlatListData] = useState("");
  useEffect(() => {
    if (visible) {
      setShow(true);
      setSearchText(searchValue)
      setFlatListData(data)
    }
    if (!visible) {
      closeModal();
    }
  }, [visible, onRequestClose,searchValue]);
// console.log(data, "data", searchValue, searchText)
  const closeModal = () => {
    onRequestClose();
    setShow(false);
    setSearchText("")
  };
  return (
    <View>
      <TouchableOpacity
        onPress={()=>setVisible ? setVisible() : setShow(true)}
      >
        <Input
          placeholderTextColor={COLORS.primaryBlue}
          editable={false}
          onPress={inputPress}
          value={value?.slice(0,37)}
          placeholder={placeholder}
          icon={icon}
          error={error}
        />
      </TouchableOpacity>
      <Modal visible={show} animationType="slide" onRequestClose={closeModal}>
        <FlatList
          ListHeaderComponent={
            search ? (
              <Input
                icon={
                  <FontAwesome name="search" size={16} color={COLORS.grey} />
                }
                placeholder="search"
                value={searchText}
                onChangeText={onChangeText}
              />
            ) : (
              <Text style={styles.listHeaderText}>{headerText}</Text>
            )
          }
          ListHeaderComponentStyle={{
            paddingHorizontal: "5%",
          }}
          data={flatListData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={
            <View style={{ paddingHorizontal: "5%" }}>
              <Text style={[GLOBAL_STYLE.h4, { textAlign: "center" }]}>
                {emptyListText}
              </Text>
            </View>
          }
          {...props}
        />
      </Modal>
    </View>
  );
};

export default ModalList;

const styles = StyleSheet.create({});
