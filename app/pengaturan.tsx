import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { LanguageCode } from '../constants/translations';
import { useApp } from '../context/AppContext';

const SettingsItem = ({ icon, title, value, type, onPress, colors, theme }: any) => (
    <TouchableOpacity
        style={[styles.item, { borderBottomColor: colors.border }]}
        onPress={onPress}
        disabled={type === 'switch'}
        activeOpacity={0.7}
    >
        <View style={[styles.iconBox, { backgroundColor: theme === 'light' ? '#FDF7F2' : '#2A2A2A' }]}>
            <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text style={[styles.itemTitle, { color: colors.text }]}>{title}</Text>
        {type === 'switch' ? (
            <Switch
                value={value}
                onValueChange={onPress}
                trackColor={{ false: '#DDD', true: colors.primary }}
                thumbColor="#FFF"
            />
        ) : (
            <View style={styles.rightSide}>
                {value && <Text style={[styles.itemValue, { color: colors.textSecondary }]}>{value}</Text>}
                <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </View>
        )}
    </TouchableOpacity>
);

export default function PengaturanScreen() {
    const router = useRouter();
    const { theme, language, toggleTheme, setLanguage, t, colors } = useApp();

    const [notifEnabled, setNotifEnabled] = useState(true);
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [langModalVisible, setLangModalVisible] = useState(false);

    const languages: { code: LanguageCode, name: string }[] = [
        { code: 'id', name: 'Bahasa Indonesia' },
        { code: 'en', name: 'English' }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.header }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
                    <Ionicons name="chevron-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.primary }]}>{t('settings')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>NOTIFIKASI & KEAMANAN</Text>
                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <SettingsItem
                        icon="notifications-outline"
                        title={t('notifications')}
                        type="switch"
                        value={notifEnabled}
                        onPress={() => setNotifEnabled(!notifEnabled)}
                        colors={colors}
                        theme={theme}
                    />
                    <SettingsItem
                        icon="finger-print-outline"
                        title={t('biometric')}
                        type="switch"
                        value={biometricEnabled}
                        onPress={() => setBiometricEnabled(!biometricEnabled)}
                        colors={colors}
                        theme={theme}
                    />
                </View>

                <Text style={styles.sectionTitle}>UMUM</Text>
                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <SettingsItem
                        icon="globe-outline"
                        title={t('language')}
                        value={language === 'id' ? 'Bahasa Indonesia' : 'English'}
                        onPress={() => setLangModalVisible(true)}
                        colors={colors}
                        theme={theme}
                    />
                    <SettingsItem
                        icon={theme === 'light' ? "moon-outline" : "sunny-outline"}
                        title={t('dark_mode')}
                        type="switch"
                        value={theme === 'dark'}
                        onPress={toggleTheme}
                        colors={colors}
                        theme={theme}
                    />
                </View>

                <Text style={styles.sectionTitle}>BANTUAN & LAINNYA</Text>
                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <SettingsItem
                        icon="document-text-outline"
                        title="Syarat & Ketentuan"
                        onPress={() => router.push('/syarat_ketentuan' as any)}
                        colors={colors}
                        theme={theme}
                    />
                    <SettingsItem
                        icon="shield-checkmark-outline"
                        title="Kebijakan Privasi"
                        onPress={() => router.push('/kebijakan_privasi' as any)}
                        colors={colors}
                        theme={theme}
                    />
                    <SettingsItem
                        icon="information-circle-outline"
                        title={t('about')}
                        onPress={() => Alert.alert(t('about'), "Field Coffee v4.12.1\nCrafted with passion.")}
                        colors={colors}
                        theme={theme}
                    />
                    <SettingsItem
                        icon="star-outline"
                        title={t('rating')}
                        onPress={() => Alert.alert("Rating", "Coming soon!")}
                        colors={colors}
                        theme={theme}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.logoutBtn, { backgroundColor: colors.card, borderColor: '#FFE5E5' }]}
                    onPress={() => router.replace('/')}
                >
                    <Text style={styles.logoutTxt}>{t('logout')}</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Language Selection Modal */}
            <Modal
                transparent
                visible={langModalVisible}
                animationType="fade"
                onRequestClose={() => setLangModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                        <Text style={[styles.modalTitle, { color: colors.text }]}>{t('choose_language')}</Text>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[styles.langItem, { borderBottomColor: colors.border }]}
                                onPress={() => {
                                    setLanguage(lang.code);
                                    setLangModalVisible(false);
                                }}
                            >
                                <Text style={[styles.langText, { color: colors.text, fontWeight: language === lang.code ? 'bold' : 'normal' }]}>
                                    {lang.name}
                                </Text>
                                {language === lang.code && (
                                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                                )}
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setLangModalVisible(false)}>
                            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{t('cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    headerBtn: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    scrollContent: { paddingBottom: 40 },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#999', marginHorizontal: 20, marginTop: 25, marginBottom: 10, letterSpacing: 1 },
    section: { paddingHorizontal: 20, borderTopWidth: 1, borderBottomWidth: 1 },
    item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1 },
    iconBox: { width: 35, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    itemTitle: { flex: 1, fontSize: 15 },
    rightSide: { flexDirection: 'row', alignItems: 'center' },
    itemValue: { fontSize: 13, marginRight: 8 },
    logoutBtn: { marginTop: 40, marginHorizontal: 20, padding: 18, borderRadius: 15, borderWidth: 1, alignItems: 'center' },
    logoutTxt: { color: '#FF4747', fontWeight: 'bold', fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '85%', borderRadius: 20, padding: 25 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    langItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1 },
    langText: { fontSize: 16 },
    closeBtn: { marginTop: 20, alignItems: 'center' }
});
