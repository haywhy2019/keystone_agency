import {useState} from 'react';
import {StyleSheet,View, Text, FlatList, Dimensions } from 'react-native';
import { COLORS} from "../constants";

//components
import AtmCard from "./AtmCard";



const ATMCardSlider=({userData, onPress})=>{
	const [sliderIndex, setSliderIndex] = useState(0);
	
	const renderAtmCard = ({item,index}) => {
		return (<AtmCard 
			item={item} cardIndex={index} onPress={onPress}
			/>)
	}

	return(
		<View style={styles.container2}>
				  <FlatList
					data={userData}
					renderItem={renderAtmCard}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item, index) => index}
					snapToAlignment={'start'}
					snapToInterval={Dimensions.get('screen').width}
					onMomentumScrollEnd={(event) => {
					  const index = Math.ceil(
						Math.floor(event.nativeEvent.contentOffset.x) /
						  Math.floor(event.nativeEvent.layoutMeasurement.width)
					  );
					  setSliderIndex(index);
					}}
				  />

				  <View style={styles.indicatorContainer}>
					{userData.map((item, id) => (
					  <View
						key={id}
						style={sliderIndex == id ? styles.indicator2 : styles.indicator}
					  ></View>
					))}
				  </View>
        </View>
	)
}

export default ATMCardSlider;

  const styles = StyleSheet.create({
	  container2: {
		marginVertical: 10,
		paddingLeft:5
	  },
	  indicatorContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10,
	  },
	  indicator: {
		backgroundColor: COLORS.grey,
		height: 7,
		width: 7,
		borderRadius: 20,
		marginHorizontal: 2,
	  },
	  indicator2: {
		backgroundColor: COLORS.primaryBlue,
		height: 7,
		width: 7,
		borderRadius: 20,
		marginHorizontal: 2,
	  }
	  
  });