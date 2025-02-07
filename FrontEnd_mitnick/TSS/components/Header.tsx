import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { Link, router } from 'expo-router';

const Header = () => {
    const callPhone = () => {
        Linking.openURL('tel:+917892612845');
    };

    const ExecutedHandle=() =>{
        router.push("/executedOrders")
    }

    return (
        <View style={styles.container}>
            {/* Profile icon */}
            <TouchableOpacity onPress={ExecutedHandle}> <Ionicons name="person-circle-outline" style={styles.icon} /></TouchableOpacity> 
          

            <Text style={styles.greeting}>Namaste, User!</Text>

            {/* Call icon */}
            <TouchableOpacity onPress={callPhone}>
                <Ionicons name="call-outline" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 0 : 20,
    },
    icon: {
        fontSize: 30,  // Icon size
        color: '#F1BE49',
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F1BE49',
    },
});

export default Header;
