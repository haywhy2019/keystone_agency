import { View, Text, Button, NativeModules } from "react-native";
import React from "react";

const Pos = () => {
  var openActivity = NativeModules.OpenActivity;

  const openFunc = () => {
    console.log(openActivity, "opennn", NativeModules);
    openActivity.open();
  };

  const onPress = () => {
    console.log("clicked no working");
    openActivity.doKeyExchange();
  };
  const onPress1 = () => {
    console.log("clicked no working");
    openActivity.doGetParameters();
  };

  const onPress2 = () => {
    console.log("clicked no working");
    openActivity.doCardTransaction("20.00");
  };
 

  return (
    <View>
      {/* <Button title="lunach activity" onPress={() => openFunc()} /> */}
      <Button color="#841584" onPress={onPress} title="Key exchange" />
      <Button color="black" onPress={onPress1} title="Get parameter" />
      <Button color="black" onPress={onPress2} title="Transaction Purchase" />

    </View>
  );
};

export default Pos;
