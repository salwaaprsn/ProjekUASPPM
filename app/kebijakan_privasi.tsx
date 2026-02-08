import { useApp } from '@/context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function KebijakanPrivasiScreen() {
    const router = useRouter();
    const { colors, theme } = useApp();

    const sections = [
        {
            title: "1. Informasi yang Kami Kumpulkan",
            content: "Kami mengumpulkan berbagai jenis informasi untuk menyediakan dan meningkatkan Layanan kepada Anda, termasuk:\n• Informasi Pribadi: Nama, alamat email, nomor telepon, tanggal lahir.\n• Data Transaksi: Riwayat pembelian dan preferensi produk.\n• Data Lokasi: Dengan izin Anda, kami mengumpulkan data lokasi GPS yang akurat untuk memberikan layanan store terdekat."
        },
        {
            title: "2. Bagaimana Kami Menggunakan Informasi Anda",
            content: "PT Field Kopi Indonesia menggunakan data yang dikumpulkan untuk berbagai tujuan:\n• Menyediakan dan memelihara Layanan kami.\n• Memberitahukan Anda tentang perubahan pada Layanan kami.\n• Memungkinkan Anda untuk berpartisipasi dalam fitur interaktif Layanan kami.\n• Memberikan dukungan pelanggan dan memproses transaksi pembayaran."
        },
        {
            title: "3. Retensi dan Keamanan Data",
            content: "Kami hanya akan menyimpan data pribadi Anda selama diperlukan untuk tujuan yang ditetapkan dalam Kebijakan Privasi ini. Kami menggunakan metode enkripsi standar industri untuk melindungi data sensitif Anda, namun kami tidak dapat menjamin keamanan absolut melalui transmisi internet."
        },
        {
            title: "4. Pengungkapan kepada Pihak Ketiga",
            content: "Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi Anda dengan mitra tepercaya (seperti mitra pengiriman atau penyedia layanan pembayaran) yang telah setuju untuk menjaga kerahasiaan data tersebut sesuai hukum yang berlaku."
        },
        {
            title: "5. Cookie dan Teknologi Pelacakan",
            content: "Kami menggunakan cookie dan teknologi pelacakan serupa untuk melacak aktivitas di Layanan kami dan menyimpan informasi tertentu. Cookie dikirim ke browser Anda dari situs web dan disimpan di perangkat Anda. Anda dapat mengatur browser untuk menolak semua cookie."
        },
        {
            title: "6. Kebijakan Anak-anak",
            content: "Layanan kami tidak ditujukan kepada siapa pun yang berusia di bawah 13 tahun. Kami tidak secara sengaja mengumpulkan informasi identitas pribadi dari anak-anak di bawah 13 tahun tanpa persetujuan orang tua."
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Kebijakan Privasi</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroSection}>
                    <Ionicons name="shield-checkmark" size={60} color={colors.primary} />
                    <Text style={[styles.mainTitle, { color: colors.text }]}>Kebijakan Privasi</Text>
                    <Text style={[styles.dateText, { color: colors.textSecondary }]}>Terakhir diperbarui: 8 Februari 2026</Text>
                </View>

                <View style={styles.introBox}>
                    <Text style={[styles.introText, { color: colors.textSecondary }]}>
                        Kami sangat menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda saat menggunakan aplikasi Field Coffee.
                    </Text>
                </View>

                {sections.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
                        <Text style={[styles.sectionText, { color: colors.textSecondary }]}>{section.content}</Text>
                    </View>
                ))}

                <View style={[styles.footer, { backgroundColor: colors.primary + '08' }]}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui Customer Service atau email di support@fieldcoffee.id.
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
    heroSection: { alignItems: 'center', marginBottom: 25 },
    mainTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
    dateText: { fontSize: 13 },
    introBox: { marginBottom: 35, padding: 20, borderRadius: 15, borderLeftWidth: 5, borderLeftColor: '#D4A056', backgroundColor: '#F9F9F9' },
    introText: { fontSize: 14, fontStyle: 'italic', lineHeight: 22 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 12 },
    sectionText: { fontSize: 14, lineHeight: 22, textAlign: 'justify' },
    footer: { padding: 25, borderRadius: 20, marginTop: 10, alignItems: 'center', borderStyle: 'dotted', borderWidth: 1, borderColor: '#D4A056' },
    footerText: { fontSize: 12, textAlign: 'center', lineHeight: 20 }
});
