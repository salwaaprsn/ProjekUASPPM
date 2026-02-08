import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { LanguageModal } from '../components/LanguageModal';
import { LanguageType, ONBOARDING_STRINGS } from '../constants/strings';
import { useApp } from '../context/AppContext';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();
    const { setIsGuest } = useApp();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('Indonesia');
    const scrollX = useRef(new Animated.Value(0)).current;
    const currentStrings = ONBOARDING_STRINGS[selectedLanguage];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <View style={styles.staticBottomCard} />

            <Animated.FlatList
                data={currentStrings.data}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ width: width, height: height }}>
                        <View>
                            <Image source={{ uri: item.image }} style={styles.heroImage} />
                            <View style={styles.imageOverlay} />
                        </View>
                        <View style={styles.movingContent}>
                            <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.descText}>{item.desc}</Text>
                        </View>
                    </View>
                )}
            />

            <View style={styles.fixedFooter}>
                {/* Pagination Dots */}
                <View style={styles.paginationRow}>
                    {currentStrings.data.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [7, 24, 7],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return <Animated.View key={i} style={[styles.dot, { width: dotWidth, opacity }]} />;
                    })}
                </View>

                {/* Language Picker */}
                <TouchableOpacity style={styles.languagePicker} onPress={() => setModalVisible(true)}>
                    <Ionicons name="language" size={18} color="#4B2C0E" />
                    <Text style={styles.languageLabel}>{selectedLanguage}</Text>
                    <Ionicons name="chevron-down" size={14} color="#AAA" />
                </TouchableOpacity>

                {/* Login Buttons */}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={() => {
                            setIsGuest(false);
                            router.push({ pathname: '/login', params: { mode: 'login' } });
                        }}
                    >
                        <Text style={styles.btnTextWhite}>{currentStrings.login}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.secondaryBtn}
                        onPress={() => {
                            setIsGuest(false);
                            router.push({ pathname: '/login', params: { mode: 'register' } });
                        }}
                    >
                        <Ionicons name="logo-google" size={18} color="#42280E" style={{ marginRight: 10 }} />
                        <Text style={styles.btnTextBrown}>{currentStrings.register}</Text>
                    </TouchableOpacity>

                    {/* Skip Button */}
                    <TouchableOpacity
                        style={styles.skipBtn}
                        onPress={() => {
                            setIsGuest(true);
                            router.replace('/(tabs)');
                        }}
                    >
                        <Text style={styles.skipText}>{currentStrings.skip}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <LanguageModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={(lang: LanguageType) => setSelectedLanguage(lang)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    staticBottomCard: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: height * 0.52,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        elevation: 5,
    },
    heroImage: {
        width: width,
        height: height * 0.53,
        resizeMode: 'cover',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    movingContent: {
        width: width,
        paddingHorizontal: 30,
        paddingTop: 55,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2D1606',
        marginBottom: 10,
    },
    descText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#6F5F58',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    paginationRow: {
        flexDirection: 'row',
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },
    dot: {
        height: 6,
        borderRadius: 5,
        backgroundColor: '#4B2C0E',
        marginHorizontal: 3,
    },
    fixedFooter: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    languagePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#EEE',
        marginBottom: 25,
    },
    languageLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 10,
    },
    buttonWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    primaryBtn: {
        backgroundColor: '#42280E',
        width: '100%',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 12,
    },
    secondaryBtn: {
        borderWidth: 1.5,
        borderColor: '#42280E',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextWhite: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnTextBrown: {
        color: '#42280E',
        fontWeight: 'bold',
        fontSize: 15,
    },
    skipBtn: {
        marginTop: 20,
    },
    skipText: {
        color: '#42280E',
        fontSize: 14,
        fontWeight: '700',
    },
});
