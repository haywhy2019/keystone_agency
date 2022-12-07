import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { BarCodePoint } from "expo-camera/build/Camera.types";
import { COLORS, GLOBAL_STYLE, isAndroid, SIZES } from "../../../constants";
import QRCode from "react-native-qrcode-svg";
import { CustomButton, CustomSnackBar,SpinnerImage } from "../../../components";
import { GalleryIcon } from "../../../constants/icons";
import { scanNqrAction } from "../../../utilities/redux/keyMobile/axiosService/nqr";
import { useNavigation } from "@react-navigation/native";

const QrcodeReader = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation=useNavigation();
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")

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

  if(loading) {
    return <SpinnerImage />
  }



  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={(...args) => {

          const data = args[0].data;
         let result = JSON.stringify(data);

         setLoading(true)
         scanNqrAction({mch_no:result})
           .then((res) => {
             console.log(res.data, "nqr ressss------");
             if(res?.data?.responseCode== "00"){
               navigation.replace("NqrPayment",{nqrString: res.data});
             }else{
               setError("An error occured")
             }
             
             
           })
           .catch((err) => {
             console.log(err, "errr");
             setError(err.message || "An error occured")
           }).finally(() => setLoading(false));
       
         
          
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
              justifyContent: "flex-end",
              width: SIZES.responsiveWidth("80%"),
              alignItems: "center",
            },
          ]}
        >
          
          <CustomButton
            buttonText={"Choose from Gallery"}
            buttonTextStyle={{
              paddingHorizontal: SIZES.responsiveWidth("2%"),
              paddingVertical: SIZES.responsiveWidth("2%"),
              textTransform:'capitalize'
            }}
            buttonContainerStyle={{ backgroundColor: COLORS.primaryBlue2 }}
            onPress={() => null}
          />
        </View>
      </View>
      <CustomSnackBar show={error} message={error}/>
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
