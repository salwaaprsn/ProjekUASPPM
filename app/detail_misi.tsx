import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function DetailMisiScreen() {
    const router = useRouter();
    const { colors, theme } = useApp();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Detail Misi</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.badgeRow}>
                        <View style={[styles.mBadge, { backgroundColor: colors.primary }]}>
                            <Ionicons name="flash" size={14} color="#FFF" />
                            <Text style={styles.mBadgeTxt}>Misi Aktif</Text>
                        </View>
                        <Text style={[styles.expiryText, { color: colors.textSecondary }]}>Selesai dlm 20 hari</Text>
                    </View>

                    <Text style={[styles.cardTitle, { color: colors.text }]}>Ajak 10 Temanmu pakai Kode Referral</Text>
                    <Text style={[styles.cardSub, { color: colors.textSecondary }]}>Dapatkan reward spesial setelah temanmu melakukan transaksi pertama.</Text>

                    <View style={styles.progressSection}>
                        <View style={styles.progressHeader}>
                            <Text style={[styles.progressLabel, { color: colors.text }]}>Progress</Text>
                            <Text style={[styles.progressValue, { color: colors.primary }]}>0/10 Teman</Text>
                        </View>
                        <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '0%' }]} />
                        </View>
                    </View>

                    <View style={[styles.rewardBox, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}>
                        <Ionicons name="gift" size={24} color={colors.primary} />
                        <Text style={[styles.rewardTxt, { color: colors.text }]}>Reward: <Text style={{ fontWeight: 'bold' }}>100 Field Poin</Text></Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Cara Mengikuti Misi</Text>
                <View style={styles.stepContainer}>
                    <StepItem
                        num="1"
                        title="Bagikan Kode"
                        desc="Bagikan kode referral unikmu ke teman atau keluarga."
                        colors={colors}
                    />
                    <StepItem
                        num="2"
                        title="Teman Mendaftar"
                        desc="Pastikan mereka mendaftar menggunakan kodemu."
                        colors={colors}
                    />
                    <StepItem
                        num="3"
                        title="Transaksi Pertama"
                        desc="Misi terhitung setelah temanmu melakukan transaksi pertama di aplikasi."
                        colors={colors}
                    />
                    <StepItem
                        num="4"
                        title="Terima Reward"
                        desc="Field Poin akan otomatis masuk ke akunmu setelah misi selesai!"
                        colors={colors}
                    />
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Teman yang Diakses (0)</Text>
                <View style={styles.emptyContainer}>
                    <Ionicons name="people-outline" size={60} color={colors.border} />
                    <Text style={[styles.emptyTxt, { color: colors.textSecondary }]}>Belum ada teman yang menggunakan kodemu. Yuk ajak sekarang!</Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
                <Text style={styles.ctaBtnTxt}>Ajukan Referral</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const StepItem = ({ num, title, desc, colors }: any) => (
    <View style={styles.stepItem}>
        <View style={[styles.stepNum, { backgroundColor: colors.primary }]}>
            <Text style={styles.stepNumTxt}>{num}</Text>
        </View>
        <View style={styles.stepInfo}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>{desc}</Text>
        </View>
    </View>
);

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
    scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
    card: { padding: 20, borderRadius: 25, borderWidth: 1, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, marginBottom: 25 },
    badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    mBadge: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15, alignItems: 'center' },
    mBadgeTxt: { color: '#FFF', fontSize: 11, fontWeight: 'bold', marginLeft: 5 },
    expiryText: { fontSize: 11, fontWeight: '500' },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    cardSub: { fontSize: 13, lineHeight: 20, marginBottom: 20 },
    progressSection: { marginBottom: 20 },
    progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    progressLabel: { fontSize: 14, fontWeight: '600' },
    progressValue: { fontSize: 14, fontWeight: 'bold' },
    progressBarBg: { height: 10, borderRadius: 5, overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: 5 },
    rewardBox: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, borderWidth: 1, borderStyle: 'dashed' },
    rewardTxt: { marginLeft: 12, fontSize: 14 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
    stepContainer: { marginBottom: 30 },
    stepItem: { flexDirection: 'row', marginBottom: 20 },
    stepNum: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    stepNumTxt: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
    stepInfo: { flex: 1 },
    stepTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
    stepDesc: { fontSize: 13, lineHeight: 18 },
    emptyContainer: { alignItems: 'center', marginVertical: 40 },
    emptyTxt: { marginTop: 15, textAlign: 'center', fontSize: 13, paddingHorizontal: 40, lineHeight: 20 },
    ctaBtn: { position: 'absolute', bottom: 25, left: 20, right: 20, padding: 18, borderRadius: 30, alignItems: 'center', elevation: 5 },
    ctaBtnTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
