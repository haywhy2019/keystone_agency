import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { BarCodePoint } from "expo-camera/build/Camera.types";
import { COLORS, GLOBAL_STYLE, isAndroid, SIZES } from "../../../../constants";
import QRCode from "react-native-qrcode-svg";
import { CustomButton } from "../../../../components";
import { GalleryIcon } from "../../../../constants/icons";
import { scanNqrAction } from "../../../../utilities/redux/keyMobile/axiosService/nqr";

const QrcodeReader = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={(...args) => {
          const data = args[0].data;
         let result = JSON.stringify(data);
          navigation.navigate("NqrPayment",{nqrString: result});
        }}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
        style={{ flex: 1 }}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: COLORS.white, marginTop: 20 }}>Scan NQR</Text>
      </View>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <View
          style={styles.nqrBox}
        ></View>
      </View>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: SIZES.responsiveHeight("3%"),
          },
        ]}
      >
        <View
          style={[
            GLOBAL_STYLE.rowBetween,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              width: SIZES.responsiveWidth("80%"),
              alignItems: "center",
            },
          ]}
        >
          <TouchableOpacity
            style={GLOBAL_STYLE.iconBg}
            //onPress={() => navigation.navigate("NqrCreatePayments")}
            // onPress={() => navigation.navigate("NqrPayment")}
          >
            <GalleryIcon color={"white"} />
          </TouchableOpacity>
          <CustomButton
            buttonText={"Create Merchant"}
            buttonTextStyle={{
              paddingHorizontal: SIZES.responsiveWidth("2%"),
              paddingVertical: SIZES.responsiveWidth("2%"),
            }}
            buttonContainerStyle={{ backgroundColor: COLORS.primaryBlue2 }}
            onPress={() => navigation.replace("NqrMerchant")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  nqrBox: 
    {
      width: SIZES.responsiveWidth("50%"),
      height: SIZES.responsiveWidth("50%"),
      borderWidth: 1,
      borderColor: COLORS.white,
    }
  ,
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default QrcodeReader;
