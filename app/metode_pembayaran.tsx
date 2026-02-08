import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Modal,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useApp } from '../context/AppContext';

const db = SQLite.openDatabaseSync('antigravity.db');

interface PaymentMethod {
    id: number;
    provider: string;
    account_number: string;
    is_linked: number;
}

export default function MetodePembayaranScreen() {
    const router = useRouter();
    const { t, colors, theme } = useApp();
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [provider, setProvider] = useState('GoPay');
    const [accountNumber, setAccountNumber] = useState('');

    const fetchMethods = () => {
        try {
            const result = db.getAllSync<PaymentMethod>('SELECT * FROM payment_methods');
            setMethods(result);
        } catch (error) {
            console.error("Fetch failure:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        try {
            db.execSync(`
                CREATE TABLE IF NOT EXISTS payment_methods (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    provider TEXT,
                    account_number TEXT,
                    is_linked INTEGER DEFAULT 1
                );
            `);
            fetchMethods();
        } catch (error) {
            console.error("Initialization failure:", error);
        }
    }, []);

    const handleAdd = () => {
        if (!accountNumber) {
            Alert.alert("Error", "Silakan masukkan nomor akun.");
            return;
        }

        try {
            db.runSync(
                'INSERT INTO payment_methods (provider, account_number, is_linked) VALUES (?, ?, 1)',
                [provider, accountNumber]
            );
            Alert.alert(t('save'), `${provider} berhasil dihubungkan!`);
            setIsModalVisible(false);
            setAccountNumber('');
            fetchMethods();
        } catch (error) {
            console.error("Link failure:", error);
        }
    };

    const handleDelete = (id: number, name: string) => {
        Alert.alert(
            t('delete'),
            `Apakah Anda yakin ingin memutuskan hubungan dengan ${name}?`,
            [
                { text: t('cancel'), style: "cancel" },
                {
                    text: t('delete'),
                    style: "destructive",
                    onPress: () => {
                        try {
                            db.runSync('DELETE FROM payment_methods WHERE id = ?', [id]);
                            fetchMethods();
                        } catch (error) {
                            console.error("Delete failure:", error);
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: PaymentMethod }) => {
        const getMeta = () => {
            switch (item.provider) {
                case 'GoPay': return { color: '#00AA13', icon: 'wallet' };
                case 'OVO': return { color: '#4C2A86', icon: 'card' };
                case 'DANA': return { color: '#0086CA', icon: 'phone-portrait' };
                default: return { color: colors.primary, icon: 'cash' };
            }
        };
        const meta = getMeta();

        return (
            <View style={[styles.methodCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.iconBox, { backgroundColor: meta.color + '15' }]}>
                    <Ionicons name={meta.icon as any} size={24} color={meta.color} />
                </View>
                <View style={styles.cardInfo}>
                    <Text style={[styles.providerTxt, { color: colors.text }]}>{item.provider}</Text>
                    <Text style={[styles.accTxt, { color: colors.textSecondary }]}>{item.account_number}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id, item.provider)} style={styles.deleteBtn}>
                    <Text style={styles.deleteBtnTxt}>Putus</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.header }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
                    <Ionicons name="chevron-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.primary }]}>{t('payment_methods')}</Text>
                <View style={{ width: 40 }} />
            </View>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={styles.sectionTitle}>E-WALLET TERHUBUNG</Text>
                    <FlatList
                        data={methods}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyBox}>
                                <Ionicons name="card-outline" size={60} color={colors.border} />
                                <Text style={[styles.emptyTxt, { color: colors.textSecondary }]}>Belum ada metode pembayaran terhubung.</Text>
                            </View>
                        }
                    />
                    <TouchableOpacity style={[styles.btnAdd, { backgroundColor: colors.primary }]} onPress={() => setIsModalVisible(true)}>
                        <Ionicons name="add-circle" size={24} color="#FFF" />
                        <Text style={styles.btnAddTxt}>Hubungkan Metode Baru</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.primary }]}>Hubungkan E-Wallet</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.label, { color: colors.primary }]}>Pilih Provider</Text>
                        <View style={styles.providerRow}>
                            {['GoPay', 'OVO', 'DANA'].map((p) => (
                                <TouchableOpacity
                                    key={p}
                                    style={[
                                        styles.providerBtn,
                                        { borderColor: colors.border },
                                        provider === p && { backgroundColor: colors.primary, borderColor: colors.primary }
                                    ]}
                                    onPress={() => setProvider(p)}
                                >
                                    <Text style={[styles.providerBtnTxt, { color: colors.textSecondary }, provider === p && { color: '#FFF' }]}>{p}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={[styles.label, { color: colors.primary }]}>Nomor HP Terdaftar</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                            placeholder="0812xxxxxx"
                            keyboardType="phone-pad"
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                            placeholderTextColor="#AAA"
                        />

                        <TouchableOpacity style={[styles.btnSave, { backgroundColor: colors.primary }]} onPress={handleAdd}>
                            <Text style={styles.btnSaveTxt}>Hubungkan Sekarang</Text>
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
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#999', marginHorizontal: 20, marginTop: 25, marginBottom: 10, letterSpacing: 1 },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
    },
    iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
    cardInfo: { flex: 1, marginLeft: 15 },
    providerTxt: { fontWeight: 'bold', fontSize: 16 },
    accTxt: { fontSize: 13, marginTop: 2 },
    deleteBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#FFF0F0' },
    deleteBtnTxt: { color: '#FF6B6B', fontSize: 12, fontWeight: 'bold' },
    emptyBox: { alignItems: 'center', marginTop: 100 },
    emptyTxt: { marginTop: 15, textAlign: 'center', fontSize: 13 },
    btnAdd: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        padding: 18,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    btnAddTxt: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    modalTitle: { fontSize: 18, fontWeight: 'bold' },
    label: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, marginTop: 10 },
    providerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    providerBtn: { flex: 1, paddingVertical: 12, borderRadius: 15, borderWidth: 1, alignItems: 'center', marginHorizontal: 5 },
    providerBtnTxt: { fontWeight: 'bold' },
    input: { borderWidth: 1.5, borderRadius: 15, padding: 15, fontSize: 16 },
    btnSave: { padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 30 },
    btnSaveTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
