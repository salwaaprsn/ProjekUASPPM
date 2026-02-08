import { useApp } from '@/context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MediaSosialScreen() {
    const router = useRouter();
    const { colors } = useApp();

    const socialMedia = [
        {
            name: 'Instagram',
            handle: '@fieldcoffee.id',
            icon: 'logo-instagram',
            description: 'Update promo & menu harian terbaru',
            color: '#E1306C',
            url: 'https://instagram.com/fieldcoffee.id'
        },
        {
            name: 'Twitter (X)',
            handle: '@fieldcoffee',
            icon: 'logo-twitter',
            description: 'Berita & pengumuman cepat',
            color: '#1DA1F2',
            url: 'https://twitter.com/fieldcoffee'
        },
        {
            name: 'Facebook',
            handle: 'Field Coffee Indonesia',
            icon: 'logo-facebook',
            description: 'Komunitas & acara Field Coffee',
            color: '#4267B2',
            url: 'https://facebook.com/fieldcoffee.id'
        },
        {
            name: 'TikTok',
            handle: '@fieldcoffee',
            icon: 'logo-tiktok',
            description: 'Konten seru & video estetik',
            color: '#010101',
            url: 'https://tiktok.com/@fieldcoffee'
        }
    ];

    const handleOpenLink = (url: string) => {
        Linking.openURL(url).catch(() => {
            // Silently fail
        });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Media Sosial</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroSection}>
                    <View style={[styles.heroIcon, { backgroundColor: colors.primary + '15' }]}>
                        <Ionicons name="megaphone" size={50} color={colors.primary} />
                    </View>
                    <Text style={[styles.mainTitle, { color: colors.text }]}>Ikuti Kami</Text>
                    <Text style={[styles.mainSub, { color: colors.textSecondary }]}>
                        Jangan ketinggalan informasi menarik dan promo eksklusif setiap harinya!
                    </Text>
                </View>

                <View style={styles.listContainer}>
                    {socialMedia.map((social, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.socialItem, { borderBottomColor: colors.border }]}
                            onPress={() => handleOpenLink(social.url)}
                        >
                            <View style={[styles.iconBox, { backgroundColor: social.color + '15' }]}>
                                <Ionicons name={social.icon as any} size={26} color={social.color} />
                            </View>
                            <View style={styles.info}>
                                <Text style={[styles.socialName, { color: colors.text }]}>{social.name}</Text>
                                <Text style={[styles.socialHandle, { color: colors.primary }]}>{social.handle}</Text>
                                <Text style={[styles.socialDesc, { color: colors.textSecondary }]}>{social.description}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={colors.border} />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={[styles.footer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        Seluruh akun di atas adalah akun resmi milik PT Field Kopi Indonesia.
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
    scrollContent: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 50 },
    heroSection: { alignItems: 'center', marginBottom: 40 },
    heroIcon: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    mainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    mainSub: { fontSize: 14, textAlign: 'center', paddingHorizontal: 30, lineHeight: 22 },
    listContainer: { marginBottom: 30 },
    socialItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1
    },
    iconBox: {
        width: 55,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18
    },
    info: { flex: 1 },
    socialName: { fontSize: 16, fontWeight: 'bold' },
    socialHandle: { fontSize: 13, fontWeight: '600', marginTop: 2 },
    socialDesc: { fontSize: 12, marginTop: 4 },
    footer: { padding: 25, borderRadius: 20, borderWidth: 1, alignItems: 'center' },
    footerText: { fontSize: 11, textAlign: 'center', lineHeight: 18 }
});
