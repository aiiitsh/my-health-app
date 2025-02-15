// src/pages/SignUpScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../App';

const SignUpScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [role, setRole] = useState('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Fake sign up: set user with chosen role
    setUser({ role, name, email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.switchContainer}>
        <TouchableOpacity style={[styles.switchButton, role==='patient' && styles.activeSwitch]} onPress={() => setRole('patient')}>
          <Text style={styles.switchText}>Sign up as Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.switchButton, role==='doctor' && styles.activeSwitch]} onPress={() => setRole('doctor')}>
          <Text style={styles.switchText}>Sign up as Doctor</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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

export default SignUpScreen;
