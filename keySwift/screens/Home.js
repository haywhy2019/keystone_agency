import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState , useContext} from "react";
import { COLORS, SIZES } from "../../constants";
import {
  SendIcon,
  TimerIcon,
  TimerIcon2,
  CounterIcon,
} from "../../constants/icons";
import AtmCard from "../../components/AtmCard";
import BalanceCard from "../components/BalanceCard";
import { AntDesign } from "@expo/vector-icons";
import RecentTransactionCard from "../components/RecentTransactionCard";
// import { AuthContext } from "../../utilities/context/AuthContext";

const Home = ({ navigation, route }) => {
  // const { userName } = route.params;
  const [sliderIndex, setSliderIndex] = useState(0);
  const userData = [
    { name: "Account Summary", icon: "ios-eye-off-sharp" },
    { name: "sola2", icon: "" },
  ];

  const user2Data = [
    {
      ref: "123456789101011",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "123456789101011",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "123456789101011",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
    {
      ref: "123456789101011",
      amount: "10,000",
      detail: "Salary payment for march",
      date: "20 November 2020",
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: "LIzzy",
    });
  }, []);

  // const {user} = useContext(AuthContext)
  return (
    <ScrollView style={styles.container1}>
      <View >
        <StatusBar style="light" />
        
        <View style={styles.container2}>
          <FlatList
            data={userData}
            renderItem={AtmCard}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            onMomentumScrollEnd={(event) => {
              const index = Math.ceil(
                Math.floor(event.nativeEvent.contentOffset.x) /
                  Math.floor(event.nativeEvent.layoutMeasurement.width)
              );
              setSliderIndex(index);
            }}
          />

          <View style={styles.indicatorContainer}>
            {userData.map((item, id) => (
              <View
                key={id}
                style={sliderIndex == id ? styles.indicator2 : styles.indicator}
              ></View>
            ))}
          </View>
        </View>
        <View style={styles.container3}>
          <View style={styles.balanceContainer}>
            <BalanceCard
              name="Total Amount Transfered"
              icon={<SendIcon />}
              amount="250,000.00"
              color={COLORS.primaryBlue}
            />
            <BalanceCard
              name="Pending Requests"
              icon={<TimerIcon />}
              number="25"
              color={COLORS.primaryYellow}
            />
          </View>
          <View style={styles.balanceContainer}>
            <BalanceCard
              name="Last Amount Transfered"
              icon={<TimerIcon />}
              amount="50,000.00"
              color={COLORS.primaryGreen}
            />
            <BalanceCard
              name="Last Transfer Count"
              icon={<CounterIcon />}
              amount="5"
              color={COLORS.primaryGreen}
            />
          </View>
        </View>
        <View style={styles.container4}>
          <Text style={styles.container4Text}>Recent Requests</Text>
          <AntDesign name="arrowright" size={18} color={COLORS.primaryBlue} />
        </View>
        <View style={styles.container3}>
          {user2Data.map((item, index) => (
            <RecentTransactionCard key={index} item={item} />
          ))}
        </View>
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: COLORS.white,
  },
  container2: {
    marginVertical: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    backgroundColor: COLORS.grey,
    height: 7,
    width: 7,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  indicator2: {
    backgroundColor: COLORS.primaryBlue,
    height: 7,
    width: 7,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  container3: {
    paddingHorizontal: 10,
  },
  balanceContainer: {
flexDirection: 'row'
  },
  container4: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  container4Text: {
    color: COLORS.primaryBlue,
    fontWeight: "bold",
  },
});

export default Home;
