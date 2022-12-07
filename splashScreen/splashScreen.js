import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  Pressable,
  Image,
  Linking,
  Alert,
  Platform,
  BackHandler,
} from "react-native";
import {
  HomeIcon,
  BeyondBankingSvg2,
  SplashScreenContactUsIcon,
  SplashScreenFbIcon,
  SplashScreenTwitterIcon,
  SplashScreenIgIcon,
} from "../constants/icons";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

// import RNExitApp from 'react-native-exit-app';

// import {openAccount} from '../account_opening/store/useOpenAccount';

import { Video, AVPlaybackStatus } from "expo-av";

import { styles } from "./styles";

const splashScreenVideo = require("../assets/video/intro1.mp4");

export default function SplashScreen(props) {
  const navigation = useNavigation();

  const dispatch = useDispatch();
 

  return (
    <View style={styles.root}>
      <StatusBar style="light"/>
      <Video
        source={splashScreenVideo}
        isLooping
        shouldPlay
        resizeMode="stretch"
        style={{
          // height: height,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View style={{ marginTop: "30%", marginLeft: "5%", zIndex: 30 }}>
        <BeyondBankingSvg2 />
      </View>
      <View style={{ flex: 1, zIndex: 40}}>
        <View
          style={{
            position: "absolute",
            bottom: -1,
            right: 20,
            left: 20,
            marginBottom: 9, 
          }}
        >
          <Pressable
            style={styles.loginMobileBtn}
            onPress={() => navigation.push("key mobile")}
          >
            {/* <Text style={styles.btnMobileText}>Mobile Banking</Text> */}
            <Text style={styles.btnMobileText}>Agent Banking</Text>

          </Pressable>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            
              // paddingHorizontal: "4.5%",
            }}
          >
           
            <Pressable
              style={styles.loginKeySwiftBtn}
              onPress={async () =>
                await Linking.openURL("https://keyswift.keystonebankng.com/Keyswift/Dashboard")
              }
              
            >
            

              {/* <Text style={styles.btnKeySwiftText}>Keyswift</Text> */}
              <View>
                <Text style={[styles.btnInternetBanking, {textTransform: "uppercase"}]}>CORPORATE</Text>
                <Text style={styles.btnInternetBanking}>Internet Banking</Text>
              </View>

            </Pressable>
            <Pressable
              style={styles.loginKeySwiftBtn}
              onPress={ async () =>
                await Linking.openURL("https://ibank.keystonebankng.com/ibank/")}
            >
             

              {/* <Text style={styles.btnKeySwiftText}>Internet Banking</Text> */}

              <View>
                <Text style={[styles.btnInternetBanking, {textTransform: "uppercase"}]}>RETAIL</Text>
                <Text style={styles.btnInternetBanking}>Internet Banking</Text>
              </View>

            </Pressable>
          </View>

          <Pressable
            style={styles.newAccountBtn}
            onPress={() => navigation.navigate("account opening")}
          >
            <HomeIcon />
            <Text style={styles.btnNewAccountText}>Open account</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.socialIconsContainer}>
        <Pressable style={styles.socailIconsContainer2}
        onPress={() => navigation.navigate("EnquiresScreen")}
        >
          <SplashScreenContactUsIcon style={styles.socialIcons} />
          <Text style={styles.iconText}>Contact Us</Text>
        </Pressable>
        <View style={styles.socailIconsContainer2}>
          <Pressable
            onPress={async () =>
              await Linking.openURL("https://web.facebook.com/keystonebank")
            }
          >
            <SplashScreenFbIcon style={styles.socialIcons} />
          </Pressable>
          <Pressable
            onPress={async () =>
              await Linking.openURL("https://twitter.com/keystonebankng")
            }
          >
            <SplashScreenTwitterIcon style={styles.socialIcons} />
          </Pressable>
          <Pressable
            onPress={async () =>
              await Linking.openURL("https://www.instagram.com/keystonebankng")
            }
          >
            <SplashScreenIgIcon style={styles.socialIcons} />
          </Pressable>
        </View>
      </View>
      <View style={styles.overlay}></View>
    </View>
  );
}
