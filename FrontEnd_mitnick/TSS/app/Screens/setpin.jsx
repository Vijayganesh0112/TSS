import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import axios from 'axios';

const { width } = Dimensions.get('window');

// Set Pin Page
const SetPinScreen = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');

  const handlePinInput = (value) => {
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmitPin = async () => {
//     if (pin.length === 4) {
//       try {
//         await axios.post('https://your-backend-api.com/setPin', { pin });
      navigation.navigate('ConfirmPin');
//       } catch (error) {
//         Alert.alert('Error', 'Unable to set PIN. Please try again.');
//       }
//     } else {
//       Alert.alert('Invalid PIN', 'Please enter a 4-digit PIN.');
//     }
 };

  return (
    <PinScreenLayout
      title="Set PIN"
      pin={pin}
      handlePinInput={handlePinInput}
      handleBackspace={handleBackspace}
      handleSubmitPin={handleSubmitPin}
    />
  );
};

// Confirm Pin Page
const ConfirmPinScreen = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleConfirmPinInput = (value) => {
    if (confirmPin.length < 4) {
      setConfirmPin(confirmPin + value);
    }
  };

  const handleBackspace = () => {
    setConfirmPin(confirmPin.slice(0, -1));
  };

  const handleSubmitPin = () => {
    if (pin === confirmPin) {
      Alert.alert('Success', 'PIN set successfully!');
      navigation.navigate('EnterPin');
    } else {
      Alert.alert('Error', 'PINs do not match. Please try again.');
      setConfirmPin('');
    }
  };

  return (
    <PinScreenLayout
      title="Confirm PIN"
      pin={confirmPin}
      handlePinInput={handleConfirmPinInput}
      handleBackspace={handleBackspace}
      handleSubmitPin={handleSubmitPin}
    />
  );
};

// Enter Pin Page
const EnterPinScreen = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');

  const handlePinInput = (value) => {
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

//   const handleSubmitPin = async () => {
//     try {
//       const response = await axios.post('https://your-backend-api.com/verifyPin', { pin });
//       if (response.data.success) {
//         Alert.alert('Success', 'PIN verified successfully!');
//         navigation.navigate('HomePage');
//       } else {
//         Alert.alert('Error', 'Incorrect PIN. Please try again.');
//         setPin('');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to verify PIN. Please try again.');
//     }
//   };

  return (
    <PinScreenLayout
      title="Enter PIN"
      pin={pin}
      handlePinInput={handlePinInput}
      handleBackspace={handleBackspace}
      handleSubmitPin={handleSubmitPin}
    />
  );
};

// Reusable Pin Screen Layout
const PinScreenLayout = ({ title, pin, handlePinInput, handleBackspace, handleSubmitPin }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.lockIcon}>🔒</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.pinDotsContainer}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={[styles.dot, pin.length > i && styles.filledDot]} />
        ))}
      </View>
      <View style={styles.keypadContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'back'].map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.key}
            onPress={() => {
              if (value === 'back') {
                handleBackspace();
              } else if (value !== '') {
                handlePinInput(value);
              }
            }}
          >
            <Text style={styles.keyText}>{value === 'back' ? '⌫' : value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPin}>
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A5C', alignItems: 'center', justifyContent: 'center' },
  lockIcon: { fontSize: 40, color: '#FFD700', marginBottom: 20 },
  title: { color: '#FFD700', fontSize: 22, fontWeight: 'bold', marginBottom: 40 },
  pinDotsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 40 },
  dot: { width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: '#A7A7A7', marginHorizontal: 10 },
  filledDot: { backgroundColor: '#FFD700' },
  keypadContainer: { flexDirection: 'row', flexWrap: 'wrap', width: width * 0.8, justifyContent: 'space-between' },
  key: { width: width * 0.25, height: width * 0.25, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  keyText: { fontSize: 28, color: '#FFD700' },
  submitButton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, marginTop: 30 },
  submitButtonText: { color: '#1A1A5C', fontSize: 18, fontWeight: 'bold' },
});

export default SetPinScreen;