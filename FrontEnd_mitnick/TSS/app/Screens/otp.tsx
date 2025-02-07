import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from 'axios';
import { useNavigation, useRouter, useLocalSearchParams, Link, usePathname } from "expo-router";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30); // Countdown timer for resend
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { mobileNumber } = params;


  const handleChange = (value : any, index: any) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < otp.length - 1) {
      const nextInput = index + 1;
      inputs[nextInput].focus();
    }
    setOtp(newOtp);
  };

  // Refs for TextInput
  const inputs = [];

  const handleVerify = async() => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 4) {
      alert(`OTP entered: ${enteredOtp}`);
      
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        Your one-time password has been sent to +91 + {mobileNumber}
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            ref={(ref) => (inputs[index] = ref)}
          />
        ))}
      </View>
      <Text style={styles.resendText}>
        Didn’t receive code? Resend it in {timer}s
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
      <Link href={{pathname:'/Screens/userProfileReg',params:{mobileNumber,otp}}}><Text style={styles.buttonText}>Verify</Text></Link>
        
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By proceeding, I agree to the Terms & Conditions.
      </Text>
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
    fontSize: 20,
    color: "#FFC107",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: "#f5fbfc",
    color: "#00000",
    fontSize: 18,
    textAlign: "center",
    borderRadius: 8,
  },
  resendText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFC107",
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 40,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#000000",
    textAlign: "center",
    marginTop: 20,
  },
});

export default OtpScreen;
