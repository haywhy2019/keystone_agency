import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { LoanOnBoardingIcon } from "../../../constants/icons";
import { CustomButton } from "../../../components";
import { COLORS , FONTS} from "../../../constants";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import LoanMenu from "./LoanMenu"
import LoanDashboard from "./dashBoard/Dashboard"

  
const renderScene = SceneMap({
  first: LoanMenu,
  second: LoanDashboard,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor={"white"}
    inactiveColor={COLORS.primaryBlue}
    style={{
      backgroundColor: "rgba(242, 242, 242, 0.25)",
      // height: 40,
      shadowOffset: { height: 0, width: 0 },
      // shadowColor: "transparent",
      shadowOpacity: 0,
      elevation: 1,
      // borderWidth: 1,
      // borderColor: COLORS.primaryBlue,
      // borderRadius: 5,
      overflow: "hidden",
    }}
    contentContainerStyle={{ alignItems: "center" }}
    indicatorContainerStyle={{ alignItems: "center" }}
    
    indicatorStyle={{ backgroundColor: COLORS.primaryBlue2, height: "100%" , borderBottomColor: COLORS.primaryBlue2, borderBottomWidth:5}}
    labelStyle={{ textTransform: "capitalize", fontFamily: FONTS.bold }}
  />
);

const LoanOnBoarding = ({navigation}) => {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Loan Request' },
    { key: 'second', title: 'Existing Loans' },
  ]);
  return (
    <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}
    renderTabBar={renderTabBar}
  />
  );
};

export default LoanOnBoarding;



// const LoanOnBoarding = ({navigation}) => {
//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//       <View style={styles.container1}>
//         <View style={styles.container2}>
//           <LoanOnBoardingIcon />
//           <Text style={styles.text}>
//             We offer a variety of lending options from personal loans to credit
//             card services with as gamut of features made possible by modern
//             technology.
//           </Text>
//         </View>
//         <View>
//           <CustomButton buttonText={"Loan Dashboard"} buttonContainerStyle={styles.outlineButton} buttonTextStyle={styles.outlineButtonText} onPress={() => navigation.navigate("LoanDashBoard")}/>
//           <CustomButton buttonText={"Loan Request"} onPress={() => navigation.navigate("LoanScreen")}/>  
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container1: {
//       flex: 1,
// flexDirection: "column",
//     justifyContent: 'space-between',
//     paddingHorizontal: '5%',
//     paddingVertical: 40
//   },
//   text: {
// color: '#77869E',
// textAlign: 'center',
// marginTop: 30
//   },
//   container2: {alignItems: 'center'},
//   outlineButton: {
//       backgroundColor: 'white',
//       borderWidth: 1,
//       borderColor: COLORS.primaryBlue,
//       marginBottom: 20
//   },
//   outlineButtonText:{
//       color: COLORS.primaryBlue
//   }

// });