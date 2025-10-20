import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [userToken, setUserToken] = useState('');


  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const email = await SecureStore.getItemAsync('userEmail');
      const token = await SecureStore.getItemAsync('userToken');
      
      setUserEmail(email || 'No email found');
      setUserToken(token || 'No token found');
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userEmail');
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Home Screen</Text>
      <Text style={{ fontSize: 24 }}>{userEmail}</Text>
      <Text style={{ fontSize: 24 }}>{userToken}</Text>

      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}