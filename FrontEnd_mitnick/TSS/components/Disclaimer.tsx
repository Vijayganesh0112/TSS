import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const Disclaimer: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Disclaimer Header */}
            <Text style={styles.header}>Disclaimer</Text>

            {/* Scrollable Disclaimer Text */}
            <ScrollView style={styles.textContainer}>
                <Text style={styles.text}>
                    The information provided on this platform regarding unlisted shares is for informational purposes only. It does not constitute an offer, solicitation, or recommendation for any investment.
                    Unlisted shares are highly speculative and carry high risks. The past performance of any company or share is not an indication of future performance.
                </Text>
                <Text></Text>
                <Text style={styles.text}>
                    Users are advised to conduct their own research and consult with a financial advisor before making any investment decisions.
                    The platform does not guarantee the accuracy or completeness of the information provided. All investments involve risks, and users should only invest what they can afford to lose.
                </Text>
            </ScrollView>

            {/* Image at the bottom */}
            <Image source={require('../components/logo.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#eaeaea',
    },
    textContainer: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 14,
        color: '#757575',
        lineHeight: 22,
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 10,
        marginBottom: 40,
        resizeMode: 'contain',
    },
});

export default Disclaimer;
