// src/pages/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    navigation.navigate('ConfirmCode');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:32, marginBottom:20, color:'#007AFF', fontWeight:'bold' },
  input: { width:'100%', borderWidth:1, borderColor:'#007AFF', borderRadius:5, padding:10, marginVertical:5 },
  button: { backgroundColor:'#007AFF', padding:15, borderRadius:5, marginTop:10, width:'100%', alignItems:'center' },
  buttonText: { color:'#fff', fontSize:18 },
});

export default ForgotPasswordScreen;
