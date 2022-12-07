import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { faqAction } from "../../../utilities/redux/keyMobile/axiosService/faq";
import { GLOBAL_STYLE } from "../../../constants";
import { FaqQuestionCard } from "../../components";

const FaqMenu = () => {
  const [faq, setFaq] = useState([]);
 const [hardFaq, setHardFaq] =useState([])
  const allFaq = () => {
    faqAction()
      .then((res) => {
        console.log(res, "faq");
        setFaq(res.data);
      })
      .catch((err) => {
        console.log(err, "errr");
      });
  };
  useEffect(() => {
    allFaq();
  }, []);


  const FaqItem = ({ item, index }) => {
 
    return (
      <View>
        <FaqQuestionCard 
        label= {item.Question} 
        item={item}
        index={index + 1}
        
        />    
      </View>
    );
  };
  return (
    <FlatList
      style={GLOBAL_STYLE.background}
      ListHeaderComponent={
        <Text style={[GLOBAL_STYLE.h4Bold, { textAlign: "center",marginVertical: 10 }]}>
          Frequently Asked Question
        </Text>
      }
      data={faq}
      renderItem={FaqItem}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <Text style={[GLOBAL_STYLE.h5Bold, { textAlign: "center" }]}>
          No faq
        </Text>
      }
    />
  );
};

export default FaqMenu;

const styles = StyleSheet.create({});
