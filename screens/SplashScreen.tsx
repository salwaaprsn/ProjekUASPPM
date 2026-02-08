import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

interface SplashScreenProps {
    logoText?: string;
}

export default function SplashScreen({ logoText = 'Field Coffee' }: SplashScreenProps) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Text style={styles.logoText}>{logoText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4B2C0E',
    },
});
