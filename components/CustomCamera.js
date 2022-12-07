import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { GLOBAL_STYLE, COLORS, FONTS, SIZES } from "../constants";
import CustomButton from "./CustomButton";
import { EvilIcons } from "@expo/vector-icons";
import CustomSnackBar from "./CustomSnackBar";

export default function CustomCamera({
  label,
  labelInfo,
  onPress,
  fileName,
  show,
  error,
  component
}) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo1, setPhoto1] = useState();
  const [photo2, setPhoto2] = useState();
  const [photo3, setPhoto3] = useState();
  const [useCamera, setUseCamera] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  useEffect(() => {
if(show){
    setUseCamera(true)
}else{
    setUseCamera(false)
}
  },[show,onPress])
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto1(newPhoto);
    setSuccess(true)
    if(photo1){
        setPhoto2(newPhoto)
    setSuccess(true)

    }if (photo2){
        setPhoto3(newPhoto)
    setSuccess(true)

    }
    // setUseCamera(false)
  };

//   if (photo) {
//     let sharePic = () => {
//       shareAsync(photo.uri).then(() => {
//         setPhoto(undefined);
//       });
//     };

//     let savePhoto = () => {
//       MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
//         setPhoto(undefined);
//       });
//     };

//     return (
//       <SafeAreaView style={styles.container}>
//         <Image
//           style={styles.preview}
//           source={{ uri: "data:image/jpg;base64," + photo.base64 }}
//         />
//         <Button title="Share" onPress={sharePic} />
//         {hasMediaLibraryPermission ? (
//           <Button title="Save" onPress={savePhoto} />
//         ) : undefined}
//         <Button title="Discard" onPress={() => setPhoto(undefined)} />
//       </SafeAreaView>
//     );
//   }

console.log(photo1, photo2, photo3, "photo")
  return (
    <View>
        
      <View style={{ marginBottom: 20 }}>
        {/* <Text style={GLOBAL_STYLE.h4}>
          {label}
          <Text style={styles.labelInfo}>{labelInfo}</Text>
        </Text> */}
        {component}
        {!useCamera && (
              <View style={styles.dottedContainer}>
              <View style={styles.container}>
                <CustomButton
                  buttonText={"Scan file"}
                  buttonTextStyle={styles.button}
                  buttonContainerStyle={styles.buttonContainer}
                  onPress={onPress}
                />
                <Text style={styles.fileText}>
                  {fileName ? fileName?.slice(0, 15) : "No file choosen"}
                </Text>
              </View>
            </View>
        )}
      
        {error && <Text style={styles.formError}>{error}</Text>}
      </View>
<View style={!useCamera ? {display: "none"} : {display: "flex"}}>
      <Camera style={styles.cameraContainer} ref={cameraRef} />
      <View style={[GLOBAL_STYLE.rowAround, {marginBottom: 30}]}>
        <EvilIcons
          name="camera"
          size={50}
          color={COLORS.primaryBlue}
          onPress={takePic}
        />
      </View>
      </View>
      {/* <Camera style={styles.cameraContainer} ref={cameraRef} >

      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera> */}
    <CustomSnackBar 
    show={true}
    success={true}
    message={"Added successfully"}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    height: 450,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },

  label: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    fontSize: 16,
  },
  labelInfo: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
  },
  dottedContainer: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(30, 31, 32, 0.5)",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileText: {
    color: "rgba(30, 31, 32, 0.5)",
    fontSize: 14,
  },
  button: {
    paddingHorizontal: 40,
    color: "rgba(30, 31, 32, 0.5)",
  },
  buttonContainer: {
    height: 35,
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderColor: "rgba(0, 37, 97, 0.2)",
  },
  formError: {
    color: "red",
    fontSize: 10,
  },
});
