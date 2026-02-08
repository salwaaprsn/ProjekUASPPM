import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Linking,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useOrder } from '../context/OrderContext';

const { width } = Dimensions.get('window');

export default function PembayaranScreen() {
    const router = useRouter();
    const { colors, theme } = useApp();
    const { checkout } = useOrder();
    const { total } = useLocalSearchParams();
    const [isVerifying, setIsVerifying] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

    const nominal = total || "0";

    const startPayment = async (provider: string) => {
        setSelectedProvider(provider);
        let url = "";
        if (provider === "GoPay") url = "gojek://";
        if (provider === "OVO") url = "ovo://";
        if (provider === "DANA") url = "dana://";

        Alert.alert(
            "Konfirmasi Pembayaran",
            `Lanjutkan ke aplikasi ${provider} untuk membayar Rp ${nominal} ke Field Coffee?`,
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Buka Aplikasi",
                    onPress: async () => {
                        const supported = await Linking.canOpenURL(url).catch(() => false);

                        // 1. Simulasi proses pembayaran
                        setIsVerifying(true);

                        if (supported) {
                            await Linking.openURL(url);
                        }

                        // Simulasi verifikasi backend
                        setTimeout(() => {
                            setIsVerifying(false);
                            // 2. Selesaikan order di context
                            checkout();

                            Alert.alert(
                                "Pembayaran Berhasil!",
                                `Pesananmu sedang diproses oleh Field Coffee via ${provider}.`,
                                [{
                                    text: "Lacak Pesanan",
                                    onPress: () => router.replace('/order_status' as any)
                                }]
                            );
                        }, 4000);
                    }
                }
            ]
        );
    };

    if (isVerifying) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
                <View style={[styles.loadingCircle, { backgroundColor: colors.primary + '10' }]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
                <Text style={[styles.loadingTxt, { color: colors.text }]}>Memverifikasi Pembayaran...</Text>
                <Text style={[styles.loadingSub, { color: colors.textSecondary }]}>Mohon tunggu sebentar, sistem sedang mengecek saldo Anda.</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.background }]}>
                <TouchableOpacity style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Metode Pembayaran</Text>
                <View style={{ width: 45 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Total Card */}
                <View style={[styles.totalCard, { backgroundColor: colors.primary }]}>
                    <View style={styles.totalHeader}>
                        <Ionicons name="receipt-outline" size={20} color="rgba(255,255,255,0.7)" />
                        <Text style={styles.totalLabel}>Total Tagihan</Text>
                    </View>
                    <Text style={styles.totalValue}>Rp {nominal}</Text>
                    <View style={styles.orderBadge}>
                        <Text style={styles.orderBadgeText}>ID: #FLD-{Math.floor(1000 + Math.random() * 9000)}</Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>PILIH METODE PEMBAYARAN</Text>

                {/* Payment Methods */}
                <PaymentOption
                    name="DANA"
                    icon="phone-portrait"
                    color="#0086CA"
                    desc="Bayar instan via aplikasi DANA"
                    colors={colors}
                    onPress={() => startPayment("DANA")}
                />
                <PaymentOption
                    name="GoPay"
                    icon="wallet"
                    color="#00AA13"
                    desc="Saldo GoPay atau GoPay Later"
                    colors={colors}
                    onPress={() => startPayment("GoPay")}
                />
                <PaymentOption
                    name="OVO"
                    icon="card"
                    color="#4C2A86"
                    desc="Potong saldo OVO Cash Anda"
                    colors={colors}
                    onPress={() => startPayment("OVO")}
                />

                {/* Additional Methods Section */}
                <Text style={[styles.sectionTitle, { color: colors.textSecondary, marginTop: 30 }]}>METODE LAINNYA</Text>

                <TouchableOpacity style={[styles.otherItem, { borderColor: colors.border }]}>
                    <View style={[styles.otherIcon, { backgroundColor: '#F0F0F0' }]}>
                        <Ionicons name="business-outline" size={20} color="#666" />
                    </View>
                    <Text style={[styles.otherText, { color: colors.text }]}>Bank Transfer / Virtual Account</Text>
                    <Ionicons name="chevron-forward" size={16} color="#BBB" />
                </TouchableOpacity>

                <View style={[styles.safeBanner, { backgroundColor: colors.primary + '10' }]}>
                    <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
                    <Text style={[styles.safeTxt, { color: colors.primary }]}>Pembayaran Aman & Terenkripsi</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const PaymentOption = ({ name, icon, color, desc, colors, onPress }: any) => (
    <TouchableOpacity style={[styles.pItem, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={onPress}>
        <View style={[styles.pIcon, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.pInfo}>
            <Text style={[styles.pName, { color: colors.text }]}>{name}</Text>
            <Text style={[styles.pDesc, { color: colors.textSecondary }]}>{desc}</Text>
        </View>
        <View style={[styles.selectCircle, { borderColor: colors.border }]}>
            <View style={styles.chevronBg}>
                <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 50 : 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    backBtn: {
        width: 45,
        height: 45,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    scrollContent: { padding: 20, paddingBottom: 40 },

    totalCard: {
        padding: 30,
        borderRadius: 30,
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        marginBottom: 35
    },
    totalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    totalLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginLeft: 8, fontWeight: '500' },
    totalValue: { color: '#FFF', fontSize: 36, fontWeight: 'bold', letterSpacing: -1 },
    orderBadge: {
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 10
    },
    orderBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '600' },

    sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 15, letterSpacing: 1, marginLeft: 5 },

    pItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 24,
        marginBottom: 15,
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5
    },
    pIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    pInfo: { flex: 1, marginLeft: 18 },
    pName: { fontWeight: 'bold', fontSize: 17 },
    pDesc: { fontSize: 12, marginTop: 3 },
    selectCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    chevronBg: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

    otherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: 'transparent'
    },
    otherIcon: { width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    otherText: { flex: 1, fontSize: 14, fontWeight: '500' },

    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    loadingCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
    loadingTxt: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    loadingSub: { textAlign: 'center', fontSize: 14, lineHeight: 22 },

    safeBanner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        padding: 15,
        borderRadius: 15,
    },
    safeTxt: { fontSize: 12, fontWeight: 'bold', marginLeft: 10 }
});
