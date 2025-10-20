import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { commonStyles } from "./src/styles/styles";

export default function App(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (): void => {
    if (username === "admin" && password === "1234") {
      Alert.alert("Login Successful 🎉", `Welcome ${username}!`);
    } else {
      Alert.alert("Login Failed !!!", "Invalid username or password");
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={styles.title}>My Cloud Kitchen</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
        <Text style={commonStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: "bold",
  },
});
