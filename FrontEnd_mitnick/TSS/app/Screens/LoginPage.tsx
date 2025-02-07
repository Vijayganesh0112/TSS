import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
    Keyboard,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons for the clear icon
import axios from 'axios';
import { router,Link } from 'expo-router';


interface LoginPageProps {
    navigation: NavigationProp<any>;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpCounter, setOtpCounter] = useState(0);
    const [otpAttempts, setOtpAttempts] = useState(0);
    const [otpMobileNumber, setOtpMobileNumber] = useState(''); // Added for displaying mobile number after sending OTP
    const otpInputRef = useRef<TextInput>(null);
    const mobileInputRef = useRef<TextInput>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (otpSent && otpCounter > 0) {
            timer = setInterval(() => {
                setOtpCounter((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpSent, otpCounter]);

    const handleSendOtp = async() => {
        if (otpAttempts >= 100) {
            Alert.alert(
                'Too Many Attempts',
                'You have reached the maximum attempts. Please try again after 30 minutes.'
            );
            return;
        }
        if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(mobileNumber)) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit Indian number.');
            return;
        }
        setOtpSent(true);
        setOtpCounter(30);
        setOtpAttempts((prev) => prev + 1);
        setOtpMobileNumber(mobileNumber); // Save mobile number after sending OTP
        try {
            const response = await axios.post("http://10.0.2.2:3000/api/send-otp", {
                "userPhone": "+91"+ mobileNumber,
            });
            if(response.data.success){
                Alert.alert(
                    'OTP Sent',
                    `An OTP has been sent to your mobile number ${mobileNumber}.`
                );
            }
            else{
                Alert.alert(
                    'OTP not Send',
                    
                );
            }
        }catch(e){
            alert(e.message)
        }

       

        otpInputRef.current?.focus();
    };

    const handleResendOtp = () => {
        setOtpSent(false); // Disable OTP state to reset
        setOtpCounter(0);  // Reset OTP counter
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 4 || isNaN(Number(otp))) {
            Alert.alert('Invalid OTP', 'OTP must be a 4-digit numeric value.');
            return;
        }else{
            try{
                const response = await axios.post("http://10.0.2.2:3000/api/signin",{
                    userPhone:"+91"+mobileNumber,
                    otp:otp
                });

                if(response.data){
                    Alert.alert('Login Successful', 'Redirecting to the homepage...');
                    //navigation.navigate('HomePage');
                    router.navigate('/Screens/UserHomePage')

                }
            }catch(e){
                alert(e.message);
            }
        }
    };

    const renderOtpInput = () => {
        const otpDigits = otp.split('');
        return (
            <TouchableOpacity
                style={styles.otpInputContainer}
                onPress={() => {
                    Keyboard.dismiss();
                    otpInputRef.current?.focus(); // Focus on the TextInput
                }}
                activeOpacity={0.8}
            >
                {[0, 1, 2, 3].map((index) => (
                    <View
                        key={index}
                        style={[
                            styles.otpBubble,
                            otpDigits[index] && styles.filledOtpBubble,
                        ]}
                    >
                        <Text style={styles.otpBubbleText}>
                            {otpDigits[index] || ''}
                        </Text>
                    </View>
                ))}
                <TextInput
                    ref={otpInputRef}
                    style={[styles.hiddenInput]}
                    keyboardType="numeric"
                    maxLength={4}
                    value={otp}
                    onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ''))}
                />
            </TouchableOpacity>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.screenContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Enter your Registered Mobile Number</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={mobileInputRef}
                        style={styles.input}
                        placeholder="Enter Mobile Number"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ''))}
                        value={mobileNumber}
                        editable={!otpSent || otpCounter === 0}
                    />
                    {mobileNumber.length > 0 && !otpSent && (  // Only show the clear button if OTP hasn't been sent
                        <TouchableOpacity
                            onPress={() => setMobileNumber('')}
                            style={styles.clearButton}
                        >
                            <Ionicons name="close-circle" size={24} color="#fff" />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={[styles.uniformButton, otpSent && styles.disabledButton]}
                    onPress={!otpSent ? handleSendOtp : undefined}
                    disabled={otpSent}
                >
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>

                {otpSent && (
                    <View style={styles.otpSection}>
                        <Text style={styles.title}>Enter OTP</Text>
                        <Text style={styles.otpSentText}>
                            Your one-time password has been sent to +91 {otpMobileNumber}
                        </Text>
                        {renderOtpInput()}
                        <View style={styles.resendContainer}>
                            {otpCounter > 0 ? (
                                <Text style={styles.resendText}>
                                    Resend in {otpCounter} seconds
                                </Text>
                            ) : (
                                <TouchableOpacity onPress={handleResendOtp}>
                                    <Text style={styles.resendLink}>Resend OTP</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <TouchableOpacity style={styles.uniformButton} onPress={handleVerifyOtp}>
                            <Link href={'/Screens/UserHomePage'}><Text style={styles.buttonText}>Login</Text></Link>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const { width } = Dimensions.get('window');
const otpBubbleSize = (width - 80) / 5;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#080A42',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        color: '#F9C650',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        padding: 20,
        color: '#FFFFFF',
        fontSize: 16,
        flex: 1,
    },
    clearButton: {
        position: 'absolute',
        right: 20,
    },
    uniformButton: {
        backgroundColor: '#F9C650',
        borderRadius: 10,
        padding: 15,
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#080A42',
        fontSize: 16,
        fontWeight: '700',
    },
    otpSection: {
        marginTop: 20,
    },
    otpSentText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginBottom: 20,
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpBubble: {
        width: otpBubbleSize,
        height: otpBubbleSize,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filledOtpBubble: {
        backgroundColor: '#Fad87252',
        borderColor: 'transparent',
    },
    otpBubbleText: {
        color: '#F9C650',
        fontSize: 24,
        fontWeight: '700',
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        height: 0,
    },
    resendContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    resendText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    resendLink: {
        color: '#F9C650',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
});

export default LoginPage;
