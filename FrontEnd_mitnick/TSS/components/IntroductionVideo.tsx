import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av'; // Use expo-av for video playback

const IntroductionVideo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Introduction Video</Text>
            <Video
                source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }} // Replace with your video URL
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.STRETCH}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10, },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#fff' },
    video: { height: 200, borderWidth: 4, borderColor: '#F1BE49', borderRadius: 10, },
});

export default IntroductionVideo;
