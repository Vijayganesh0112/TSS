import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Report {
    preview: string; // URL for the report preview image
    companyName: string;
}

const reports: Report[] = [
    { preview: 'https://via.placeholder.com/200x120', companyName: 'Company A' },
    { preview: 'https://via.placeholder.com/200x120', companyName: 'Company B' },
    { preview: 'https://via.placeholder.com/200x120', companyName: 'Company C' },
    { preview: 'https://via.placeholder.com/200x120', companyName: 'Company D' },
    // Add more reports here
];

const Reports: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Reports</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                {reports.map((report, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.previewContainer}>
                            <Image source={{ uri: report.preview }} style={styles.preview} />
                        </View>
                        <Text style={styles.companyName}>{report.companyName}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Full Report</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>One Pager</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
        marginLeft: 7,
    },
    scrollContainer: {
        paddingBottom: 10, // Optional, adds space at the bottom
    },
    card: {
        backgroundColor: '#D8B25A',
        borderRadius: 15,
        marginRight: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',

    },
    previewContainer: {
        width: 200,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    preview: {
        width: '100%',
        height: '100%',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
        marginLeft: 8,
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    button: {
        backgroundColor: '#0A0C40',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        flex: 0.48,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default Reports;
