import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { TermsModal } from '../components/TermsModal';
import { db } from '../config/firebase';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const { setIsLoggedIn } = useApp();
    const { mode: initialMode } = useLocalSearchParams<{ mode: 'login' | 'register' }>();
    const [mode, setMode] = useState<'login' | 'register'>(initialMode || 'login');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTermsVisible, setIsTermsVisible] = useState(false);

    const isLogin = mode === 'login';

    const handleLogin = async () => {
        if (!email || !phoneNumber) {
            Alert.alert("Error", "Silakan masukkan email dan nomor telepon.");
            return;
        }

        setLoading(true);
        try {
            // Simpan data ke Firebase Firestore secara background agar tidak menunggu (cepat)
            const userRef = doc(db, 'users', email.toLowerCase());
            setDoc(userRef, {
                email: email.toLowerCase(),
                no_telepon: '+62' + phoneNumber,
                lastLogin: new Date().toISOString(),
                createdAt: new Date().toISOString()
            }, { merge: true }).catch(err => {
                console.error("Background Firebase Error:", err);
            });

            // Set state login global
            setIsLoggedIn(true);

            // Langsung masuk ke beranda tanpa menunggu proses database selesai
            router.replace('/(tabs)');
        } catch (error: any) {
            console.error("Error:", error);
            Alert.alert("Error", "Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#42280E" />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.welcomeText}>{isLogin ? 'Masuk ke Akun' : 'Daftar Akun Baru'}</Text>
                        <Text style={styles.subText}>
                            {isLogin
                                ? 'Masukkan email dan nomor Anda untuk melanjutkan pesanan.'
                                : 'Lengkapi data Anda untuk mulai menikmati kopi terbaik dari Field Coffee.'}
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Email Input */}
                        <Text style={styles.inputLabel}>Email</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail-outline" size={20} color="#6F5F58" style={{ marginRight: 12 }} />
                            <TextInput
                                style={styles.input}
                                placeholder="nama@email.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor="#AAA"
                            />
                        </View>

                        {/* Phone Number Input */}
                        <Text style={styles.inputLabel}>Nomor Telepon</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.countryCode}>+62</Text>
                            <View style={styles.divider} />
                            <TextInput
                                style={styles.input}
                                placeholder="812xxxxxxx"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholderTextColor="#AAA"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.primaryBtn, (!phoneNumber || !email || loading) && styles.disabledBtn]}
                            onPress={handleLogin}
                            disabled={!phoneNumber || !email || loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.btnTextWhite}>{isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                        </Text>
                        <TouchableOpacity onPress={() => setMode(isLogin ? 'register' : 'login')}>
                            <Text style={styles.registerText}>{isLogin ? 'Daftar' : 'Masuk'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.termsFooter}>
                        <Text style={styles.footerText}>Dengan melanjutkan, Anda menyetujui </Text>
                        <TouchableOpacity onPress={() => setIsTermsVisible(true)}>
                            <Text style={styles.registerText}>Syarat & Ketentuan</Text>
                        </TouchableOpacity>
                        <Text style={styles.footerText}> kami.</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <TermsModal
                isVisible={isTermsVisible}
                onClose={() => setIsTermsVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    header: {
        marginBottom: 40,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D1606',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        color: '#6F5F58',
        lineHeight: 24,
    },
    formContainer: {
        width: '100%',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D1606',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 60,
        marginBottom: 25,
    },
    countryCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D1606',
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#E5E5E5',
        marginHorizontal: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#2D1606',
        fontWeight: '500',
    },
    primaryBtn: {
        backgroundColor: '#42280E',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#42280E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    disabledBtn: {
        backgroundColor: '#A08E81',
    },
    btnTextWhite: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5E5',
    },
    separatorText: {
        marginHorizontal: 15,
        color: '#AAA',
        fontSize: 14,
    },
    secondaryBtn: {
        borderWidth: 1.5,
        borderColor: '#42280E',
        width: '100%',
        paddingVertical: 16,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextBrown: {
        color: '#42280E',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    termsFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingTop: 40,
    },
    footerText: {
        color: '#6F5F58',
        fontSize: 14,
    },
    registerText: {
        color: '#42280E',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
