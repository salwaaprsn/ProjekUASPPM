import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useApp } from '../context/AppContext';

const { width, height } = Dimensions.get('window');
const db = SQLite.openDatabaseSync('antigravity.db');

interface Address {
    id: number;
    label: string;
    details: string;
    recipient_name: string;
    phone_number: string;
}

export default function AlamatScreen() {
    const router = useRouter();
    const { t, colors, theme } = useApp();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Modal state for form
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [label, setLabel] = useState('');
    const [recipient, setRecipient] = useState('');
    const [phone, setPhone] = useState('');
    const [details, setDetails] = useState('');

    const fetchAddresses = () => {
        setLoading(true);
        try {
            const result = db.getAllSync<Address>('SELECT * FROM addresses ORDER BY id DESC');
            setAddresses(result);
        } catch (error) {
            console.error("Fetch failure:", error);
            Alert.alert("Error", "Gagal memuat alamat.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        try {
            db.execSync(`
                CREATE TABLE IF NOT EXISTS addresses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    label TEXT NOT NULL,
                    details TEXT NOT NULL,
                    recipient_name TEXT NOT NULL,
                    phone_number TEXT NOT NULL
                );
            `);
            fetchAddresses();
        } catch (error) {
            console.error("Initialization failure:", error);
        }
    }, []);

    const handleSave = () => {
        if (!label.trim() || !recipient.trim() || !phone.trim() || !details.trim()) {
            Alert.alert("Data Belum Lengkap", "Silakan isi semua kolom yang tersedia.");
            return;
        }

        try {
            if (currentId) {
                db.runSync(
                    'UPDATE addresses SET label = ?, details = ?, recipient_name = ?, phone_number = ? WHERE id = ?',
                    [label.trim(), details.trim(), recipient.trim(), phone.trim(), currentId]
                );
                Alert.alert(t('save'), "Alamat berhasil diperbarui!");
            } else {
                db.runSync(
                    'INSERT INTO addresses (label, details, recipient_name, phone_number) VALUES (?, ?, ?, ?)',
                    [label.trim(), details.trim(), recipient.trim(), phone.trim()]
                );
                Alert.alert(t('save'), "Alamat baru berhasil ditambahkan!");
            }
            closeModal();
            fetchAddresses();
        } catch (error) {
            console.error("Save failure:", error);
            Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan alamat.");
        }
    };

    const handleDelete = (id: number) => {
        Alert.alert(
            t('delete'),
            "Apakah Anda yakin ingin menghapus alamat ini?",
            [
                { text: t('cancel'), style: "cancel" },
                {
                    text: t('delete'),
                    style: "destructive",
                    onPress: () => {
                        try {
                            db.runSync('DELETE FROM addresses WHERE id = ?', [id]);
                            fetchAddresses();
                        } catch (error) {
                            Alert.alert("Gagal", "Terjadi kesalahan.");
                        }
                    }
                }
            ]
        );
    };

    const openModal = (address?: Address) => {
        if (address) {
            setCurrentId(address.id);
            setLabel(address.label);
            setRecipient(address.recipient_name);
            setPhone(address.phone_number);
            setDetails(address.details);
        } else {
            setCurrentId(null);
            setLabel('');
            setRecipient('');
            setPhone('');
            setDetails('');
        }
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const getLabelIcon = (label: string) => {
        const lowerLabel = label.toLowerCase();
        if (lowerLabel.includes('rumah')) return 'home';
        if (lowerLabel.includes('kantor') || lowerLabel.includes('kerja')) return 'briefcase';
        if (lowerLabel.includes('kos')) return 'bed';
        return 'map';
    };

    const renderItem = ({ item }: { item: Address }) => (
        <TouchableOpacity
            style={[styles.addressCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => openModal(item)}
        >
            <View style={styles.cardHeader}>
                <View style={[styles.labelBadge, { backgroundColor: colors.primary }]}>
                    <Ionicons
                        name={getLabelIcon(item.label) as any}
                        size={12}
                        color="#FFF"
                    />
                    <Text style={styles.labelTxt}>{item.label}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
            </View>

            <Text style={[styles.recipientTxt, { color: colors.text }]}>{item.recipient_name}</Text>
            <Text style={[styles.phoneTxt, { color: colors.textSecondary }]}>{item.phone_number}</Text>
            <Text style={[styles.detailsTxt, { color: colors.textSecondary }]} numberOfLines={2}>{item.details}</Text>

            <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
                <Text style={[styles.editBtnTxt, { color: colors.accent }]}>Klik untuk Ubah</Text>
                <Ionicons name="pencil" size={14} color={colors.accent} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.header }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
                    <Ionicons name="chevron-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.primary }]}>{t('saved_addresses')}</Text>
                <TouchableOpacity onPress={() => openModal()} style={styles.headerBtn}>
                    <Ionicons name="add" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : addresses.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="map-outline" size={120} color={colors.border} />
                    <Text style={[styles.emptyTitle, { color: colors.primary }]}>Belum Ada Alamat</Text>
                    <Text style={styles.emptySub}>Tambahkan alamat pengiriman favoritmu untuk mempercepat proses pesanan.</Text>
                    <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: colors.primary }]} onPress={() => openModal()}>
                        <Text style={styles.btnTxt}>Tambah Alamat Baru</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={addresses}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={[styles.modalContent, { backgroundColor: colors.card }]}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.primary }]}>{currentId ? 'Ubah Alamat' : 'Tambah Alamat Baru'}</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.form}>
                                <Text style={[styles.inputLabel, { color: colors.primary }]}>Label Alamat (Rumah, Kantor, dll)</Text>
                                <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="Contoh: Rumah"
                                        value={label}
                                        onChangeText={setLabel}
                                        placeholderTextColor="#AAA"
                                    />
                                </View>

                                <Text style={[styles.inputLabel, { color: colors.primary }]}>Nama Penerima</Text>
                                <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="Nama Lengkap"
                                        value={recipient}
                                        onChangeText={setRecipient}
                                        placeholderTextColor="#AAA"
                                    />
                                </View>

                                <Text style={[styles.inputLabel, { color: colors.primary }]}>Nomor Telepon</Text>
                                <View style={[styles.inputWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="0812xxxxxx"
                                        keyboardType="phone-pad"
                                        value={phone}
                                        onChangeText={setPhone}
                                        placeholderTextColor="#AAA"
                                    />
                                </View>

                                <Text style={[styles.inputLabel, { color: colors.primary }]}>Detail Alamat</Text>
                                <View style={[styles.inputWrapper, styles.textAreaWrapper, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                    <TextInput
                                        style={[styles.input, styles.textArea, { color: colors.text }]}
                                        placeholder="Nama jalan, nomor rumah, gedung, lantai..."
                                        multiline
                                        numberOfLines={4}
                                        value={details}
                                        onChangeText={setDetails}
                                        placeholderTextColor="#AAA"
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={[styles.btnPrimaryFull, { backgroundColor: colors.primary }]} onPress={handleSave}>
                                <Text style={styles.btnTxt}>Simpan Alamat</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
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
    listContent: { padding: 20, paddingBottom: 40 },
    addressCard: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
        borderWidth: 1,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    labelBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12
    },
    labelTxt: { color: '#FFF', fontSize: 11, fontWeight: 'bold', marginLeft: 5 },
    recipientTxt: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    phoneTxt: { fontSize: 13, marginBottom: 10 },
    detailsTxt: { fontSize: 13, lineHeight: 20, marginBottom: 15 },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        paddingTop: 10
    },
    editBtnTxt: { fontSize: 12, fontWeight: 'bold', marginRight: 5 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    emptyTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
    emptySub: { textAlign: 'center', color: '#999', marginTop: 10, marginBottom: 30, lineHeight: 20 },
    btnPrimary: { paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30 },
    btnTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        height: height * 0.85
    },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    modalTitle: { fontSize: 20, fontWeight: 'bold' },
    form: { marginTop: 5 },
    inputLabel: { fontSize: 13, fontWeight: 'bold', marginBottom: 8, marginTop: 15 },
    inputWrapper: {
        borderWidth: 1.5,
        borderRadius: 15,
        paddingHorizontal: 15,
    },
    input: { paddingVertical: 12, fontSize: 15 },
    textAreaWrapper: { height: 100 },
    textArea: { height: '100%' },
    modalFooter: { paddingTop: 20, borderTopWidth: 1, borderTopColor: '#EEE' },
    btnPrimaryFull: { paddingVertical: 16, borderRadius: 30, alignItems: 'center' }
});