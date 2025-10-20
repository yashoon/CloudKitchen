import HomeScreen from '../../screens/HomeScreen';

export default HomeScreen;
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'expo-router';
// import * as SecureStore from 'expo-secure-store';

// export default function home() {

//     const router = useRouter();
//     const [userEmail, setUserEmail] = useState('');
//     const [userToken, setUserToken] = useState('');

//   const handleLogout = async () => {
//     try {
//       await SecureStore.deleteItemAsync('userToken');
//       await SecureStore.deleteItemAsync('userEmail');
//       router.replace('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home Content</Text>
//       <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
//         <Text>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }