// UserProfileRegistration.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { createUser } from '../../api/createUser';
import { Link, useLocalSearchParams } from 'expo-router';

const PLACEHOLDER_COLOR = "#8A8A8A";

const UserProfileRegistration = () => {
  const [userName, setName] = useState('');
  const [userPhone, setPhone] = useState('');
  const [userEmail, setEmail] = useState('');
  const params = useLocalSearchParams();
  const {monileNumber , otp}=params;

  
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    const userNameRegex = /^[A-Za-z ]+$/;
    const userEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userPhoneRegex = /^\d{10}$/;

    if (!userName || !userEmail || !userPhone) {
      Alert.alert('Error', 'Please fill out all fields.');
      return false;
    }

    if (!userNameRegex.test(userName)) {
      Alert.alert('Error', 'Name must contain only alphabets.');
      return false;
    }

    if (!userEmailRegex.test(userEmail)) {
      Alert.alert('Error', 'Invalid email format.');
      return false;
    }


    if (!userPhoneRegex.test(userPhone)) {
      Alert.alert('Error', 'Phone number must be exactly 10 digits.');
      return false;
    }

    return true;
  };

  const handleProfileCompletion = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const response = await createUser({ userName, userPhone , userEmail ,otp});
      if (response.success) {
        Alert.alert('Success', 'Profile created successfully!');
        // Navigate to Home or relevant screen
        
      } else {
        Alert.alert('Error', response.message || 'Failed to create profile.');
      }
    } catch (error) {
      console.error('Profile creation failed:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={PLACEHOLDER_COLOR}
        value={userName}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={PLACEHOLDER_COLOR}
        keyboardType="email-address"
        value={userEmail}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor={PLACEHOLDER_COLOR}
        keyboardType="phone-pad"
        value={userPhone}
        onChangeText={setPhone}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#F1BE49" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleProfileCompletion}>
          <Link href={'/Screens/LoginPage'}><Text style={styles.buttonText}>Complete Profile</Text></Link>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080A42',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#F1BE49',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#F1BE49',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#080A42',
  },
});

export default UserProfileRegistration;
