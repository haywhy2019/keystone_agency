import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { CustomButton, Input, DropDownInput, CustomFilePicker, CustomCamera } from "../../../../../components";
import { ModalList, BankListItemCard , StepperIndicator} from "../../../../components";
import { COLORS, FONTS, GLOBAL_STYLE, SIZES } from "../../../../../constants";
import { loanAccountDetailAction } from "../../../../../utilities/redux/keyMobile/actions/loanActions";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";

import { FontAwesome } from "@expo/vector-icons";

const Step1 = ({ navigation}) => {
  const dispatch = useDispatch();
  const [acctNo, setAcctNo] = useState("");
  const [bankModal, setBankModal] = useState(false);
  const [checked, setChecked] = useState(false);
const [workId, setWorkId] = useState(false)
  const [selectedAcct, SetSelectedAcct] = useState("");
  let accountdigit = /^\d{10}$/;

  const { accounts } = useSelector((state) => state.auth.user);
  const accountDetails = useSelector((state) => state.loan.success);

  // useEffect(() => {
  //   if (acctNo.match(accountdigit)) {
  //     dispatch(loanAccountDetailAction(acctNo));
  //     console.log("working");
  //   }
  // }, [acctNo]);
  const EmployerListItem = ({item, onPress}) => {
   
    return (
      <Pressable
        style={{
          paddingVertical: 10,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.primaryBlue,
        }}
        onPress={onPress}
      >
        <View
          style={[
            GLOBAL_STYLE.rowBetween,
            { justifyContent: "flex-start", paddingHorizontal: "5%" },
          ]}
        >
            <Feather name="chevron-down"  size={16}
            color={COLORS.primaryBlue2}
            style={{ marginRight: 5 }} />
        
          <Text style={[GLOBAL_STYLE.h4, { color: COLORS.primaryBlue2 }]}>
            {item.BankName}
          </Text>
        </View>
      </Pressable>
    );
 

}

  const toggleChecked = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (accountDetails) {
      SetSelectedAcct(accountDetails.NUBANACCOUNTNO);
    }
  }, [accountDetails]);

  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobal}>
        <View style={{}}>
      <StepperIndicator stepCount={3} currentPosition={1}/>
        
        <Text style={[GLOBAL_STYLE.h3Bold, { textAlign: "center" }]}>
        Employer Details 
        </Text>
       
          <Text style={[GLOBAL_STYLE.h4, { textAlign: "center" }]}>
          Kindly provide your employment details
          </Text>

        

          <ModalList
            placeholder="Select Industry"
            // value={values.bank.BankName}
            // error={""}
            icon={
              <Pressable
                onPress={() => {
                  //   setBankModal(true);
                }}
                style={{
                  height: 45,
                  width: 40,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="chevron-down"
                  size={14}
                  color={COLORS.primaryBlue}
                />
              </Pressable>
            }
            // visible={bankModal}
            onRequestClose={() => setBankModal(false)}
            // data={bankList}
            // renderItem={({ item, index }) =>
            //   DisplayBank(item, index)
            // }
            renderItem={EmployerListItem}
            emptyListText={
              <Text style={GLOBAL_STYLE.h4Bold}>An error occured</Text>
            }
            // error={errors.bank && touched.bank && errors.bank}
          />
                    <ModalList
            placeholder="Select Employer"
            // value={values.bank.BankName}
            // error={""}
            icon={
              <Pressable
                onPress={() => {
                  //   setBankModal(true);
                }}
                style={{
                  height: 45,
                  width: 40,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="chevron-down"
                  size={14}
                  color={COLORS.primaryBlue}
                />
              </Pressable>
            }
            // visible={bankModal}
            onRequestClose={() => setBankModal(false)}
            // data={bankList}
            // renderItem={({ item, index }) =>
            //   DisplayBank(item, index)
            // }
            renderItem={EmployerListItem}
            emptyListText={
              <Text style={GLOBAL_STYLE.h4Bold}>An error occured</Text>
            }
            // error={errors.bank && touched.bank && errors.bank}
          />

<View >
			<CustomFilePicker
				label={'Work ID (Front)'}
				/>
			<CustomFilePicker
				label={'Work ID (Back)'}
				/>
			<CustomFilePicker
				label={'Valid ID (Government Issued)'}
				/>
			
      {/* <CustomCamera 
      component={<View>
          <Text style={GLOBAL_STYLE.h4}>
          Work ID (Front)
        </Text>
        <Text style={GLOBAL_STYLE.h4}>
          Work ID (Back)
        </Text>
        <Text style={GLOBAL_STYLE.h4}>
        Valid ID (Government Issued)
        </Text>
      </View>}
      label={'Work ID (Front)'}
      show={workId}
      onPress={() => setWorkId(!workId)}
      /> */}
  
		</View>
     
        </View>
      
   

      <View style={styles.button}>
        <CustomButton
          buttonText={"Continue"}
          buttonContainerStyle={{marginBottom: 20}}
          onPress={() => navigation.navigate("SalaryForm2")}
           
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
  },
  checkContainer: {
    flexDirection: "row",
    // alignItems: "center",
    marginVertical: 10,
  },
  button:{flex: 1, alignSelf:'stretch', justifyContent: "flex-end"}
});

export default Step1;
