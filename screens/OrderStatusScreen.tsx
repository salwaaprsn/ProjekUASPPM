import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Linking,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import { useApp } from '../context/AppContext';

const { width, height } = Dimensions.get('window');

const STATUS_STEPS = [
    { title: 'Pesanan Diterima', desc: 'Field Coffee sedang mengecek pesananmu.', icon: 'receipt-outline' },
    { title: 'Menyiapkan Kopi', desc: 'Barista terbaik kami sedang beraksi.', icon: 'cafe-outline' },
    { title: 'Driver Menuju Toko', desc: 'Driver sedang meluncur menjemput kopimu.', icon: 'bicycle-outline' },
    { title: 'Pesanan Diantar', desc: 'Kopimu dalam perjalanan menuju lokasimu.', icon: 'navigate-circle-outline' },
    { title: 'Sampai Tujuan', desc: 'Nikmati Field Coffee-mu selagi hangat!', icon: 'checkmark-done-circle-outline' },
];

export default function OrderStatusScreen() {
    const router = useRouter();
    const { colors } = useApp();
    const [currentStatus, setCurrentStatus] = useState(0);

    // Animation Shared Values
    const pulseValue = useSharedValue(1);
    const progressValue = useSharedValue(0);

    useEffect(() => {
        // Pulse animation for the central icon
        pulseValue.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 1000, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
                withTiming(1, { duration: 1000, easing: Easing.bezier(0.4, 0, 0.2, 1) })
            ),
            -1,
            true
        );

        // Progress line animation
        progressValue.value = withRepeat(
            withTiming(1, { duration: 2000, easing: Easing.linear }),
            -1,
            false
        );

        // Simulated Status Updates
        const interval = setInterval(() => {
            setCurrentStatus(prev => {
                if (prev < STATUS_STEPS.length - 1) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 5000); // Change status every 5 seconds for demo

        return () => clearInterval(interval);
    }, []);

    const handleChatDriver = () => {
        const message = "Halo Pak Driver Field Coffee! Saya mau tanya status pesanan #ORD-7721 saya sudah sampai mana ya?";
        const url = `https://wa.me/6285759572330?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => {
            alert("Gagal membuka WhatsApp. Pastikan aplikasi WhatsApp terinstal.");
        });
    };

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseValue.value }],
    }));

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.primary }]}>Status Pesanan</Text>
                <Text style={[styles.orderId, { color: colors.textSecondary }]}>#ORD-7721 - Delivery</Text>
            </View>

            {/* Animation Central Content */}
            <View style={styles.animationArea}>
                <View style={[styles.pulseContainer, { backgroundColor: colors.primary + '11' }]}>
                    <Animated.View style={[styles.iconMain, { backgroundColor: colors.primary }, animatedIconStyle]}>
                        <Ionicons name={STATUS_STEPS[currentStatus].icon as any} size={40} color="white" />
                    </Animated.View>
                    <View style={[styles.pulseRing, { borderColor: colors.primary + '33' }]} />
                    <View style={[styles.pulseRing2, { borderColor: colors.primary + '22' }]} />
                </View>

                <Text style={[styles.statusTitle, { color: colors.text }]}>{STATUS_STEPS[currentStatus].title}</Text>
                <Text style={[styles.statusDesc, { color: colors.textSecondary }]}>{STATUS_STEPS[currentStatus].desc}</Text>
            </View>

            {/* Status Steps List */}
            <View style={styles.stepsContainer}>
                {STATUS_STEPS.map((step, index) => {
                    const isActive = index <= currentStatus;
                    const isProcessing = index === currentStatus;

                    return (
                        <View key={index} style={styles.stepRow}>
                            <View style={styles.stepLeft}>
                                <View style={[
                                    styles.stepDot,
                                    { backgroundColor: isActive ? colors.primary : '#EEE' },
                                    isProcessing && { borderWidth: 3, borderColor: colors.primary + '33' }
                                ]}>
                                    {isActive && index < currentStatus && (
                                        <Ionicons name="checkmark" size={12} color="white" />
                                    )}
                                </View>
                                {index < STATUS_STEPS.length - 1 && (
                                    <View style={[styles.stepLine, { backgroundColor: index < currentStatus ? colors.primary : '#EEE' }]} />
                                )}
                            </View>
                            <View style={styles.stepRight}>
                                <Text style={[
                                    styles.stepTitleText,
                                    { color: isActive ? colors.text : colors.textSecondary, fontWeight: isActive ? 'bold' : 'normal' }
                                ]}>
                                    {step.title}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Bottom Actions */}
            <View style={styles.bottomArea}>
                <TouchableOpacity
                    style={[styles.homeBtn, { borderColor: colors.primary }]}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={[styles.homeBtnText, { color: colors.primary }]}>Kembali ke Beranda</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.chatBtn, { backgroundColor: colors.primary }]}
                    onPress={handleChatDriver}
                >
                    <Ionicons name="logo-whatsapp" size={20} color="white" />
                    <Text style={styles.chatBtnText}>Chat Driver</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingTop: Platform.OS === 'android' ? 60 : 30,
        paddingHorizontal: 25,
        paddingBottom: 25,
        alignItems: 'center'
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    orderId: { fontSize: 13, marginTop: 5 },
    animationArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    pulseContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 30
    },
    iconMain: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8
    },
    pulseRing: {
        position: 'absolute',
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2
    },
    pulseRing2: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 1.5
    },
    statusTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    statusDesc: { fontSize: 14, textAlign: 'center', paddingHorizontal: 40, lineHeight: 20 },
    stepsContainer: { paddingHorizontal: 40, paddingBottom: 40 },
    stepRow: { flexDirection: 'row', height: 50 },
    stepLeft: { alignItems: 'center', width: 20 },
    stepDot: { width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
    stepLine: { width: 2, flex: 1 },
    stepRight: { marginLeft: 15, justifyContent: 'flex-start', paddingTop: 0 },
    stepTitleText: { fontSize: 14 },
    bottomArea: {
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: Platform.OS === 'ios' ? 40 : 25,
    },
    homeBtn: { flex: 1, height: 55, borderRadius: 15, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    homeBtnText: { fontWeight: 'bold' },
    chatBtn: { flex: 1, height: 55, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 3 },
    chatBtnText: { color: 'white', fontWeight: 'bold', marginLeft: 8 }
});
