import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, GLOBAL_STYLE } from "../../constants";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SpinnerImage } from "../../components";
import { useDispatch } from "react-redux";
import { notificationAction } from "../../utilities/redux/keyMobile/actions/notificationAction";
import { EmptyList } from "../components";

const Notification = () => {
  const dispatch = useDispatch()
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  const notification = useSelector((state) => state.notification.success);
  const loading = useSelector((state) => state.notification.loading);
  const error =  useSelector((state) => state.notification.error);

  useEffect(() => {
    dispatch(notificationAction())
  }, []);

  console.log(notification, "notification")
if(loading == "pending"){
  return <SpinnerImage />
}

if(error == "error"){
  return   <EmptyList emptyText={"An Error Occured"} noData/>
}
  const NotificationCard = ({ item }) => {
    return (
      <TouchableOpacity
      onPress={() => setShow(item.id)}
      >
        <View
          style={[
            GLOBAL_STYLE.rowBetween,
            { justifyContent: "flex-start", paddingVertical: 15 },
          ]}
        >
          <View style={{ marginTop: 2 }}>
            <FontAwesome
              name="envelope"
              size={16}
              color={COLORS.primaryYellow}
            />
          </View>

          <View
            style={[
              GLOBAL_STYLE.rowBetween,
              {
                justifyContent: "space-between",
                flexGrow: 1,
                marginLeft: 10,
              },
            ]}
          >
            <View style={{ flex: 2 }}>
              <Text style={[GLOBAL_STYLE.h4Bold]}>{item.Subject}</Text>
              {show == item.id ? (
                <View>
                  <Text style={[GLOBAL_STYLE.h5]}>{item.Message}</Text>
                  <Text style={[GLOBAL_STYLE.h5, { textAlign: "right" }]}>
                    {moment(item.DateAdded).format(" MMM Do YYYY")}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={{}}>
              <FontAwesome
                name="chevron-down"
                size={10}
                color={COLORS.primaryBlue}
             
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      style={GLOBAL_STYLE.background}
      data={notification}
      ListEmptyComponent={
        <EmptyList emptyText={"No Notification"} noData/>
      }
      renderItem={NotificationCard}
      key={(item, index) => index.toString()}
    />
  );
};

export default Notification;

const styles = StyleSheet.create({});
