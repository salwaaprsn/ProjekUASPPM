import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface TermsModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isVisible, onClose }) => {
    const [page, setPage] = useState(1);

    const handleNext = () => {
        if (page < 2) {
            setPage(page + 1);
        } else {
            onClose();
            setPage(1); // Reset for next open
        }
    };

    const handleBack = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const renderContent = () => {
        if (page === 1) {
            return (
                <View>
                    <Text style={styles.sectionTitle}>1. Penggunaan Layanan</Text>
                    <Text style={styles.textContent}>
                        Dengan menggunakan aplikasi Field Coffee, Anda setuju untuk mematuhi semua syarat dan ketentuan yang berlaku. Layanan kami disediakan untuk penggunaan pribadi dan non-komersial.
                    </Text>
                    <Text style={styles.sectionTitle}>2. Akun Pengguna</Text>
                    <Text style={styles.textContent}>
                        Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda, termasuk email dan nomor telepon. Setiap aktivitas yang terjadi di bawah akun Anda adalah tanggung jawab Anda sepenuhnya.
                    </Text>
                    <Text style={styles.sectionTitle}>3. Pemesanan dan Pembayaran</Text>
                    <Text style={styles.textContent}>
                        Semua pemesanan yang dilakukan melalui aplikasi bersifat final. Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Pembayaran harus dilakukan melalui metode yang tersedia di aplikasi.
                    </Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.sectionTitle}>4. Kebijakan Privasi</Text>
                    <Text style={styles.textContent}>
                        Kami menghargai privasi Anda. Data yang kami kumpulkan (email dan nomor telepon) digunakan untuk memproses pesanan dan meningkatkan pengalaman Anda di Field Coffee. Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa izin Anda.
                    </Text>
                    <Text style={styles.sectionTitle}>5. Perubahan Syarat</Text>
                    <Text style={styles.textContent}>
                        Field Coffee berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan berlaku segera setelah dipublikasikan di aplikasi.
                    </Text>
                    <Text style={styles.sectionTitle}>6. Batasan Tanggung Jawab</Text>
                    <Text style={styles.textContent}>
                        Field Coffee tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami.
                    </Text>
                </View>
            );
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <SafeAreaView style={styles.modalContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleBack} style={[styles.backButton, page === 1 && { opacity: 0 }]} disabled={page === 1}>
                            <Ionicons name="chevron-back" size={24} color="#4B2C0E" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Syarat & Ketentuan</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#4B2C0E" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                        <View style={styles.pageIndicator}>
                            <View style={[styles.dot, page === 1 && styles.activeDot]} />
                            <View style={[styles.dot, page === 2 && styles.activeDot]} />
                        </View>
                        <Text style={styles.pageTitle}>Halaman {page} dari 2</Text>
                        {renderContent()}
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
                            <Text style={styles.buttonText}>{page === 1 ? "Lanjut" : "Saya Setuju"}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        height: height * 0.8,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4B2C0E',
    },
    backButton: {
        padding: 5,
    },
    scrollArea: {
        flex: 1,
        marginTop: 20,
    },
    pageIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#DDD',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#4B2C0E',
        width: 20,
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 12,
        color: '#8B5A2B',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D1606',
        marginTop: 15,
        marginBottom: 10,
    },
    textContent: {
        fontSize: 14,
        color: '#6F5F58',
        lineHeight: 22,
        textAlign: 'justify',
    },
    footer: {
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 0 : 10,
    },
    primaryButton: {
        backgroundColor: '#4B2C0E',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
