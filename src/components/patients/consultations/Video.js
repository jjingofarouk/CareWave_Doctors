import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const Video = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Patient Info and Controls on the same line */}


            {/* Video Consultation */}
            <WebView
                source={{ uri: 'https://meet.jit.si/medhubroom' }}
                style={styles.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsFullscreenVideo={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                startInLoadingState={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    webview: {
        flex: 1,
    },
    topPanel: {
        flexDirection: 'row',  // Makes the patient info and controls appear on one line
        justifyContent: 'space-between',  // Distributes space between them
        padding: 16,
        backgroundColor: '#DFE4E5', // Coral Cloud
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    patientInfo: {
        flex: 1,
        marginRight: 16,  // Adds space between patient info and controls
    },
    patientName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#002432', // Ocean Obsidian
    },
    patientDetails: {
        fontSize: 14,
        color: '#666',
    },
    controls: {
        justifyContent: 'center',  // Centers the button within the control section
    },
});

export default Video;
