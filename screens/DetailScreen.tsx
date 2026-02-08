import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useOrder } from '../context/OrderContext';

const { width } = Dimensions.get('window');

export default function DetailScreen() {
    const item = useLocalSearchParams();
    const router = useRouter();
    const { colors, theme, isLoggedIn } = useApp();
    const { addToCart } = useOrder();

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('Medium');
    const [sweetness, setSweetness] = useState('Normal');
    const [ice, setIce] = useState('Regular');
    const [isFavorite, setIsFavorite] = useState(false);

    const addQty = () => setQuantity(prev => prev + 1);
    const subQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
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
        addToCart({
            ...item,
            quantity: quantity,
            customization: { size, sweetness, ice }
        });

        Alert.alert(
            "Ditambahkan!",
            `${item.name} sudah masuk keranjang.`,
            [
                { text: "Lanjut Belanja", style: "cancel" },
                { text: "Ke Keranjang", onPress: () => router.push('/cart' as any) }
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="light-content" translucent />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Immersive Image Header */}
                <View style={styles.imageHeader}>
                    <Image source={{ uri: item.image as string }} style={styles.heroImage} />
                    <View style={styles.imageOverlay} />

                    <View style={styles.topActions}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.favButton} onPress={() => setIsFavorite(!isFavorite)}>
                            <Ionicons
                                name={isFavorite ? "heart" : "heart-outline"}
                                size={24}
                                color={isFavorite ? "#E74C3C" : "white"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Main Content Area */}
                <View style={[styles.contentArea, { backgroundColor: colors.background }]}>
                    <View style={styles.dragHandle} />

                    <View style={styles.titleSection}>
                        <View style={styles.titleRow}>
                            <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                            <View style={[styles.categoryLabel, { backgroundColor: colors.primary + '15' }]}>
                                <Text style={[styles.categoryLabelText, { color: colors.primary }]}>{item.category}</Text>
                            </View>
                        </View>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={16} color="#F1C40F" />
                            <Text style={styles.ratingValue}>4.9</Text>
                            <Text style={styles.reviewCount}>(250+ Reviews)</Text>
                        </View>
                    </View>

                    <Text style={[styles.itemPrice, { color: colors.primary }]}>Rp {item.price}</Text>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <Text style={[styles.sectionHeader, { color: colors.text }]}>Deskripsi</Text>
                    <Text style={[styles.description, { color: colors.textSecondary }]}>{item.desc}</Text>

                    {/* Premium Customization Options */}
                    <Text style={[styles.sectionHeader, { color: colors.text, marginTop: 30 }]}>Order Customization</Text>

                    <OptionGroup
                        label="Size"
                        options={['Small', 'Medium', 'Large']}
                        selected={size}
                        onSelect={setSize}
                        colors={colors}
                    />

                    <OptionGroup
                        label="Sweetness"
                        options={['Less', 'Normal', 'Extra']}
                        selected={sweetness}
                        onSelect={setSweetness}
                        colors={colors}
                    />

                    <OptionGroup
                        label="Ice"
                        options={['Less', 'Regular', 'Full']}
                        selected={ice}
                        onSelect={setIce}
                        colors={colors}
                    />

                    {/* Quantity Adjustment */}
                    <View style={styles.qtyContainer}>
                        <Text style={[styles.sectionHeader, { color: colors.text, marginBottom: 0 }]}>Jumlah Pesanan</Text>
                        <View style={styles.selectorRow}>
                            <TouchableOpacity style={[styles.selectorBtn, { borderColor: colors.border }]} onPress={subQty}>
                                <Ionicons name="remove" size={20} color={colors.primary} />
                            </TouchableOpacity>
                            <Text style={[styles.selectorValue, { color: colors.text }]}>{quantity}</Text>
                            <TouchableOpacity style={[styles.selectorBtn, { backgroundColor: colors.primary }]} onPress={addQty}>
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Premium Action Bar */}
            <View style={[styles.actionFooter, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <View style={styles.footerPrice}>
                    <Text style={[styles.footerPriceLabel, { color: colors.textSecondary }]}>Total Price</Text>
                    <Text style={[styles.footerPriceValue, { color: colors.primary }]}>
                        Rp {(Number(item.price?.toString().replace(/\./g, '')) * quantity).toLocaleString('id-ID')}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles.checkoutBtn, { backgroundColor: colors.primary }]}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.checkoutBtnText}>Add to Cart</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const OptionGroup = ({ label, options, selected, onSelect, colors }: any) => (
    <View style={styles.optionGroup}>
        <Text style={[styles.optionLabel, { color: colors.textSecondary }]}>{label}</Text>
        <View style={styles.optionRow}>
            {options.map((opt: string) => (
                <TouchableOpacity
                    key={opt}
                    onPress={() => onSelect(opt)}
                    style={[
                        styles.optionItem,
                        { borderColor: colors.border },
                        selected === opt && { backgroundColor: colors.primary, borderColor: colors.primary }
                    ]}
                >
                    <Text style={[
                        styles.optionText,
                        { color: colors.textSecondary },
                        selected === opt && { color: 'white' }
                    ]}>{opt}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { paddingBottom: 120 },
    imageHeader: { width: width, height: 450, position: 'relative' },
    heroImage: { width: '100%', height: '100%' },
    imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)' },
    topActions: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 50 : 60,
        left: 0, right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    backButton: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
    favButton: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
    contentArea: {
        marginTop: -30,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 25,
        flex: 1
    },
    dragHandle: { width: 40, height: 5, backgroundColor: '#E0E0E0', borderRadius: 5, alignSelf: 'center', marginBottom: 20 },
    titleSection: { marginBottom: 15 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    itemName: { fontSize: 28, fontWeight: 'bold', flex: 1, marginRight: 10 },
    categoryLabel: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
    categoryLabelText: { fontSize: 11, fontWeight: 'bold' },
    ratingRow: { flexDirection: 'row', alignItems: 'center' },
    ratingValue: { marginLeft: 5, fontWeight: 'bold', fontSize: 14, color: '#2D1606' },
    reviewCount: { marginLeft: 5, color: '#6F5F58', fontSize: 12 },
    itemPrice: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    divider: { height: 1, marginVertical: 10 },
    sectionHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
    description: { fontSize: 14, lineHeight: 22 },
    optionGroup: { marginTop: 20 },
    optionLabel: { fontSize: 13, marginBottom: 10, fontWeight: '600' },
    optionRow: { flexDirection: 'row' },
    optionItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 10
    },
    optionText: { fontSize: 13, fontWeight: '500' },
    qtyContainer: { marginTop: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    selectorRow: { flexDirection: 'row', alignItems: 'center' },
    selectorBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    selectorValue: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20 },
    actionFooter: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
    },
    footerPrice: { flex: 1 },
    footerPriceLabel: { fontSize: 12, marginBottom: 2 },
    footerPriceValue: { fontSize: 22, fontWeight: 'bold' },
    checkoutBtn: {
        flex: 1.2,
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10
    },
    checkoutBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
