import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#4B2C20',   // Cokelat Field Coffee saat aktif
            tabBarInactiveTintColor: '#8E8E93', // Abu-abu saat tidak aktif
            headerShown: false,
            tabBarHideOnKeyboard: true,         // Tab bar sembunyi saat ngetik
            tabBarStyle: {
                height: 65,
                paddingBottom: 10,
                paddingTop: 5,
                borderTopWidth: 1,
                borderTopColor: '#F0F0F0', // Garis halus di atas tab bar
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
            }
        }}>
            <Tabs.Screen
                name="index" // File: app/(tabs)/index.tsx (Beranda)
                options={{
                    title: 'Beranda',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="menu" // File: app/(tabs)/menu.tsx
                options={{
                    title: 'Menu',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "cafe" : "cafe-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="pesanan" // File: app/(tabs)/pesanan.tsx
                options={{
                    title: 'Pesanan',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "receipt" : "receipt-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="akun" // File: app/(tabs)/akun.tsx
                options={{
                    title: 'Akun',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}