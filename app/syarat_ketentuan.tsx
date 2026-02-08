import { useApp } from '@/context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SyaratKetentuanScreen() {
    const router = useRouter();
    const { colors, theme } = useApp();

    const sections = [
        {
            title: "1. Persetujuan Syarat dan Ketentuan",
            content: "Selamat datang di Field Coffee. Dengan mengunduh, mengakses, atau menggunakan aplikasi kami, Anda dianggap telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Layanan ini dioperasikan oleh PT Field Kopi Indonesia."
        },
        {
            title: "2. Akun dan Keamanan Pengguna",
            content: "Untuk menggunakan fitur tertentu, Anda harus mendaftar dan memelihara akun yang aktif. Anda bertanggung jawab penuh atas segala aktivitas yang terjadi di bawah akun Anda dan wajib menjaga kerahasiaan kata sandi Anda. Field Coffee tidak bertanggung jawab atas kerugian akibat akses tidak sah ke akun Anda."
        },
        {
            title: "3. Pemesanan dan Transaksi",
            content: "Setiap pesanan yang dibuat melalui aplikasi adalah penawaran untuk membeli produk kami. Kami berhak menolak pesanan apa pun. Setelah pesanan dikonfirmasi dan status berubah menjadi 'Diproses', pesanan tidak dapat dibatalkan atau diuangkan kembali."
        },
        {
            title: "4. Sistem Pembayaran",
            content: "Pembayaran dapat dilakukan melalui metode yang tersedia di aplikasi (E-wallet, Transfer, dll). Seluruh harga yang tertera sudah termasuk pajak yang berlaku. Kami tidak menyimpan data kartu kredit atau informasi perbankan sensitif secara langsung."
        },
        {
            title: "5. Pengambilan (Pick-up) & Pengiriman (Delivery)",
            content: "Untuk pesanan Pick-up, Anda wajib mengambil pesanan di lokasi store yang dipilih. Untuk Delivery, pastikan alamat dan nomor kontak aktif. Kesalahan penulisan alamat atau kegagalan penerimaan pesanan di lokasi tujuan merupakan tanggung jawab pengguna."
        },
        {
            title: "6. Program Loyalitas & Referral",
            content: "Partisipasi dalam program referral (Share the Sip) tunduk pada ketentuan khusus. Kami berhak membatalkan reward atau memblokir akun jika ditemukan indikasi kecurangan, penggunaan emulator, atau aktivitas mencurigakan lainnya."
        },
        {
            title: "7. Hak Kekayaan Intelektual",
            content: "Semua konten dalam aplikasi, termasuk teks, grafis, logo, ikon, gambar, klip audio, unduhan digital, dan kode program, adalah milik PT Field Kopi Indonesia atau pemasok kontennya dan dilindungi oleh hukum hak cipta Indonesia dan internasional."
        },
        {
            title: "8. Hukum yang Berlaku",
            content: "Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap perselisihan yang timbul akan diselesaikan melalui musyawarah atau, jika gagal, melalui Pengadilan Negeri Jakarta Selatan."
        }
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
                <View style={styles.heroSection}>
                    <Ionicons name="document-text" size={60} color={colors.primary} />
                    <Text style={[styles.mainTitle, { color: colors.text }]}>Syarat & Ketentuan Umum</Text>
                    <Text style={[styles.dateText, { color: colors.textSecondary }]}>Terakhir diperbarui: 8 Februari 2026</Text>
                </View>

                {sections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
                        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>{section.content}</Text>
                    </View>
                ))}

                <View style={[styles.footer, { backgroundColor: colors.primary + '08' }]}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        Field Coffee berhak mengubah atau memperbarui Syarat & Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan atas aplikasi akan dianggap sebagai persetujuan terhadap perubahan tersebut.
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
    scrollContent: { paddingHorizontal: 25, paddingTop: 20, paddingBottom: 50 },
    heroSection: { alignItems: 'center', marginBottom: 30 },
    mainTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
    dateText: { fontSize: 13 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#D4A056', paddingLeft: 12 },
    sectionText: { fontSize: 14, lineHeight: 22, textAlign: 'justify' },
    footer: { padding: 25, borderRadius: 20, marginTop: 10, borderWidth: 1, borderColor: '#EEE' },
    footerText: { fontSize: 12, textAlign: 'center', fontStyle: 'italic', lineHeight: 20 }
});
