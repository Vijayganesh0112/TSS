import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const TopGainersLosers = () => {
    const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers');
    const [showMore, setShowMore] = useState(false);

    const gainers = [
        { logo: 'https://via.placeholder.com/50', name: 'Company A', sector: 'Tech', change: '+5.2%', price: '₹ 500' },
        { logo: 'https://via.placeholder.com/50', name: 'Company B', sector: 'Finance', change: '+4.8%', price: '₹ 250' },
        { logo: 'https://via.placeholder.com/50', name: 'Company C', sector: 'Healthcare', change: '+4.5%', price: '₹ 300' },
        { logo: 'https://via.placeholder.com/50', name: 'Company D', sector: 'Retail', change: '+4.3%', price: '₹ 1500' },
    ];

    const losers = [
        { logo: 'https://via.placeholder.com/50', name: 'Company X', sector: 'Tech', change: '-4.2%', price: '₹ 1200' },
        { logo: 'https://via.placeholder.com/50', name: 'Company Y', sector: 'Finance', change: '-3.8%', price: '₹ 800' },
        { logo: 'https://via.placeholder.com/50', name: 'Company Z', sector: 'Healthcare', change: '-3.5%', price: '₹ 950' },
        { logo: 'https://via.placeholder.com/50', name: 'Company W', sector: 'Retail', change: '-3.3%', price: '₹ 600' },
    ];


    const data = activeTab === 'gainers' ? gainers : losers;
    const displayedData = showMore ? data : data.slice(0, 3);

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity
                    onPress={() => setActiveTab('gainers')}
                    style={[styles.tab, activeTab === 'gainers' && styles.activeTab]}>
                    <Text style={[styles.tabText, activeTab === 'gainers' && styles.activeTabText]}>
                        Top Gainers
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('losers')}
                    style={[styles.tab, activeTab === 'losers' && styles.activeTab]}>
                    <Text style={[styles.tabText, activeTab === 'losers' && styles.activeTabText]}>
                        Top Losers
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={displayedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: item.logo }} style={styles.logo} />
                        <View style={styles.info}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.sector}>{item.sector}</Text>
                        </View>
                        <View style={styles.stats}>
                            <Text style={[styles.change, activeTab === 'gainers' ? styles.positive : styles.negative]}>
                                {item.change}
                            </Text>
                            <Text style={styles.price}>
                                {item.price}
                            </Text>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => setShowMore(!showMore)} style={styles.showMore}>
                <Text style={styles.showMoreText}>{showMore ? 'Show Less' : 'Show More'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginHorizontal: 10, backgroundColor: '#FAFAFA', borderRadius: 10 },
    tabs: { flexDirection: 'row', },
    tab: { flex: 1, alignItems: 'center', borderBottomWidth: 2, borderColor: 'transparent' },
    activeTab: { borderColor: '#D8B25A', backgroundColor: '#D8B25A22' },
    tabText: { color: '#757575', marginBottom: 8, marginTop: 10 },
    activeTabText: { color: '#D8B25A', fontWeight: 'bold' },
    listItem: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    logo: { width: 40, height: 40, marginRight: 10, borderRadius: 10, },
    itemName: { color: '#0A0C40', fontSize: 14, fontWeight: 'bold', },
    info: { flex: 1 },
    sector: { color: 'gray', fontSize: 12, fontWeight: 'bold', },
    stats: { justifyContent: 'flex-end', marginRight: 5 },
    change: { fontSize: 16, fontWeight: 'bold', alignItems: 'flex-end' },
    price: { color: '#0A0C40', fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-end' },
    positive: { color: 'green' },
    negative: { color: 'red' },
    separator: { height: 1, backgroundColor: '#ddd', marginHorizontal: 10, },
    showMore: { alignSelf: 'flex-end', marginTop: 10 },
    showMoreText: { color: '#757575', fontWeight: 'bold', fontSize: 12, marginHorizontal: 10, marginBottom: 10, textDecorationLine: 'underline', },
});

export default TopGainersLosers;
