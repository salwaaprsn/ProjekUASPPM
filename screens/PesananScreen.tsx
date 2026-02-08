import { useOrder } from '@/context/OrderContext'; // Pakai alias @/
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function PesananScreen() {
    const { orders } = useOrder();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Riwayat Pesanan</Text>
            </View>

            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={({ item }) => (
                        <View style={styles.orderCard}>
                            <Image source={{ uri: item.image }} style={styles.orderImg} />
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={styles.orderName}>{item.name}</Text>
                                <Text style={{ fontSize: 11, color: 'gray' }}>{item.date}</Text>
                                <Text style={styles.orderPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
                            </View>
                            <View style={styles.statusBadge}><Text style={styles.statusText}>Selesai</Text></View>
                        </View>
                    )}
                />
            ) : (
                <View style={styles.empty}>
                    <Text style={{ color: '#999' }}>Belum ada pesanan nih.</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F8F8' },
    header: { padding: 20, backgroundColor: '#FFF', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#4B2C0E' },
    orderCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 15, alignItems: 'center', elevation: 2 },
    orderImg: { width: 50, height: 50, borderRadius: 8 },
    orderName: { fontWeight: 'bold', fontSize: 15 },
    orderPrice: { color: '#4B2C0E', fontWeight: 'bold', marginTop: 5 },
    statusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 },
    statusText: { color: '#2E7D32', fontSize: 10, fontWeight: 'bold' },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});