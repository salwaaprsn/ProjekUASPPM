import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const router = useRouter();
    const { t, colors, theme } = useApp();

    const handleWhatsApp = () => {
        const url = `https://wa.me/6285759572330?text=Halo%20Field%20Coffee,%20saya%20butuh%20bantuan.`;
        Linking.openURL(url).catch(() => alert("Gagal membuka WhatsApp."));
    };

    const handleOrder = (type: 'pickup' | 'delivery') => {
        // Navigasi ke tab menu
        router.push('/menu' as any);
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>

            {/* 1. Header Promo Banner */}
            <View style={styles.headerBanner}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000' }}
                    style={styles.bannerImg}
                />
                <View style={styles.bannerOverlay}>
                    <Text style={styles.promoDate}>1 - 28 Feb 2026</Text>
                    <Text style={styles.promoTitle}>KOMBO{"\n"}Field Deli & Drink</Text>
                    <Text style={styles.promoPrice}>Mulai dari Rp 40.900</Text>
                    <Text style={styles.promoTerm}>S&K Berlaku | Kuota Terbatas</Text>
                </View>
                <TouchableOpacity style={styles.notifIcon}>
                    <Ionicons name="notifications-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* 2. Welcome Card (Floating) */}
            <View style={[styles.welcomeCard, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: theme === 'dark' ? 1 : 0 }]}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.welcomeTitle, { color: colors.text }]}>Welcome to Field Coffee!</Text>
                    <View style={[styles.dividerSmall, { backgroundColor: colors.border }]} />
                    <Text style={[styles.welcomeSub, { color: colors.textSecondary }]}>Berbagai rasa Field Coffee siap menemani harimu</Text>
                </View>
            </View>

            {/* 3. Pesan Sekarang Section */}
            <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Pesan Sekarang</Text>
                <View style={styles.orderRow}>
                    <TouchableOpacity
                        style={[styles.orderBox, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={() => handleOrder('pickup')}
                        activeOpacity={0.7}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.boxTitle, { color: colors.primary }]}>Pick Up</Text>
                            <Text style={[styles.boxSub, { color: colors.textSecondary }]}>Ambil di store tanpa antri</Text>
                        </View>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png' }} style={styles.boxIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.orderBox, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={() => handleOrder('delivery')}
                        activeOpacity={0.7}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.boxTitle, { color: colors.primary }]}>Delivery</Text>
                            <Text style={[styles.boxSub, { color: colors.textSecondary }]}>Garansi tepat waktu, dijamin!</Text>
                        </View>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2830/2830305.png' }} style={styles.boxIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 4. Catering Packages Section */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Field Catering Packages</Text>
                    <TouchableOpacity>
                        <Text style={{ color: colors.primary, fontSize: 13, fontWeight: 'bold' }}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cateringScroll}>
                    <CateringPackageCard
                        title="Meeting"
                        price="Rp 250k"
                        desc="Kopi & Snack (10 pax)"
                        icon="people"
                        iconBg="#FDF2E9"
                        colors={colors}
                        onPress={() => router.push({ pathname: '/catering_detail', params: { title: 'Meeting Package', price: '250.000', icon: 'people', iconBg: '#FDF2E9', desc: 'Paket lengkap untuk kebutuhan meeting kantor atau komunitas. Termasuk 10 cup kopi (hot/ice) dan 10 porsi snack ringan pilihan.' } } as any)}
                    />
                    <CateringPackageCard
                        title="Social"
                        price="Rp 750k"
                        desc="Barista Service (3h)"
                        icon="wine"
                        iconBg="#F0F9FF"
                        colors={colors}
                        onPress={() => router.push({ pathname: '/catering_detail', params: { title: 'Social Event', price: '750.000', icon: 'wine', iconBg: '#F0F9FF', desc: 'Bawa suasana cafe ke acara sosialmu. Kami menyediakan 1 Barista profesional selama 3 jam dengan peralatan lengkap.' } } as any)}
                    />
                    <CateringPackageCard
                        title="Wedding"
                        price="Rp 1.5M"
                        desc="Premium & Latte Art"
                        icon="heart"
                        iconBg="#FFF1F2"
                        colors={colors}
                        onPress={() => router.push({ pathname: '/catering_detail', params: { title: 'Wedding Coffee', price: '1.500.000', icon: 'heart', iconBg: '#FFF1F2', desc: 'Momen berharga butuh kopi berkualitas. Paket premium beans dengan service latte art untuk tamu spesialmu.' } } as any)}
                    />
                    <CateringPackageCard
                        title="Birthday"
                        price="Rp 450k"
                        desc="Fun & Sweets (20 pax)"
                        icon="gift"
                        iconBg="#F5F3FF"
                        colors={colors}
                        onPress={() => router.push({ pathname: '/catering_detail', params: { title: 'Birthday Bash', price: '450.000', icon: 'gift', iconBg: '#F5F3FF', desc: 'Rayakan ulang tahun dengan manis. 20 cup signature drink dan dekorasi mini bar yang ceria.' } } as any)}
                    />
                    <CateringPackageCard
                        title="Workshop"
                        price="Rp 300k"
                        desc="Focus & Energy (15 pax)"
                        icon="school"
                        iconBg="#ECFDF5"
                        colors={colors}
                        onPress={() => router.push({ pathname: '/catering_detail', params: { title: 'Workshop Kit', price: '300.000', icon: 'school', iconBg: '#ECFDF5', desc: 'Teman diskusi yang pas. Kopi dengan kadar kafein seimbang untuk menjaga fokus peserta workshop.' } } as any)}
                    />
                    <CateringPackageCard
                        title="Outdoor"
                        price="Rp 500k"
                        desc="Portable Setup (2h)"
                        icon="sunny"
                        iconBg="#FEFCE8"
                        colors={colors}
                        onPress={() => router.push({ pathname: '/catering_detail', params: { title: 'Outdoor Gathering', price: '500.000', icon: 'sunny', iconBg: '#FEFCE8', desc: 'Cocok untuk acara piknik atau gathering outdoor. Setup ringkas dan menu yang menyegarkan dahaga di bawah sinar matahari.' } } as any)}
                    />
                    <CateringPackageCard
                        title="Intimate"
                        price="Rp 200k"
                        desc="Shared Joy (5 pax)"
                        icon="cafe"
                        iconBg="#F9FAFB"
                        colors={colors}
                        onPress={() => router.push({ pathname: '/catering_detail', params: { title: 'Intimate Session', price: '200.000', icon: 'cafe', iconBg: '#F9FAFB', desc: 'Obrolan hangat dengan kopi pilihan. Paket hemat untuk 5 orang dengan pilihan manual brew terbaik.' } } as any)}
                    />
                </ScrollView>
            </View>

            {/* 5. Yang Menarik Section (Grid) */}
            <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Yang Menarik di Field</Text>
                <View style={styles.gridContainer}>
                    <InterestCard
                        title="Share the Sip"
                        sub="Bagikan kode referral, dapatkan hadiah"
                        colors={colors}
                        theme={theme}
                        onPress={() => router.push('/share_the_sip' as any)}
                        icon="gift-outline"
                    />
                    <InterestCard
                        title="Field Gift"
                        sub="Berbagi kebahagiaan dengan orang terdekat"
                        colors={colors}
                        theme={theme}
                        onPress={() => router.push('/field_gift')}
                        icon="card-outline"
                    />
                </View>
            </View>

            {/* 5. Perlu Bantuan Section (WhatsApp) */}
            <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Perlu Bantuan?</Text>
                <TouchableOpacity
                    style={[styles.waBox, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: theme === 'dark' ? 1 : 0 }]}
                    onPress={handleWhatsApp}
                    activeOpacity={0.7}
                >
                    <View style={styles.waIconContainer}>
                        <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text style={[styles.waTitle, { color: colors.text }]}>Field Customer Service (chat only)</Text>
                        <Text style={[styles.waNumber, { color: colors.primary }]}>0857-5957-2330</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView >
    );
}

// Komponen Kartu Paket Catering
const CateringPackageCard = ({ title, price, desc, icon, iconBg, colors, onPress }: any) => (
    <TouchableOpacity
        style={[styles.cateringCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        activeOpacity={0.8}
        onPress={onPress}
    >
        <View style={[styles.cateringIconContainer, { backgroundColor: iconBg || '#F5F5F5' }]}>
            <Ionicons name={icon as any} size={24} color={colors.primary} />
        </View>
        <View style={styles.cateringInfo}>
            <Text style={[styles.cateringTitle, { color: colors.text }]} numberOfLines={1}>{title}</Text>
            <Text style={[styles.cateringDesc, { color: colors.textSecondary }]} numberOfLines={2}>{desc}</Text>
            <Text style={[styles.cateringPrice, { color: colors.primary }]}>{price}</Text>
        </View>
    </TouchableOpacity>
);

// Komponen Kecil untuk Kartu Grid
const InterestCard = ({ title, sub, icon, colors, theme, onPress }: any) => (
    <TouchableOpacity
        style={[styles.interestCard, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: theme === 'dark' ? 1 : 0 }]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={[styles.interestIconBg, { backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F9F1EB' }]}>
            <Ionicons name={icon} size={24} color={colors.primary} />
        </View>
        <Text style={[styles.interestTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.interestSub, { color: colors.textSecondary }]}>{sub}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1 },

    // Banner Atas
    headerBanner: { height: 280, position: 'relative' },
    bannerImg: { width: '100%', height: '100%', resizeMode: 'cover' },
    bannerOverlay: { position: 'absolute', bottom: 60, left: 20 },
    promoDate: { color: 'white', fontSize: 12, opacity: 0.9 },
    promoTitle: { color: 'white', fontSize: 24, fontWeight: 'bold', marginVertical: 5 },
    promoPrice: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    promoTerm: { color: 'white', fontSize: 10, marginTop: 10, opacity: 0.7 },
    notifIcon: { position: 'absolute', top: 50, right: 20, backgroundColor: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 25 },

    // Welcome Card
    welcomeCard: {
        marginHorizontal: 20, padding: 20, borderRadius: 15,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10,
        marginTop: -40
    },
    welcomeTitle: { fontWeight: 'bold', fontSize: 16 },
    dividerSmall: { height: 1, width: 30, marginVertical: 5 },
    welcomeSub: { fontSize: 12, maxWidth: '80%' },
    masukBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20 },
    masukBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold' },

    // Section General
    sectionContainer: { marginTop: 25, paddingHorizontal: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },

    // Pick Up & Delivery
    orderRow: { flexDirection: 'row', justifyContent: 'space-between' },
    orderBox: {
        width: '49%', borderRadius: 15, padding: 15,
        borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center'
    },
    boxTitle: { fontWeight: 'bold', fontSize: 16 },
    boxSub: { fontSize: 10, marginTop: 4 },
    boxIcon: { width: 40, height: 40, opacity: 0.9, marginLeft: 5 },

    // Catering Section
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 15 },
    cateringScroll: { paddingRight: 20, paddingBottom: 5 },
    cateringCard: { width: 140, borderRadius: 20, marginRight: 12, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, borderWidth: 1, padding: 12 },
    cateringIconContainer: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    cateringImg: { width: '100%', height: 150 },
    cateringInfo: { padding: 0 },
    cateringTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 2 },
    cateringDesc: { fontSize: 9, marginBottom: 8, lineHeight: 12, height: 24 },
    cateringPrice: { fontSize: 12, fontWeight: 'bold' },

    // Grid Section
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    interestCard: { width: '48.5%', borderRadius: 15, padding: 15, marginBottom: 15, elevation: 2, alignItems: 'center' },
    interestIconBg: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    badge: { position: 'absolute', top: 0, right: 15, backgroundColor: '#D35400', paddingHorizontal: 8, paddingVertical: 2, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, zIndex: 1 },
    badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
    placeholderImg: { width: '100%', height: 80, borderRadius: 10, marginBottom: 10 },
    interestTitle: { fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
    interestSub: { fontSize: 10, textAlign: 'center', marginTop: 5 },

    // WA Help Section
    waBox: { borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', elevation: 2 },
    waIconContainer: { padding: 5 },
    waTitle: { fontSize: 13, fontWeight: 'bold' },
    waNumber: { fontSize: 14, fontWeight: 'bold', marginTop: 2 }
});
