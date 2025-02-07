import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const UpcomingIPOs = () => {
    const ipos = [
        { logo: 'https://via.placeholder.com/50', name: 'Company A', sector: 'Tech' },
        { logo: 'https://via.placeholder.com/50', name: 'Company B', sector: 'Finance' },
        { logo: 'https://via.placeholder.com/50', name: 'Company C', sector: 'Healthcare' },
        { logo: 'https://via.placeholder.com/50', name: 'Company D', sector: 'Retail' },
    ];

    return (
        <View>
            <Text style={styles.sectionHeader}>Upcoming IPOs</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                {ipos.map((ipo, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={{ uri: ipo.logo }} style={styles.logo} />
                        <View style={styles.info}>
                            <Text style={styles.ipoName}>{ipo.name}</Text>
                            <Text style={styles.sector}>{ipo.sector}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10, alignContent: 'flex-end', flex: 1 },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 15,
        color: '#fff',
    },
    ipoName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    card: { flexDirection: 'row', borderWidth: 1, padding: 12, marginRight: 10, borderRadius: 8, backgroundColor: '#D8B25A', width: 200 },
    logo: { width: 50, height: 50, marginRight: 15, borderRadius: 10 },
    info: { justifyContent: 'center' },
    sector: {
        color: '#585858',
        fontWeight: '700',
        fontSize: 12,
    },
});

export default UpcomingIPOs;
