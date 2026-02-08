import { AppProvider } from '@/context/AppContext';
import { OrderProvider } from '@/context/OrderContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AppProvider>
      <OrderProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </OrderProvider>
    </AppProvider>
  );
}