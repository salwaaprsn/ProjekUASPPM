import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useOrder } from '../context/OrderContext';

export default function CartScreen() {
    const router = useRouter();
    const { colors } = useApp();
    const { cart, removeFromCart, updateCartQuantity, checkout } = useOrder();

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        router.push({
            pathname: '/pembayaran',
            params: { total: totalPrice.toLocaleString('id-ID') }
        });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.header }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.primary }]}>Keranjang Saya</Text>
                <View style={{ width: 40 }} />
            </View>

            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <View style={[styles.cartItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                <Image source={{ uri: item.image }} style={styles.itemImg} />
                                <View style={styles.itemInfo}>
                                    <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                                    <Text style={[styles.itemPrice, { color: colors.primary }]}>Rp {item.price.toLocaleString('id-ID')}</Text>

                                    <View style={styles.quantityRow}>
                                        <TouchableOpacity
                                            style={[styles.qtyBtn, { borderColor: colors.border }]}
                                            onPress={() => updateCartQuantity(item.id, -1)}
                                        >
                                            <Ionicons name="remove" size={16} color={colors.primary} />
                                        </TouchableOpacity>
                                        <Text style={[styles.qtyText, { color: colors.text }]}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={[styles.qtyBtn, { borderColor: colors.border }]}
                                            onPress={() => updateCartQuantity(item.id, 1)}
                                        >
                                            <Ionicons name="add" size={16} color={colors.primary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.deleteBtn}
                                    onPress={() => removeFromCart(item.id)}
                                >
                                    <Ionicons name="trash-outline" size={20} color="#E74C3C" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    {/* Footer Summary */}
                    <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total Bayar</Text>
                            <Text style={[styles.totalAmount, { color: colors.primary }]}>Rp {totalPrice.toLocaleString('id-ID')}</Text>
                        </View>
                        <TouchableOpacity style={[styles.checkoutBtn, { backgroundColor: colors.primary }]} onPress={handleCheckout}>
                            <Text style={styles.checkoutBtnText}>Bayar Sekarang</Text>
                            <Ionicons name="arrow-forward" size={18} color="#FFF" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color={colors.border} />
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Wah, keranjangmu masih kosong nih.</Text>
                    <TouchableOpacity
                        style={[styles.startShoppingBtn, { backgroundColor: colors.primary }]}
                        onPress={() => router.push('/menu')}
                    >
                        <Text style={styles.checkoutBtnText}>Mulai Belanja</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 20,
    },
    backBtn: { padding: 8, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.05)' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    list: { padding: 20 },
    cartItem: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    itemImg: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#F0F0F0' },
    itemInfo: { flex: 1, marginLeft: 15 },
    itemName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    itemPrice: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
    quantityRow: { flexDirection: 'row', alignItems: 'center' },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qtyText: { marginHorizontal: 15, fontSize: 15, fontWeight: 'bold' },
    deleteBtn: { padding: 10 },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        paddingBottom: Platform.OS === 'ios' ? 35 : 20,
    },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' },
    totalLabel: { fontSize: 14 },
    totalAmount: { fontSize: 20, fontWeight: 'bold' },
    checkoutBtn: {
        height: 55,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    checkoutBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    emptyText: { textAlign: 'center', marginTop: 20, marginBottom: 30, fontSize: 16 },
    startShoppingBtn: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
    }
});
