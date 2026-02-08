import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SyaratKetentuanReferralScreen() {
    const router = useRouter();
    const { colors, theme } = useApp();

    const terms = [
        "Program referral ini hanya berlaku untuk pengguna baru yang belum pernah mendaftar di aplikasi Field Coffee.",
        "Teman yang diundang harus mendaftar menggunakan nomor HP dan perangkat yang belum pernah terdaftar sebelumnya.",
        "Reward (Voucher/Poin) akan diberikan kepada pengundang setelah teman yang diundang berhasil menyelesaikan transaksi pertama dengan pembayaran lunas.",
        "Voucher diskon referral berlaku selama 30 hari sejak tanggal diterbitkan.",
        "Misi milestone (misal: ajak 10 teman) memberikan reward tambahan yang akan dikreditkan otomatis ke akun setelah target tercapai.",
        "Field Coffee berhak membatalkan voucher atau memblokir akun jika ditemukan indikasi kecurangan atau penyalahgunaan program referral.",
        "Field Points yang didapat dari referral dapat ditukarkan dengan berbagai minuman gratis sesuai katalog reward.",
        "Kebijakan program referral dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya dari PT Field Kopi Indonesia."
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Syarat & Ketentuan</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.iconContainer}>
                    <Ionicons name="document-text-outline" size={80} color={colors.primary} />
                </View>

                <Text style={[styles.mainTitle, { color: colors.text }]}>Ketentuan Program Referral</Text>
                <Text style={[styles.mainSub, { color: colors.textSecondary }]}>Baca selengkapnya mengenai aturan main program Share the Sip.</Text>

                <View style={styles.termsList}>
                    {terms.map((term, index) => (
                        <View key={index} style={styles.termItem}>
                            <Text style={[styles.termIndex, { color: colors.primary }]}>{index + 1}.</Text>
                            <Text style={[styles.termText, { color: colors.text }]}>{term}</Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.footerInfo, { backgroundColor: colors.primary + '08' }]}>
                    <Ionicons name="information-circle" size={20} color={colors.primary} />
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        Ada pertanyaan? Hubungi Customer Service kami melalui WhatsApp.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 15,
        elevation: 2
    },
    backBtn: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    scrollContent: { paddingHorizontal: 25, paddingTop: 30, paddingBottom: 50 },
    iconContainer: { alignItems: 'center', marginBottom: 20 },
    mainTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    mainSub: { fontSize: 14, textAlign: 'center', marginBottom: 35, lineHeight: 22 },
    termsList: { paddingBottom: 10 },
    termItem: { flexDirection: 'row', marginBottom: 15, alignItems: 'flex-start' },
    termIndex: { fontSize: 14, fontWeight: 'bold', width: 22, marginTop: 2, textAlign: 'left' },
    termText: { flex: 1, fontSize: 14, lineHeight: 22, textAlign: 'justify' },
    footerInfo: { padding: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    footerText: { flex: 1, marginLeft: 12, fontSize: 13, lineHeight: 18 }
});
