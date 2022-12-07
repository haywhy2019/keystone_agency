import React , { useState, useEffect } from 'react'
import * as Device from "expo-device";


 function PhoneDetails() {
// const [deviceName, setDeviceName] = useState(null)
// const [deviceManufacturer, setDeviceManufacturer] = useState(null)
// const [deviceDetails, setDeviceDetails] = useState(null)
// const [devicePlatform, setDevicePlatform] = useState(null)
// const [deviceVersion, setDeviceVersion] = useState(null)
// const [deviceSerial, setDeviceSerial] = useState(null)
// const [deviceId, setDeviceId] = useState(null)


  
const deviceName = Device.brand;
const deviceManufacturer = Device.manufacturer;
const deviceDetail = Device.modelName;
const devicePlatform = Device.osName;
const deviceVersion = Device.osVersion;
const deviceSerial = Device.osBuildId;
const deviceId = Device.osInternalBuildId;
  



  return [deviceName, deviceManufacturer, deviceDetail, devicePlatform,deviceVersion,deviceSerial,deviceId]
}

export default PhoneDetails