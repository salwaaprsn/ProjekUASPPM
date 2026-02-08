import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import {
    Alert, Image, KeyboardAvoidingView, Linking, Platform,
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import { TermsModal } from '../components/TermsModal';
import { useApp } from '../context/AppContext';

// --- DEFINISI TIPE DATA ---
interface UserProfile {
    username: string;
    email: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    no_telepon: string;
    member_sejak: string;
}

const db = SQLite.openDatabaseSync('antigravity.db');

export default function AkunScreen() {
    const router = useRouter();
    const { t, colors, theme } = useApp();
    const [mode, setMode] = useState<'main' | 'edit'>('main');
    const [isTermsVisible, setIsTermsVisible] = useState(false);

    const [profile, setProfile] = useState<UserProfile>({
        username: 'Salwa',
        email: 'salwaaprsn@gmail.com',
        tanggal_lahir: '17 April 2005',
        jenis_kelamin: 'Perempuan',
        no_telepon: '+6288901794995',
        member_sejak: '6 Januari 2026'
    });

    // --- INISIALISASI DATABASE ---
    useEffect(() => {
        try {
            db.execSync(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY NOT NULL, 
                    username TEXT, email TEXT, tanggal_lahir TEXT, 
                    jenis_kelamin TEXT, no_telepon TEXT, member_sejak TEXT
                );
            `);
            const result = db.getFirstSync<UserProfile>('SELECT * FROM users WHERE id = 1');
            if (result) setProfile(result);
        } catch (error) {
            console.error("Database Error:", error);
        }
    }, []);

    // --- FUNGSI WHATSAPP ---
    const handleWhatsApp = () => {
        const phoneNumber = '6285759572330';
        const message = 'Halo Salwa, saya butuh bantuan terkait aplikasi Field Coffee.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => Alert.alert("Error", "Gagal membuka WhatsApp."));
    };

    // --- FUNGSI SOSIAL MEDIA ---
    const openSocialMedia = () => {
        Linking.openURL('https://instagram.com/fieldcoffee.id').catch(() =>
            Alert.alert("Error", "Gagal membuka browser.")
        );
    };

    // --- FUNGSI LOGOUT ---
    const handleLogout = () => {
        Alert.alert(t('logout'), t('logout_confirm'), [
            { text: t('cancel'), style: "cancel" },
            {
                text: t('logout'),
                style: "destructive",
                onPress: () => {
                    router.replace('/');
                }
            }
        ]);
    };

    // --- FUNGSI SIMPAN PROFIL ---
    const handleSimpan = () => {
        try {
            db.runSync(
                `INSERT OR REPLACE INTO users (id, username, email, tanggal_lahir, jenis_kelamin, no_telepon, member_sejak) 
                 VALUES (1, ?, ?, ?, ?, ?, ?)`,
                [profile.username, profile.email, profile.tanggal_lahir, profile.jenis_kelamin, profile.no_telepon, profile.member_sejak]
            );
            Alert.alert(t('save'), "Data profil kamu telah diperbarui!");
        } catch (error) {
            Alert.alert("Error", "Gagal menyimpan data ke database.");
        }
    };

    // Komponen Baris Menu
    const MenuRow = ({ title, onPress, icon = "chevron-forward" }: { title: string, onPress?: () => void, icon?: string }) => (
        <TouchableOpacity style={[styles.menuRow, { borderBottomColor: colors.border }]} onPress={onPress}>
            <Text style={[styles.menuRowText, { color: colors.text }]}>{title}</Text>
            <Ionicons name={icon as any} size={18} color={colors.primary} />
        </TouchableOpacity>
    );

    if (mode === 'main') {
        return (
            <ScrollView style={[styles.bgMain, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
                <View style={styles.mainWrapper}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>{t('account')}</Text>

                    <TouchableOpacity style={[styles.bannerProfil, { backgroundColor: colors.primary }]} onPress={() => setMode('edit')}>
                        <Image source={require('../assets/salwa.jpg')} style={styles.imgAvatarSmall} />
                        <View style={styles.infoProfil}>
                            <Text style={styles.txtNamaWhite}>{profile.username}</Text>
                            <Text style={styles.txtTelpWhite}>{profile.no_telepon}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#FFF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.cardWhiteFlat, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={() => router.push('/share_the_sip' as any)}
                    >
                        <Text style={[styles.txtBoldBrown, { color: colors.accent }]}>Share the Sip</Text>
                        <Text style={[styles.txtSmallGray, { color: colors.textSecondary }]}>Bagikan kode referral, dapatkan hadiah</Text>
                    </TouchableOpacity>

                    <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
                        <MenuRow title={t('saved_addresses')} onPress={() => router.push('/alamat')} />
                        <MenuRow title={t('payment_methods')} onPress={() => router.push('/metode_pembayaran')} />
                        <MenuRow title="Pusat Bantuan" onPress={handleWhatsApp} />
                        <MenuRow title={t('settings')} onPress={() => router.push('/pengaturan')} />
                    </View>

                    <View style={[styles.menuSection, { backgroundColor: colors.card }]}>
                        <MenuRow title="Syarat dan Ketentuan" onPress={() => router.push('/syarat_ketentuan' as any)} />
                        <MenuRow title="Kebijakan Privasi" onPress={() => router.push('/kebijakan_privasi' as any)} />
                        <MenuRow title="Media Sosial" onPress={() => router.push('/media_sosial' as any)} />
                    </View>

                    <Text style={[styles.txtHelpTitle, { color: colors.text }]}>Butuh Bantuan?</Text>
                    <Text style={[styles.txtHelpSub, { color: colors.textSecondary }]}>Costumer Services kami siap untuk membantu!</Text>

                    <TouchableOpacity style={[styles.cardWA, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleWhatsApp}>
                        <Ionicons name="logo-whatsapp" size={35} color="#25D366" />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={[styles.txtWAName, { color: colors.text }]}>Field Costumer Services</Text>
                            <Text style={[styles.txtWANumber, { color: colors.textSecondary }]}>0857-5957-2330</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={[styles.txtVersion, { color: colors.textSecondary }]}>Version 4.12.1</Text>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.txtLogout}>{t('logout')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TermsModal isVisible={isTermsVisible} onClose={() => setIsTermsVisible(false)} />
            </ScrollView>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={[styles.bgWhite, { backgroundColor: colors.background }]}
        >
            <ScrollView contentContainerStyle={styles.editWrapper}>
                <View style={styles.editHeaderRow}>
                    <TouchableOpacity onPress={() => setMode('main')}>
                        <Ionicons name="chevron-back" size={28} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.editHeaderTitle, { color: colors.text }]}>Akun Saya</Text>
                    <View style={{ width: 28 }} />
                </View>

                <View style={styles.badgeMemberContainer}>
                    <View style={[styles.badgeMember, { backgroundColor: colors.primary }]}>
                        <Text style={styles.badgeText}>Member sejak: {profile.member_sejak}</Text>
                    </View>
                </View>

                <View style={styles.centerItems}>
                    <Image source={require('../assets/salwa.jpg')} style={styles.imgAvatarLarge} />
                    <Text style={[styles.txtVoucherInfo, { color: colors.accent }]}>Lengkapi data dirimu sekarang!</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={[styles.formLabel, { color: colors.primary }]}>Username</Text>
                    <TextInput
                        style={[styles.formInput, { borderBottomColor: colors.border, color: colors.text }]}
                        value={profile.username}
                        onChangeText={(t) => setProfile({ ...profile, username: t })}
                    />

                    <Text style={[styles.formLabel, { color: colors.primary }]}>Email</Text>
                    <TextInput
                        style={[styles.formInput, { borderBottomColor: colors.border, color: colors.text }]}
                        value={profile.email}
                        onChangeText={(t) => setProfile({ ...profile, email: t })}
                        keyboardType="email-address"
                    />

                    <Text style={[styles.formLabel, { color: colors.primary }]}>Tanggal Lahir</Text>
                    <TextInput
                        style={[styles.formInput, { borderBottomColor: colors.border, color: colors.text }]}
                        value={profile.tanggal_lahir}
                        onChangeText={(t) => setProfile({ ...profile, tanggal_lahir: t })}
                    />

                    <Text style={[styles.formLabel, { color: colors.primary }]}>Jenis Kelamin</Text>
                    <View style={styles.genderSelector}>
                        <TouchableOpacity
                            style={[
                                styles.genderBtn,
                                { backgroundColor: colors.card, borderColor: colors.border },
                                profile.jenis_kelamin === 'Laki-laki' && { backgroundColor: colors.primary, borderColor: colors.primary }
                            ]}
                            onPress={() => setProfile({ ...profile, jenis_kelamin: 'Laki-laki' })}
                        >
                            <Text style={[
                                styles.genderBtnText,
                                { color: colors.textSecondary },
                                profile.jenis_kelamin === 'Laki-laki' && { color: '#FFF' }
                            ]}>Laki-laki</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.genderBtn,
                                { backgroundColor: colors.card, borderColor: colors.border },
                                profile.jenis_kelamin === 'Perempuan' && { backgroundColor: colors.primary, borderColor: colors.primary }
                            ]}
                            onPress={() => setProfile({ ...profile, jenis_kelamin: 'Perempuan' })}
                        >
                            <Text style={[
                                styles.genderBtnText,
                                { color: colors.textSecondary },
                                profile.jenis_kelamin === 'Perempuan' && { color: '#FFF' }
                            ]}>Perempuan</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.formLabel, { color: colors.primary }]}>No Telepon</Text>
                    <TextInput
                        style={[styles.formInput, { borderBottomColor: colors.border, color: colors.text }]}
                        value={profile.no_telepon}
                        onChangeText={(t) => setProfile({ ...profile, no_telepon: t })}
                        keyboardType="phone-pad"
                    />
                </View>

                <TouchableOpacity style={[styles.btnSimpanFull, { backgroundColor: colors.primary }]} onPress={handleSimpan}>
                    <Text style={styles.txtBtnWhite}>{t('save')}</Text>
                </TouchableOpacity>
                <View style={{ height: 40 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    bgMain: { flex: 1 },
    bgWhite: { flex: 1 },
    mainWrapper: { padding: 20, paddingTop: 40 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 25 },
    bannerProfil: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 15 },
    imgAvatarSmall: { width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#FFF' },
    infoProfil: { flex: 1, marginLeft: 15 },
    txtNamaWhite: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    txtTelpWhite: { color: '#DDD', fontSize: 12 },
    cardWhiteFlat: { padding: 18, borderRadius: 15, borderWidth: 1, marginBottom: 15 },
    txtBoldBrown: { fontWeight: 'bold', fontSize: 14 },
    txtSmallGray: { fontSize: 11, marginTop: 4 },
    menuSection: { borderRadius: 15, marginBottom: 15, paddingVertical: 5 },
    menuRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 0.5 },
    menuRowText: { fontSize: 14 },
    txtHelpTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    txtHelpSub: { fontSize: 12, marginBottom: 15 },
    cardWA: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, borderWidth: 1 },
    txtWAName: { fontWeight: 'bold', fontSize: 14 },
    txtWANumber: { fontSize: 13 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingBottom: 40 },
    txtVersion: { fontSize: 12 },
    txtLogout: { color: 'red', fontWeight: 'bold' },
    editWrapper: { paddingHorizontal: 25, paddingTop: 40 },
    editHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    editHeaderTitle: { fontSize: 18, fontWeight: 'bold' },
    badgeMemberContainer: { alignItems: 'center', marginBottom: 10 },
    badgeMember: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 },
    badgeText: { color: '#FFF', fontSize: 10 },
    centerItems: { alignItems: 'center' },
    imgAvatarLarge: { width: 120, height: 120, borderRadius: 60, marginVertical: 15 },
    txtVoucherInfo: { fontSize: 11, textAlign: 'center', paddingHorizontal: 30, lineHeight: 16 },
    formContainer: { marginTop: 10 },
    formLabel: { fontSize: 12, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
    formInput: { borderBottomWidth: 1, paddingVertical: 6, fontSize: 14, marginBottom: 5 },
    genderSelector: { flexDirection: 'row', marginTop: 5, marginBottom: 5 },
    genderBtn: { flex: 1, paddingVertical: 10, borderWidth: 1, alignItems: 'center', borderRadius: 12, marginRight: 10 },
    genderBtnText: { fontSize: 13, fontWeight: '500' },
    btnSimpanFull: { padding: 15, borderRadius: 30, marginTop: 30 },
    txtBtnWhite: { color: '#FFF', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
