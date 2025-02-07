import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TrendingStocks: React.FC = () => {
    const stocks = [
        { logo: 'https://via.placeholder.com/50', name: 'Company A', sector: 'Tech', price: '₹500', marketCap: '₹2Cr' },
        { logo: 'https://via.placeholder.com/50', name: 'Company B', sector: 'Medical', price: '₹250', marketCap: '₹1Cr' },
        { logo: 'https://via.placeholder.com/50', name: 'Company C', sector: 'Finance', price: '₹300', marketCap: '₹1.5Cr' },
        { logo: 'https://via.placeholder.com/50', name: 'Company D', sector: 'Tech', price: '₹1500', marketCap: '₹5Cr' },
        { logo: 'https://via.placeholder.com/50', name: 'Company E', sector: 'Finance', price: '₹2500', marketCap: '₹6Cr' },
        { logo: 'https://via.placeholder.com/50', name: 'Company F', sector: 'Tech', price: '₹520', marketCap: '₹2Cr' },
        // Add more stocks here
    ];

    return (
        <View>
            <Text style={styles.sectionHeader}>Trending Stocks</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
                {stocks.map((stock: { logo: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; sector: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; marketCap: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardContent}>
                            {/* Logo and Company Info */}
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: stock.logo }} style={styles.logo} />
                                <View>
                                    <Text style={styles.companyName}>{stock.name}</Text>
                                    <Text style={styles.sector}>{stock.sector}</Text>
                                </View>
                            </View>

                            {/* Price and Market Cap */}
                            <View style={styles.mainStatsContainer}>
                                <View style={styles.statsContainer}>
                                    <Text style={styles.statsInfoLabel}>Price: </Text>
                                    <Text style={styles.price}>{stock.price}</Text>
                                </View>
                                <View style={styles.statsContainer}>
                                    <Text style={styles.statsInfoLabel}>Market Cap: </Text>
                                    <Text style={styles.marketCap}>{stock.marketCap}</Text>
                                </View>
                            </View>
                        </View>

                        {/* "Know More" Button */}
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Know More</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 15,
        color: '#fff',
        marginTop: 10,
    },
    card: {
        width: 300,
        backgroundColor: '#BBC3FF',
        borderRadius: 8,
        marginRight: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 10,
    },
    companyName: {
        fontWeight: 'bold',
        fontSize: 16, // Make the company name slightly larger
    },
    sector: {
        color: '#777',
        fontSize: 12,
    },
    mainStatsContainer: {
        flexDirection: 'column',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center'
    },
    statsInfoLabel: {
        fontSize: 12,
        alignItems: 'center',
        fontWeight: '600',
        color: '#777',
        marginRight: 4
    },
    price: {
        fontWeight: 'bold',
        fontSize: 13, // Make price stand out
    },
    marketCap: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#080A42',
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10, // Ensures there's space before the button
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TrendingStocks;
