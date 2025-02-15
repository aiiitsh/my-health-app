// src/pages/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../App';

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [role, setRole] = useState('patient'); // default role
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Fake login: set user with chosen role
    setUser({ role, email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, role==='patient' && styles.activeSwitch]}
          onPress={() => setRole('patient')}
        >
          <Text style={styles.switchText}>Sign in as Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, role==='doctor' && styles.activeSwitch]}
          onPress={() => setRole('doctor')}
        >
          <Text style={styles.switchText}>Sign in as Doctor</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:32, marginBottom:20, color:'#007AFF', fontWeight:'bold' },
  switchContainer: { flexDirection:'row', marginBottom:20 },
  switchButton: { padding:10, borderWidth:1, borderColor:'#007AFF', borderRadius:5, marginHorizontal:5 },
  activeSwitch: { backgroundColor:'#007AFF' },
  switchText: { color:'#007AFF' },
  input: { width:'100%', borderWidth:1, borderColor:'#007AFF', borderRadius:5, padding:10, marginVertical:5 },
  button: { backgroundColor:'#007AFF', padding:15, borderRadius:5, marginTop:10, width:'100%', alignItems:'center' },
  buttonText: { color:'#fff', fontSize:18 },
  link: { color:'#007AFF', marginTop:10 },
});

export default LoginScreen;
