import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MENU_API, MenuItem } from '../constants/data';
import { useApp } from '../context/AppContext';
import { useOrder } from '../context/OrderContext';

const CATEGORIES = ['All', 'Coffee', 'Non-Coffee', 'Dessert'];

export default function MenuScreen() {
    const router = useRouter();
    const { cart, addToCart } = useOrder();
    const { t, colors, theme, isLoggedIn } = useApp();
    const [activeCategory, setActiveCategory] = useState('Coffee');

    const handleAddToCart = (item: any) => {
        if (!isLoggedIn) {
            Alert.alert(
                "Login Dulu Yuk!",
                "Kamu harus login untuk bisa pesan kopi Field Coffee.",
                [
                    { text: "Nanti Saja", style: "cancel" },
                    { text: "Login Sekarang", onPress: () => router.push('/login') }
                ]
            );
            return;
        }
        addToCart(item);
        Alert.alert("Ditambahkan!", `${item.name} sudah masuk keranjang.`);
    };

    const dataAman = MENU_API || [];

    const filteredData = activeCategory === 'All'
        ? dataAman
        : dataAman.filter((item: MenuItem) => item.category === activeCategory);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.header }]}>
                <View>
                    <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Halo, Salwa! Mau pesan apa hari ini?</Text>
                    <Text style={[styles.headerTitle, { color: colors.primary }]}>{t('menu')}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.cartBtn, { backgroundColor: colors.card }]}
                    onPress={() => router.push('/cart' as any)}
                >
                    <Ionicons name="cart-outline" size={24} color={colors.primary} />
                    {cart.length > 0 && (
                        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                            <Text style={styles.badgeText}>{cart.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Category Tabs */}
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.catScroll}
                >
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setActiveCategory(cat)}
                            style={[
                                styles.catBtn,
                                { backgroundColor: colors.card, borderColor: colors.border },
                                activeCategory === cat && { backgroundColor: colors.primary, borderColor: colors.primary }
                            ]}
                        >
                            <Text style={[
                                styles.catText,
                                { color: colors.textSecondary },
                                activeCategory === cat && { color: '#FFF' }
                            ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* List Menu */}
            <FlatList
                data={filteredData}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: colors.textSecondary }}>Menu tidak ditemukan...</Text>
                    </View>
                )}
                renderItem={({ item, index }) => (
                    <Animated.View
                        entering={FadeInUp.delay(index * 100).springify().damping(20).mass(0.5)}
                        style={{ width: '48.2%', marginBottom: 20 }}
                    >
                        <TouchableOpacity
                            style={[styles.card, { backgroundColor: colors.card, width: '100%', marginBottom: 0 }]} // Width 100% of parent wrapper
                            activeOpacity={0.9}
                            onPress={() => router.push({
                                pathname: '/detail',
                                params: { ...item }
                            })}
                        >
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: item.image }} style={styles.cardImg} />
                                <View style={[styles.priceTag, { backgroundColor: colors.primary }]}>
                                    <Text style={styles.priceTagText}>Rp {item.price}</Text>
                                </View>
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                                <Text style={[styles.cardDesc, { color: colors.textSecondary }]} numberOfLines={1}>{item.desc}</Text>
                                <TouchableOpacity
                                    style={[styles.addBtn, { backgroundColor: colors.primary }]}
                                    onPress={() => handleAddToCart(item)}
                                >
                                    <Ionicons name="cart-outline" size={16} color="white" />
                                    <Text style={styles.addBtnText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 60 : 40,
        paddingBottom: 5,
        alignItems: 'center',
    },
    welcomeText: { fontSize: 13, marginBottom: 2 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', letterSpacing: -0.5 },
    cartBtn: {
        padding: 10,
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    catScroll: { paddingHorizontal: 20, paddingBottom: 15, paddingTop: 5 },
    catBtn: {
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 14,
        marginRight: 10,
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5
    },
    catText: { fontWeight: 'bold', fontSize: 13 },
    list: { paddingHorizontal: 15, paddingBottom: 30 },
    card: {
        width: '48.2%',
        borderRadius: 24,
        marginBottom: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        overflow: 'hidden'
    },
    imageWrapper: { width: '100%', height: 140, position: 'relative' },
    cardImg: { width: '100%', height: '100%', backgroundColor: '#F0F0F0' },
    priceTag: {
        position: 'absolute',
        top: 10,
        left: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    priceTagText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
    cardInfo: { padding: 12 },
    cardName: { fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
    cardDesc: { fontSize: 10, marginBottom: 12 },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    addBtnText: { color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 6 },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF'
    },
    badgeText: {
        color: '#FFF',
        fontSize: 8,
        fontWeight: 'bold'
    }
});
