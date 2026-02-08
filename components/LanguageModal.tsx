import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

interface LanguageModalProps {
    isVisible: boolean;
    onClose: () => void;
    selectedLanguage: string; // Bahasa yang aktif saat ini di aplikasi
    onSelectLanguage: (lang: any) => void; // Fungsi yang dijalankan saat klik "Simpan"
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
    isVisible,
    onClose,
    selectedLanguage,
    onSelectLanguage
}) => {
    // State internal untuk menyimpan pilihan sementara di dalam modal saja
    const [tempLanguage, setTempLanguage] = useState(selectedLanguage);

    // Setiap kali modal dibuka, pastikan pilihan temp sama dengan bahasa aplikasi
    useEffect(() => {
        if (isVisible) {
            setTempLanguage(selectedLanguage);
        }
    }, [isVisible, selectedLanguage]);

    const handleSave = () => {
        onSelectLanguage(tempLanguage); // Kirim pilihan terakhir ke parent
        onClose(); // Tutup modal
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <Pressable style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHandle} />

                    <Text style={styles.modalTitle}>Atur Bahasa</Text>

                    {/* Opsi Bahasa Indonesia */}
                    <TouchableOpacity
                        style={styles.languageOption}
                        onPress={() => setTempLanguage('Indonesia')}
                    >
                        <View style={styles.langLeft}>
                            <Text style={{ fontSize: 22 }}>🇮🇩</Text>
                            <Text style={styles.langName}>Bahasa Indonesia</Text>
                        </View>
                        {tempLanguage === 'Indonesia' && (
                            <Ionicons name="checkmark-circle" size={26} color="#4B2C0E" />
                        )}
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    {/* Opsi Bahasa Inggris */}
                    <TouchableOpacity
                        style={styles.languageOption}
                        onPress={() => setTempLanguage('English')}
                    >
                        <View style={styles.langLeft}>
                            <Text style={{ fontSize: 22 }}>🇺🇸</Text>
                            <Text style={styles.langName}>Bahasa Inggris</Text>
                        </View>
                        {tempLanguage === 'English' && (
                            <Ionicons name="checkmark-circle" size={26} color="#4B2C0E" />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveBtnText}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: 25,
        paddingBottom: Platform.OS === 'ios' ? 45 : 30,
        paddingTop: 15,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    modalHandle: {
        width: 45,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginBottom: 25
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4B2C0E',
        marginBottom: 20
    },
    languageOption: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18
    },
    langLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    langName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 15
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#F0F0F0'
    },
    saveBtn: {
        backgroundColor: '#4B2C0E',
        width: '100%',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 25
    },
    saveBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});