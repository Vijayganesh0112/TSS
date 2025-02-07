import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
        <Tabs>
          <Tabs.Screen name="executedOrders" />
          <Tabs.Screen name="openOrder" />
          <Tabs.Screen name="userProfileReg" />
          <Tabs.Screen name="userHomePage" />
        </Tabs>
      </Stack>
    </GestureHandlerRootView>
  );
}