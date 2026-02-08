import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Aktifkan animasi untuk Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DetailShareSip() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'voucher' | 'poin'>('voucher');

    // State untuk Accordion (buka-tutup)
    const [openSections, setOpenSections] = useState({
        voucherCara: true,
        voucherSyarat: false,
        poinCara: true,
        poinSyarat: false
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections({ ...openSections, [section]: !openSections[section] });
    };

    const onShare = async () => {
        try {
            await Share.share({
                message: 'Yuk pakai kode referral aku di Field Coffee dan dapetin Voucher Buy 1 Get 1!',
            });
        } catch (error) { console.log(error); }
    };

    return (
        <View style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#4B2C0E" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Share The Sip</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* --- TITLE --- */}
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitle}>Bagikan Kode Referralmu, Dapatkan Banyak Hadiah</Text>
                    <Text style={styles.subTitle}>Sekarang hadiahnya lebih banyak lho</Text>
                </View>

                {/* --- TAB SELECTOR --- */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabBtn, activeTab === 'voucher' && styles.tabBtnActive]}
                        onPress={() => setActiveTab('voucher')}
                    >
                        <Text style={[styles.tabTxt, activeTab === 'voucher' && styles.tabTxtActive]}>Voucher Buy 1 Get 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabBtn, activeTab === 'poin' && styles.tabBtnActive]}
                        onPress={() => setActiveTab('poin')}
                    >
                        <Text style={[styles.tabTxt, activeTab === 'poin' && styles.tabTxtActive]}>100 Field Poin</Text>
                    </TouchableOpacity>
                </View>

                {/* --- MAIN CARD CONTENT --- */}
                <Animated.View entering={FadeInUp.duration(600)} style={styles.contentCard}>

                    {activeTab === 'voucher' ? (
                        <Animated.View entering={FadeInUp}>
                            <View style={styles.iconCircle}>
                                <Text style={{ fontSize: 50 }}>☕</Text>
                                <View style={styles.badge}><Text style={styles.badgeTxt}>B1G1</Text></View>
                            </View>
                            <Text style={styles.rewardTitle}>Voucher Buy 1 Get 1</Text>
                            <Text style={styles.rewardSub}>Untuk setiap teman yang mendaftar dan transaksi pertama dengan kode referralmu</Text>

                            <View style={styles.divider} />

                            {/* ACCORDION CARA DAPAT */}
                            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('voucherCara')}>
                                <Text style={styles.sectionLabel}>Cara Mendapatkan Hadiah</Text>
                                <Ionicons name={openSections.voucherCara ? "chevron-up" : "chevron-down"} size={20} color="#4B2C0E" />
                            </TouchableOpacity>

                            {openSections.voucherCara && (
                                <Animated.View layout={Layout.springify()} style={styles.accordionContent}>
                                    <Text style={styles.listTxt}>1. Klik tombol "Bagikan Kode Referralmu"</Text>
                                    <Text style={styles.listTxt}>2. Bagikan ke temanmu atau melalui media sosial</Text>
                                    <Text style={styles.listTxt}>3. Jika teman mendaftar & transaksi pertama, kamu otomatis dapat voucher Buy 1 Get 1</Text>
                                </Animated.View>
                            )}

                            <View style={styles.divider} />

                            {/* ACCORDION SYARAT */}
                            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('voucherSyarat')}>
                                <Text style={styles.sectionLabel}>Syarat dan Ketentuan</Text>
                                <Ionicons name={openSections.voucherSyarat ? "chevron-up" : "chevron-down"} size={20} color="#4B2C0E" />
                            </TouchableOpacity>

                            {openSections.voucherSyarat && (
                                <Animated.View layout={Layout.springify()} style={styles.accordionContent}>
                                    <Text style={styles.listTxt}>• Khusus pelanggan baru yang belum terdaftar.</Text>
                                    <Text style={styles.listTxt}>• Perangkat belum pernah digunakan untuk akun Field Coffee lain.</Text>
                                    <Text style={styles.listTxt}>• Masa berlaku voucher adalah 30 hari.</Text>
                                </Animated.View>
                            )}
                        </Animated.View>
                    ) : (
                        <Animated.View entering={FadeInUp}>
                            <View style={styles.iconCirclePoin}>
                                <Text style={{ fontSize: 40 }}>🪙</Text>
                                <Text style={styles.poinVal}>100</Text>
                            </View>
                            <Text style={styles.rewardTitle}>100 Field Poin</Text>
                            <Text style={styles.rewardSub}>Saat 10 teman sudah terdaftar di setiap bulannya</Text>

                            <View style={styles.divider} />

                            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('poinCara')}>
                                <Text style={styles.sectionLabel}>Cara Mendapatkan Hadiah</Text>
                                <Ionicons name={openSections.poinCara ? "chevron-up" : "chevron-down"} size={20} color="#4B2C0E" />
                            </TouchableOpacity>

                            {openSections.poinCara && (
                                <Animated.View layout={Layout.springify()} style={styles.accordionContent}>
                                    <Text style={styles.listTxt}>• Ajak teman pakai kodemu.</Text>
                                    <Text style={styles.listTxt}>• Skema Hadiah:</Text>
                                    <Text style={styles.listSubTxt}>- 5 Poin (1 orang)</Text>
                                    <Text style={styles.listSubTxt}>- 15 Poin (3 orang)</Text>
                                    <Text style={styles.listSubTxt}>- 30 Poin (5 orang)</Text>
                                    <Text style={styles.listSubTxt}>- 50 Poin (10 orang)</Text>
                                </Animated.View>
                            )}

                            <View style={styles.divider} />

                            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('poinSyarat')}>
                                <Text style={styles.sectionLabel}>Syarat dan Ketentuan</Text>
                                <Ionicons name={openSections.poinSyarat ? "chevron-up" : "chevron-down"} size={20} color="#4B2C0E" />
                            </TouchableOpacity>

                            {openSections.poinSyarat && (
                                <Animated.View layout={Layout.springify()} style={styles.accordionContent}>
                                    <Text style={styles.listTxt}>• Poin akan masuk otomatis ke akunmu.</Text>
                                    <Text style={styles.listTxt}>• Field Coffee berhak membatalkan jika ada kecurangan.</Text>
                                </Animated.View>
                            )}
                        </Animated.View>
                    )}
                </Animated.View>
            </ScrollView>

            {/* STICKY BOTTOM BUTTON */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnPrimary} onPress={onShare}>
                    <Text style={styles.btnTxt}>Bagikan Kode Referralmu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15 },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#4B2C0E' },
    titleSection: { padding: 25, alignItems: 'center' },
    mainTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#2D1606' },
    subTitle: { fontSize: 14, color: '#8B5A2B', marginTop: 15 },

    // Tab Styles
    tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
    tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 25, borderWidth: 1, borderColor: '#D4A056', alignItems: 'center', marginRight: 10 },
    tabBtnActive: { backgroundColor: '#4B2C0E', borderColor: '#4B2C0E' },
    tabTxt: { fontSize: 12, color: '#8B5A2B', fontWeight: '500' },
    tabTxtActive: { color: '#FFF', fontWeight: 'bold' },

    // Content Card Styles
    contentCard: { marginHorizontal: 20, padding: 25, borderRadius: 20, backgroundColor: '#FDF7F2', borderWidth: 1, borderColor: '#EEE' },
    iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', elevation: 2 },
    iconCirclePoin: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#4B2C0E', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', elevation: 2 },
    badge: { backgroundColor: '#4B2C0E', paddingHorizontal: 8, borderRadius: 5, marginTop: -10 },
    badgeTxt: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    poinVal: { color: '#FFF', fontWeight: 'bold', fontSize: 24, marginTop: -5 },
    rewardTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: '#4B2C0E' },
    rewardSub: { fontSize: 13, color: '#6F4E37', textAlign: 'center', marginTop: 10, lineHeight: 20 },
    divider: { height: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#D4A056', marginVertical: 15 },

    // Accordion Styles
    accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
    sectionLabel: { fontSize: 14, fontWeight: 'bold', color: '#4B2C0E' },
    accordionContent: { marginTop: 10, paddingLeft: 5 },
    listTxt: { fontSize: 13, color: '#5C4033', lineHeight: 22, marginBottom: 8 },
    listSubTxt: { fontSize: 13, color: '#5C4033', marginLeft: 15, marginBottom: 5 },

    footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE' },
    btnPrimary: { backgroundColor: '#4B2C0E', padding: 18, borderRadius: 30, alignItems: 'center' },
    btnTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});


























