import { Tabs, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function TabsLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn === null) {
    // Loading state
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
      headerShown: true,
      tabBarActiveTintColor: '#007AFF',
    }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ title: 'Dashboard' }} 
      />
      <Tabs.Screen 
        name="orders" 
        options={{ title: 'Orders' }} 
      />
      <Tabs.Screen 
        name="menus" 
        options={{ title: 'Menus' }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ title: 'Profile' }} 
      />
    </Tabs>
  );
}