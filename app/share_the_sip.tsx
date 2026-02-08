import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Dimensions, Platform, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ShareTheSipScreen() {
    const router = useRouter();
    const referralCode = "B9C01D";

    const copyCode = async () => {
        await Clipboard.setStringAsync(referralCode);
        Alert.alert("Salin Berhasil", "Kode referral sudah disalin!");
    };

    const onShare = async () => {
        try {
            await Share.share({ message: `Gunakan kode [${referralCode}] untuk kopi gratis di Field Coffee!` });
        } catch (e) { console.log(e); }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} color="#333" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Share the Sip</Text>
                <TouchableOpacity><Ionicons name="information-circle-outline" size={24} color="#333" /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <Text style={styles.mainTitle}>Bagikan Kode Referralmu, Dapatkan Banyak Hadiah</Text>

                {/* Voucher Carousel Mockup */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel} contentContainerStyle={{ paddingRight: 40 }}>
                    <View style={styles.vCard}>
                        <View style={styles.vIcon}><Text style={{ fontSize: 24 }}>☕</Text></View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.vTitle}>Voucher Buy 1 Get 1</Text>
                            <Text style={styles.vSub}>Teman mendaftar & transaksi pertama</Text>
                        </View>
                    </View>
                    <View style={[styles.vCard, { marginLeft: 15 }]}>
                        <View style={[styles.vIcon, { backgroundColor: '#E0F7FA' }]}><Text style={{ fontSize: 24 }}>🍩</Text></View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.vTitle}>Voucher Free Donut</Text>
                            <Text style={styles.vSub}>Setiap ajakan yang berhasil</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Referral Box */}
                <View style={styles.refContainer}>
                    <View style={styles.refBadge}><Text style={styles.refBadgeTxt}>Kode Referralmu</Text></View>
                    <View style={styles.dashedBox}>
                        <Text style={styles.codeTxt}>{referralCode}</Text>
                        <TouchableOpacity onPress={copyCode} style={styles.copyIconBtn}>
                            <Ionicons name="copy-outline" size={24} color="#4B2C0E" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.usageRow} onPress={() => router.push('/detail_misi')}>
                        <Ionicons name="checkmark-circle" size={18} color="#4B2C0E" />
                        <Text style={styles.usageTxt}>Pengguna kode referralmu : 0</Text>
                        <Ionicons name="chevron-forward" size={16} color="#333" />
                    </TouchableOpacity>
                    <View style={styles.inviteBar}>
                        <Text style={styles.inviteTxt}>Yuk, ajak temanmu sekarang</Text>
                        <TouchableOpacity style={styles.btnShareMini} onPress={onShare}><Text style={styles.btnShareTxt}>Bagikan Kode</Text></TouchableOpacity>
                    </View>
                </View>

                {/* Misi Section */}
                <View style={styles.missionSection}>
                    <View style={styles.mBadge}><Ionicons name="flash" size={14} color="#FFF" /><Text style={styles.mBadgeTxt}>Misi Bulanan</Text></View>
                    <Text style={styles.mTitle}>Ajak 10 Temanmu pakai Kode Referral</Text>
                    <View style={styles.pointCard}><Text style={styles.pText}>🎁 Total Hadiah : <Text style={{ fontWeight: 'bold' }}>100 Field Poin</Text></Text></View>

                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/detail_misi' as any)}>
                        <Text style={styles.menuItemTxt}>Detail Misi</Text>
                        <Ionicons name="chevron-forward" size={18} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/syarat_ketentuan_referral' as any)}>
                        <Text style={styles.menuItemTxt}>Syarat & Ketentuan</Text>
                        <Ionicons name="chevron-forward" size={18} color="#333" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.stickyBtn} onPress={onShare}>
                <Text style={styles.stickyBtnTxt}>Bagikan Kode Referralmu</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF7F2' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 45 : 10,
        paddingBottom: 15,
        backgroundColor: '#FFF'
    },
    headerTitle: { fontSize: 16, fontWeight: '600', color: '#4B2C0E' },
    mainTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#2D1606', marginTop: 25, paddingHorizontal: 20 },
    carousel: { paddingLeft: 20, marginTop: 20 },
    vCard: { width: width * 0.75, backgroundColor: '#FFF', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', elevation: 2 },
    vIcon: { width: 50, height: 50, backgroundColor: '#FDF7F2', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    vTitle: { fontWeight: 'bold', fontSize: 14, color: '#4B2C0E' },
    vSub: { fontSize: 10, color: '#8B5A2B' },
    refContainer: { marginHorizontal: 20, marginTop: 40, backgroundColor: '#FFF', borderRadius: 20, elevation: 4, alignItems: 'center' },
    refBadge: { backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10, marginTop: -15, elevation: 2 },
    refBadgeTxt: { fontWeight: 'bold', fontSize: 12, color: '#4B2C0E' },
    dashedBox: {
        width: '85%',
        borderStyle: 'dashed',
        borderWidth: 1.5,
        borderColor: '#4B2C0E',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        position: 'relative'
    },
    codeTxt: { fontSize: 22, fontWeight: 'bold', letterSpacing: 4, color: '#2D1606', textAlign: 'center' },
    copyIconBtn: { position: 'absolute', right: 15, padding: 5 },
    usageRow: { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 15, alignItems: 'center', width: '100%' },
    usageTxt: { flex: 1, marginLeft: 10, fontSize: 12, color: '#6F4E37' },
    inviteBar: { backgroundColor: '#D4A056', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    inviteTxt: { color: '#FFF', fontSize: 12, fontWeight: '600' },
    btnShareMini: { backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
    btnShareTxt: { color: '#4B2C0E', fontWeight: 'bold', fontSize: 11 },
    missionSection: { marginTop: 40, paddingHorizontal: 20, alignItems: 'center' },
    mBadge: { backgroundColor: '#A0522D', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15, alignItems: 'center' },
    mBadgeTxt: { color: '#FFF', fontSize: 11, fontWeight: 'bold', marginLeft: 5 },
    mTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 15, color: '#2D1606' },
    pointCard: { borderWidth: 1, borderColor: '#D4A056', borderRadius: 20, padding: 10, marginVertical: 20, backgroundColor: '#FDF7F2' },
    pText: { fontSize: 12, color: '#4B2C0E' },
    menuItem: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#EEE' },
    menuItemTxt: { fontSize: 14, fontWeight: '500', color: '#4B2C0E' },
    stickyBtn: { position: 'absolute', bottom: 20, alignSelf: 'center', width: '90%', backgroundColor: '#4B2C0E', padding: 18, borderRadius: 30, alignItems: 'center' },
    stickyBtnTxt: { color: '#FFF', fontWeight: 'bold' }
});