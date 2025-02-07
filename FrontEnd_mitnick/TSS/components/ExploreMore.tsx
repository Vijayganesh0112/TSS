import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ArticleOrBlog {
    preview: string; // URL for the preview image
    title: string;
    description: string;
}

const articles: ArticleOrBlog[] = [
    { preview: 'https://via.placeholder.com/220x110', title: 'Article A', description: 'This is the description of article A.' },
    { preview: 'https://via.placeholder.com/220x110', title: 'Article B', description: 'This is the description of article B.' },
    { preview: 'https://via.placeholder.com/220x110', title: 'Article C', description: 'This is the description of article C.' },
    { preview: 'https://via.placeholder.com/220x110', title: 'Article D', description: 'This is the description of article D.' },
];

const blogs: ArticleOrBlog[] = [
    { preview: 'https://via.placeholder.com/220x110', title: 'Blog A', description: 'This is the description of blog A.' },
    { preview: 'https://via.placeholder.com/220x110', title: 'Blog B', description: 'This is the description of blog B.' },
    { preview: 'https://via.placeholder.com/220x110', title: 'Blog C', description: 'This is the description of blog C.' },
    { preview: 'https://via.placeholder.com/220x110', title: 'Blog D', description: 'This is the description of blog D.' },
];

const ExploreMore: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'articles' | 'blogs'>('articles'); // State for active tab

    const renderCards = (data: ArticleOrBlog[]) => {
        return data.map((item, index) => (
            <View key={index} style={styles.card}>
                <View style={styles.previewContainer}>
                    <Image source={{ uri: item.preview }} style={styles.preview} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Explore More</Text>
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'articles' && styles.activeTab]}
                    onPress={() => setActiveTab('articles')}
                >
                    <Text style={[styles.tabText, activeTab === 'articles' && styles.activeTabText]}>Articles</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'blogs' && styles.activeTab]}
                    onPress={() => setActiveTab('blogs')}
                >
                    <Text style={[styles.tabText, activeTab === 'blogs' && styles.activeTabText]}>Blogs</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                {activeTab === 'articles' ? renderCards(articles) : renderCards(blogs)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
        marginLeft: 7,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    tab: {
        width: '50%',
        alignSelf: 'center',
        padding: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#8c8c8c',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#D8B25A',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#8c8c8c',
    },
    activeTabText: {
        color: 'gold',
    },
    scrollContainer: {
        paddingBottom: 10,
    },
    card: {
        backgroundColor: '#668CA127',
        borderRadius: 15,
        marginRight: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    previewContainer: {
        width: 220,
        height: 110,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 10,
        alignSelf: 'center',
    },
    preview: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    description: {
        fontSize: 12,
        color: '#757575',
    },
});

export default ExploreMore;
