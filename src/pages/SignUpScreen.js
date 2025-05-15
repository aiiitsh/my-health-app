// src/pages/SignUpScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Modal, Image } from 'react-native';
import { AuthContext } from '../../App';
import { signUp, checkEmailVerification, resendVerificationEmail } from '../auth/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUpScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [role, setRole] = useState('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    // Extract domain from email
    const domain = email.split('@')[1].toLowerCase();

    // List of allowed domains
    const allowedDomains = [
      'gmail.com',
      'outlook.com',
      'hotmail.com',
      'yahoo.com'
    ];

    // List of known temporary email domains
    const tempEmailDomains = [
      'tempmail.com',
      'temp-mail.org',
      'mailinator.com',
      'guerrillamail.com',
      '10minutemail.com',
      'yopmail.com',
      'throwawaymail.com',
      'maildrop.cc',
      'temp-mail.io',
      'sharklasers.com',
      'guerrillamail.info',
      'guerrillamail.biz',
      'guerrillamail.com',
      'guerrillamailblock.com',
      'spam4.me',
      'trashmail.com',
    ];

    // Check if domain is in allowed list
    if (!allowedDomains.includes(domain)) {
      return 'Please use a valid email domain (Gmail, Outlook, Hotmail, or Yahoo)';
    }

    // Check if domain is in temporary email list
    if (tempEmailDomains.includes(domain)) {
      return 'Temporary email addresses are not allowed';
    }

    return '';
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    
    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number';
    }
    if (!hasLetter) {
      return 'Password must contain at least one letter';
    }
    return '';
  };

  const validateName = (name) => {
    if (name.length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      return 'Name can only contain letters and spaces';
    }
    return '';
  };

  const validateForm = () => {
    // Check if fields are empty
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    // Validate name
    const nameError = validateName(name);
    if (nameError) {
      setError(nameError);
      return false;
    }

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return false;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return false;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const user = await signUp(email, password, name);
      const verificationStatus = await checkEmailVerification();
      
      if (!verificationStatus.verified) {
        setVerificationMessage('Please verify your email to continue');
        setShowVerificationModal(true);
      }

    } catch (error) {
      let errorMessage = 'An error occurred during sign up';
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already registered. Please try signing in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use a stronger password.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please wait a few minutes before trying again.';
          break;
        default:
          errorMessage = 'An error occurred during sign up. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail();
      setVerificationMessage('Verification email sent!');
      setShowVerificationModal(true);
    } catch (error) {
      let errorMessage = 'Failed to resend verification email. Please try again later.';
      
      if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please wait a few minutes before trying again.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please try signing up again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address. Please check your email and try again.';
      }
      
      setVerificationMessage(errorMessage);
      setShowVerificationModal(true);
    }
  };

  const VerificationModal = () => (
    <Modal
      visible={showVerificationModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowVerificationModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Icon 
            name="mark-email-read" 
            size={60} 
            color="#4CAF50" 
            style={styles.modalIcon}
          />
          <Text style={styles.modalTitle}>Verification Required</Text>
          <Text style={styles.modalMessage}>{verificationMessage}</Text>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.resendButton]} 
              onPress={handleResendVerification}
            >
              <Icon name="refresh" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Resend Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.loginButton]} 
              onPress={() => {
                setShowVerificationModal(false);
                navigation.navigate('Login');
              }}
            >
              <Icon name="login" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Go to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Sign Up</Text>
      
      <View style={styles.switchContainer}>
        <TouchableOpacity 
          style={[styles.switchButton, role==='patient' && styles.activeSwitch]} 
          onPress={() => setRole('patient')}
        >
          <Text style={[styles.switchText, role==='patient' && styles.activeSwitchText]}>
            Sign up as Patient
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.switchButton, role==='doctor' && styles.activeSwitch]} 
          onPress={() => setRole('doctor')}
        >
          <Text style={[styles.switchText, role==='doctor' && styles.activeSwitchText]}>
            Sign up as Doctor
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        value={name} 
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
      <VerificationModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#fff'
  },
  title: { 
    fontSize: 32, 
    marginBottom: 20, 
    color: '#007AFF', 
    fontWeight: 'bold' 
  },
  errorContainer: {
    width: '100%',
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ffcdd2'
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    fontSize: 14
  },
  switchContainer: { 
    flexDirection: 'row', 
    marginBottom: 20 
  },
  switchButton: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#007AFF', 
    borderRadius: 5, 
    marginHorizontal: 5 
  },
  activeSwitch: { 
    backgroundColor: '#007AFF' 
  },
  switchText: { 
    color: '#007AFF' 
  },
  activeSwitchText: {
    color: '#fff'
  },
  input: { 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#007AFF', 
    borderRadius: 5, 
    padding: 10, 
    marginVertical: 5 
  },
  button: { 
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 5, 
    marginTop: 10, 
    width: '100%', 
    alignItems: 'center' 
  },
  buttonDisabled: {
    backgroundColor: '#ccc'
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18 
  },
  link: { 
    color: '#007AFF', 
    marginTop: 10 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    width: '100%',
    gap: 10,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  resendButton: {
    backgroundColor: '#4CAF50',
  },
  loginButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 5,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
});

export default SignUpScreen;
