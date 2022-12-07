import { Image,TouchableOpacity,Text} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isAndroid,images,FONTS,COLORS,SIZES } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//screens
import {RewardsMenu,
  MyRewardScreen,
  ReferFriendMenu,
  InviteFriend,
  MyGifts,
GiftAFriend,RedeemPoints} from './index'

const Stack=createNativeStackNavigator();

const RewardStack=()=>{
    return(
    <Stack.Navigator
        initialRouteName="RewardsMenu"
        screenOptions={(navigation,route)=>(
            {
                headerShown:true,
                animation: "slide_from_right",
                headerTitleStyle: {
                  color: isAndroid ? "white" : COLORS.primaryBlue,
                  fontFamily: FONTS.bold,
                  marginTop: 7,
                  fontSize: SIZES.responsiveHeight("2%"),
                },
                headerTitleAlign: "center",
                headerBackground: () => {
                    if (isAndroid) {
                      return (
                        <Image
                          source={images.headerImg}
                          style={{ width: "100%", height: "100%" }}
                        />
                      );
                    }
                  }, 
                  headerLeft: () => {
                    const navigation=useNavigation()
                    return(
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => navigation.goBack()}
                      >
                        <Ionicons
                          name="chevron-back"
                          size={20}
                          color={isAndroid ? COLORS.white : COLORS.primaryBlue}
                        />
                        <Text
                          style={{ color: isAndroid ? COLORS.white : COLORS.primaryBlue }}
                        >
                          Back
                        </Text>
                      </TouchableOpacity>
                  ) 
                } 
                
            }
        )}
    >
        <Stack.Screen 
            name="RewardsMenu"
            component={RewardsMenu}
            options={{ 
              title: "Rewards/Referrals",
              headerLeft: () => {
                const navigation=useNavigation()
                return(
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={20}
                      color={isAndroid ? COLORS.white : COLORS.primaryBlue}
                    />
                    <Text
                      style={{ color: isAndroid ? COLORS.white : COLORS.primaryBlue }}
                    >
                      Back
                    </Text>
                  </TouchableOpacity>
              ) 
            }  }}
        />
        <Stack.Screen
                name="MyRewardScreen"
                component={MyRewardScreen}
                options={{ title: "Rewards/Referrals" }}
              />
        <Stack.Screen
                name="ReferFriendMenu"
                component={ReferFriendMenu}
                options={{ title: "Invite Friends" }}
              />
        <Stack.Screen
                name="InviteFriend"
                component={InviteFriend}
                options={{ title: "Invite Friends" }}
              />
        <Stack.Screen
                name="MyGifts"
                component={MyGifts}
                options={{ title: "My Gifts" }}
              />
        <Stack.Screen
                name="GiftAFriend"
                component={GiftAFriend}
                options={{ title: "Gift Friend" }}
              />
        <Stack.Screen
                name="RedeemPoints"
                component={RedeemPoints}
                options={{ title: "Redeem Points" }}
              />
        
    </Stack.Navigator>
    )
}

export default RewardStack