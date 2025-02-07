import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import OtpScreen from "./otp";
import { Link, router, useNavigation } from "expo-router";
import axios from 'axios';
import { useLocalSearchParams } from "expo-router";

import { RootStackParamList } from '../../api/type'; // Import the types

type Navigation = {
  navigate: <T extends keyof RootStackParamList>(screen: T, params: RootStackParamList[T]) => void;
};

const AadharLinkedMobileScreen = () => {
 // const { post } = useLocalSearchParams();
  const navigation = useNavigation<Navigation>();

  // useEffect(() =>{
  //   navigation.setOptions({ headerShown: false });
  // },[navigation]);
  
  const [mobileNumber, setMobileNumber] = useState("");
  const handleProceed = async () => {
    if (mobileNumber.trim() === "") {
      alert("Please enter a valid mobile number.");
    } else {
      alert("Proceeding with mobile number: " + mobileNumber);
      try{
        const response = await axios.post("http://10.0.2.2:3000/api/send-otp", {
          "userPhone": mobileNumber,
        });

        if(response.data){
          alert("Otp send successfully")
          router.navigate({pathname:'/Screens/otp',params:{mobileNumber}});
        }
        else{
          alert("Failed to send otp")
          
        }
      }catch(e){
        alert(e)
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Aadhar Linked Mobile Number</Text>
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" }}
          style={styles.flagIcon}
        />
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Please enter Mobile Number"
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
        />

      </View>
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
      {/* <Link href={{pathname:'/Screens/otp',params:{mobileNumber}}}></Link>  */}
      <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
      <Link href={'/Screens/LoginPage'}><Text style={styles.buttonText}>Already User Login!</Text></Link> 
           
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E153A",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    color: "#FFC107",
    textAlign: "center",
    marginBottom: 30,
    fontWeight:"bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5fbfc",
    borderRadius: 8,
    padding: 10,
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  countryCode: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#000000",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FFC107",
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AadharLinkedMobileScreen;


