import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // You can use this to manage the status bar style
import Header from '../../components/Header';
import IntroductionVideo from '../../components/IntroductionVideo';
import TrendingStocks from '../../components/TrendingStocks';
import TopGainersLosers from '../../components/TopGainersLosers';
import UpcomingIPOs from '../../components/UpcomingIPOs';
import Reports from '../../components/Reports';
import ExploreMore from '../../components/ExploreMore';
import Disclaimer from '../../components/Disclaimer';

const UserHomePage = () => {
    return (
        <>
            <StatusBar style="light" /> {/* Adjust the status bar style */}
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Header />
                    <IntroductionVideo />
                    <TrendingStocks />
                    <TopGainersLosers />
                    <UpcomingIPOs />
                    <Reports />
                    <ExploreMore />
                    <Disclaimer />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080A42',
    },
    content: {
        flex: 1,
    },
});

export default UserHomePage;
