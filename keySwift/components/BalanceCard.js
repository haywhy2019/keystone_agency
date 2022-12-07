import react from "react";
import { View, Text} from "react-native";
import { COLORS} from "../../constants";


const BalanceCard = ({ name, color,amount, number ,icon}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        margin: 8,
        borderRadius: 10,
        height: 100,
        elevation: 5,
        overflow: "hidden",
        paddingHorizontal: 7,
        borderLeftWidth: 5,
        borderLeftColor: color,
        width: '50%'
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 20,
        }}
      >
        <Text
          style={{
            marginRight: 20,
            color: COLORS.primaryBlue,
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          {name}
        </Text>
        <View>{icon}</View>
      </View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          marginLeft: 5,
          color: COLORS.primaryBlue,
        }}
      >
        {amount ? "\u20A6" + amount : number}
      </Text>
    </View>
  );
};

export default BalanceCard;
