import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../context/AppContext';

interface Voucher {
    id: string;
    title: string;
    description: string;
    code: string;
    discount: string;
    expiry: string;
}

const VOUCHERS: Voucher[] = [
    { id: '1', title: 'Coffee Lover Special', description: 'Diskon 50% untuk semua kopi susu.', code: 'FIELD50', discount: '50%', expiry: '28 Feb 2026' },
    { id: '2', title: 'New Member Gift', description: 'Gratis 1 Donut untuk pembelian pertama.', code: 'WELCOMEGIFT', discount: 'FREE', expiry: '31 Mar 2026' },
    { id: '3', title: 'Weekend Brew', description: 'Buy 1 Get 1 Free setiap akhir pekan.', code: 'WEEKEND88', discount: 'B1G1', expiry: '28 Feb 2026' },
    { id: '4', title: 'Deli Combo Deal', description: 'Potongan Rp 15.000 untuk paket kombo.', code: 'DELICOMBO', discount: 'Rp 15k', expiry: '15 Mar 2026' },
    { id: '5', title: 'Night Owl Bonus', description: 'Diskon 20% di atas jam 8 malam.', code: 'NIGHTOWL', discount: '20%', expiry: '28 Feb 2026' },
    { id: '6', title: 'Loyalty Reward', description: 'Potongan Rp 10.000 untuk transaksi ke-5.', code: 'LOYAL10', discount: 'Rp 10k', expiry: '30 Jun 2026' },
];

export default function FieldGiftScreen() {
    const router = useRouter();
    const { colors, theme } = useApp();

    const renderVoucher = ({ item }: { item: Voucher }) => (
        <View style={[styles.voucherCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.discountCircle, { backgroundColor: colors.primary }]}>
                <Text style={styles.discountText}>{item.discount}</Text>
            </View>
            <View style={styles.voucherInfo}>
                <Text style={[styles.voucherTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.voucherDesc, { color: colors.textSecondary }]}>{item.description}</Text>
                <View style={styles.codeRow}>
                    <Text style={[styles.codeLabel, { color: colors.textSecondary }]}>KODE: </Text>
                    <Text style={[styles.codeText, { color: colors.primary }]}>{item.code}</Text>
                </View>
                <Text style={[styles.expiryText, { color: colors.textSecondary }]}>Berlaku hingga: {item.expiry}</Text>
            </View>
            <TouchableOpacity style={[styles.claimBtn, { backgroundColor: colors.primary }]}>
                <Text style={styles.claimBtnText}>Gunakan</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Field Gift</Text>
                <View style={{ width: 28 }} />
            </View>

            <FlatList
                data={VOUCHERS}
                renderItem={renderVoucher}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <View>
                        <View style={styles.heroSection}>
                            <Text style={[styles.heroTitle, { color: colors.text }]}>Hadiah Menantimu!</Text>
                            <Text style={[styles.heroSub, { color: colors.textSecondary }]}>Cek koleksi vouchermu dan nikmati promo di setiap seduhan.</Text>
                        </View>

                        {/* Special Featured Voucher Card */}
                        <View style={[styles.featuredCard, { backgroundColor: colors.primary }]}>
                            <View style={styles.featuredContent}>
                                <Text style={styles.featuredLabel}>HOT DEALS</Text>
                                <Text style={styles.featuredTitle}>Buy 1 Get 1 Free</Text>
                                <Text style={styles.featuredSub}>Kopi Susu Gula Aren Spesial</Text>
                                <TouchableOpacity style={styles.featuredBtn}>
                                    <Text style={[styles.featuredBtnTxt, { color: colors.primary }]}>Klaim Sekarang</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.featuredIconBox}>
                                <Ionicons name="gift" size={50} color="rgba(255,255,255,0.3)" />
                            </View>
                        </View>

                        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 25, marginBottom: 15 }]}>Voucher Tersedia</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
    backBtn: { padding: 5 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    listContainer: { paddingHorizontal: 20, paddingBottom: 40 },
    heroSection: { marginVertical: 20 },
    heroTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
    heroSub: { fontSize: 14, lineHeight: 20 },
    featuredCard: {
        borderRadius: 25,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    featuredContent: { flex: 1, zIndex: 1 },
    featuredLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
    featuredTitle: { color: 'white', fontSize: 24, fontWeight: 'bold', marginVertical: 4 },
    featuredSub: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginBottom: 15 },
    featuredBtn: { backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, alignSelf: 'flex-start' },
    featuredBtnTxt: { fontWeight: 'bold', fontSize: 12 },
    featuredIconBox: { position: 'absolute', right: -10, bottom: -10, opacity: 0.5 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold' },
    voucherCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
        borderWidth: 1,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    discountCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    discountText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    voucherInfo: { flex: 1 },
    voucherTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    voucherDesc: { fontSize: 12, marginBottom: 8 },
    codeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    codeLabel: { fontSize: 11, fontWeight: 'bold' },
    codeText: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
    expiryText: { fontSize: 10, opacity: 0.8 },
    claimBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 15, marginLeft: 10 },
    claimBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold' }
});
