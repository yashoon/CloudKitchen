import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { commonStyles } from '../styles/styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {

        // Validation
      if (!email || !password) {
          Alert.alert('Error', 'Please enter both email and password');
          return;
      }
    try {
      setLoading(true);


            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);
      
            // Call your FastAPI endpoint
            const response = await fetch('https://cateroncloud-production.up.railway.app/auth/login', {
              method: 'POST',
              headers: {
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formData.toString()
            });
            //   body: JSON.stringify({
            //     email: email,
            //     password: password,
            //   }),
            // });
      
            const data = await response.json();
      
            if (!response.ok) {
              // Handle error response
              console.error('Login failed:', data);
              throw new Error(data.detail || 'Login failed');
            }
      

      console.log(data);
      // For now, save dummy token
      await SecureStore.setItemAsync('userToken', data.access_token);
      await SecureStore.setItemAsync('userEmail', email);

         // Optional: Save additional user data if your API returns it
      if (data.userId) {
          await SecureStore.setItemAsync('userId', data.userId.toString());
      }
      
      router.replace('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Login</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={commonStyles.button} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={commonStyles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}