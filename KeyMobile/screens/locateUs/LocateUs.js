import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranchAtmAction } from "../../../utilities/redux/keyMobile/actions/branchAndAtmAction";
import { GLOBAL_STYLE, COLORS } from "../../../constants";
import { Input, SpinnerImage } from "../../../components";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const LocateUs = () => {
  const [searchText, setSearchText] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [branch, setBranch] = useState([]);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const branchAtmList = useSelector((state) => state.branchAtm.success);
  const branchAtmListLoading = useSelector((state) => state.branchAtm.pending);

  useEffect(() => {
    if (!branchAtmList) {
      dispatch(getBranchAtmAction());
    }
    if (branchAtmList) {
      setBranch(branchAtmList);
      setSearchBranch(branchAtmList)
    }
  }, [branchAtmList]);


  const BranchAtmCard = ({ item, index }) => {
    console.log(item, "address");
    const showDetails = () => {
        setShow(!show)
      }
    return (
      <View
        style={{
          paddingVertical: 10,
          borderWidth: 0.5,
          borderRadius: 5,
          borderTopColor: COLORS.primaryBlue,
          marginBottom: 15,
        }}
        onPress={() => console.log("test")}
      >
        <View
          style={[
            GLOBAL_STYLE.rowBetween,
            {
              justifyContent: "space-between",
              paddingHorizontal: "5%",
              alignItems: "center",
            },
          ]}
        >
          <Ionicons
            name="location-sharp"
            size={16}
            color={COLORS.primaryBlue2}
            style={{ marginRight: 5 }}
          />

          <Text style={[GLOBAL_STYLE.h4, { color: COLORS.primaryBlue2 }]}>
            {item.BranchAddress?.slice(0, 27)}
          </Text>
          <TouchableOpacity 
          style={{width: 40, justifyContent: "flex-end", flexDirection: "row"}}
          onPress={() => setShow(item.id)}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={COLORS.primaryBlue2}
            style={{ marginRight: 5 }}
           
          />
          </TouchableOpacity>
        
        
        </View>
        {show == item.id ? (
            <View style={{marginHorizontal: '5%', marginVertical: 9}}>
              <Text style={GLOBAL_STYLE.h4}>Address: {item.BranchAddress}</Text>
              <Text style={GLOBAL_STYLE.h4}>City: {item.City}</Text>
              <Text style={GLOBAL_STYLE.h4}>Active: {item.isActive ? "True" : "False"}</Text>
              <Text style={GLOBAL_STYLE.h4}>Number: {item.MobileNo ?  item.MobileNo : "Not Available"}</Text>
            </View>
          ) : null}
      </View>
    );
  };

  const filterBranch = (textToSearch) => {
    setSearchBranch(
      branch.filter((item) =>
        item.BranchAddress.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
    setSearchText(textToSearch);
  };
  if (branchAtmListLoading == "pending") {
    return <SpinnerImage />;
  }
  return (
    <FlatList
      style={[GLOBAL_STYLE.background, { marginVertical: 10 }]}
      ListHeaderComponent={
        <View>
          <Text style={[GLOBAL_STYLE.h3Bold, { textAlign: "center" }]}>
            Locate us
          </Text>
          <Input
            icon={<FontAwesome name="search" size={16} color={COLORS.grey} />}
            placeholder="search"
            value={searchText}
            onChangeText={(text) => filterBranch(text)}
          />
        </View>
      }
      ListEmptyComponent={
        <Text style={[GLOBAL_STYLE.h4Bold, { textAlign: "center" }]}>
          No Branch found
        </Text>
      }
      data={searchBranch}
      renderItem={BranchAtmCard}
      keyExtractor={(item, index) => index}
    />
  );
};

export default LocateUs;

const styles = StyleSheet.create({});
