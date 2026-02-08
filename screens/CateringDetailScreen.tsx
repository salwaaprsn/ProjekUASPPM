import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useApp } from '../context/AppContext';

export default function CateringDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { colors, theme } = useApp();

    const { title, price, icon, iconBg, desc } = params;

    const handleWAOrder = () => {
        const message = `Halo Field Coffee! Saya tertarik dengan paket catering: ${title} (Rp ${price}). Bisa info lebih lanjut?`;
        const url = `https://wa.me/6285759572330?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => alert("Gagal membuka WhatsApp."));
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.card }]}>
                    <Ionicons name="chevron-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Detail Paket</Text>
                <View style={{ width: 45 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Icon Section */}
                <View style={styles.iconSection}>
                    <View style={[styles.mainIconBg, { backgroundColor: iconBg as string || colors.primary + '11' }]}>
                        <Ionicons name={icon as any || 'cafe'} size={80} color={colors.primary} />
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles.infoBox}>
                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                    <Text style={[styles.price, { color: colors.primary }]}>Rp {price}</Text>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Deskripsi Paket</Text>
                    <Text style={[styles.desc, { color: colors.textSecondary }]}>{desc}</Text>

                    <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 25 }]}>Apa Saja Yang Didapat?</Text>
                    <View style={styles.benefitList}>
                        <BenefitItem icon="checkmark-circle" text="Bahan baku premium pilihan" colors={colors} />
                        <BenefitItem icon="checkmark-circle" text="Peralatan lengkap & higienis" colors={colors} />
                        <BenefitItem icon="checkmark-circle" text="Setup bar portable yang estetik" colors={colors} />
                        <BenefitItem icon="checkmark-circle" text="Free ongkir area kota tertentu" colors={colors} />
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Action Button */}
            <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <TouchableOpacity
                    style={[styles.waBtn, { backgroundColor: colors.primary }]}
                    onPress={handleWAOrder}
                >
                    <Ionicons name="logo-whatsapp" size={24} color="white" />
                    <Text style={styles.waBtnText}>Pesan via WhatsApp</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const BenefitItem = ({ icon, text, colors }: any) => (
    <View style={styles.benefitItem}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={[styles.benefitText, { color: colors.textSecondary }]}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 15
    },
    backBtn: { width: 45, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    scrollContent: { paddingBottom: 120 },
    iconSection: { alignItems: 'center', paddingVertical: 40 },
    mainIconBg: { width: 160, height: 160, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
    infoBox: { paddingHorizontal: 25 },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
    price: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    divider: { height: 1, width: '100%', marginBottom: 25 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    desc: { fontSize: 15, lineHeight: 24 },
    benefitList: { marginTop: 10 },
    benefitItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    benefitText: { marginLeft: 12, fontSize: 14 },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        borderTopWidth: 1,
    },
    waBtn: {
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10
    },
    waBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 12 }
});
