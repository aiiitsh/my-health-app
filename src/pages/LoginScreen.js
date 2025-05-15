// src/pages/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Modal } from 'react-native';
import { AuthContext } from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { signIn, resendVerificationEmail } from '../auth/auth';

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return false;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return false;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    // Validate inputs first
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const result = await signIn(email, password);
      
      if (result.isVerified) {
        setUser({ 
          role, 
          email: result.user.email,
          displayName: result.user.displayName 
        });
      }
    } catch (error) {
      // console.error('Login error:', error);
     
        setError(error.message);
      
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    // Validate inputs first
    if (!validateInputs()) {
      setVerificationModalVisible(false);
      return;
    }

    try {
      setLoading(true);
      const result = await resendVerificationEmail(email, password);
      setVerificationMessage(result.message);
      setVerificationModalVisible(true);
    } catch (error) {
      setError(error.message);
      setVerificationModalVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const VerificationModal = () => (
    <Modal
      visible={verificationModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setVerificationModalVisible(false)}
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
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Icon name="refresh" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.modalButtonText}>Resend Email</Text>
                </>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.loginButton]} 
              onPress={() => {
                setVerificationModalVisible(false);
                navigation.navigate('SignUp');
              }}
            >
              <Icon name="person-add" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.modalButtonText}>Sign Up Instead</Text>
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
      
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, role==='patient' && styles.activeSwitch]}
          onPress={() => setRole('patient')}
        >
          <Icon 
            name="person" 
            size={20} 
            color={role==='patient' ? '#fff' : '#007AFF'} 
            style={styles.switchIcon}
          />
          <Text style={[styles.switchText, role==='patient' && styles.activeSwitchText]}>
            Patient
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, role==='doctor' && styles.activeSwitch]}
          onPress={() => setRole('doctor')}
        >
          <Icon 
            name="medical-services" 
            size={20} 
            color={role==='doctor' ? '#fff' : '#007AFF'} 
            style={styles.switchIcon}
          />
          <Text style={[styles.switchText, role==='doctor' && styles.activeSwitchText]}>
            Doctor
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.inputContainer, error && styles.inputError]}>
        <Icon name="email" size={20} color={error ? '#d32f2f' : '#666'} style={styles.inputIcon} />
        <TextInput 
          style={[styles.input, error && styles.inputTextError]} 
          placeholder="Email" 
          value={email} 
          onChangeText={(text) => {
            setEmail(text);
            setError(''); // Clear error when user types
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={[styles.inputContainer, error && styles.inputError]}>
        <Icon name="lock" size={20} color={error ? '#d32f2f' : '#666'} style={styles.inputIcon} />
        <TextInput 
          style={[styles.input, error && styles.inputTextError]} 
          placeholder="Password" 
          secureTextEntry={!showPassword} 
          value={password} 
          onChangeText={(text) => {
            setPassword(text);
            setError(''); // Clear error when user types
          }}
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon 
            name={showPassword ? "visibility" : "visibility-off"} 
            size={20} 
            color={error ? '#d32f2f' : '#666'} 
          />
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Icon name="error" size={20} color="#d32f2f" style={styles.errorIcon} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <TouchableOpacity 
        style={styles.forgotPasswordButton}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Icon name="login" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Sign In</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

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
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  activeSwitch: {
    backgroundColor: '#007AFF',
  },
  switchText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  activeSwitchText: {
    color: '#fff',
  },
  switchIcon: {
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
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
  inputError: {
    borderColor: '#d32f2f',
  },
  inputTextError: {
    color: '#d32f2f',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    flex: 1,
  },
});

export default LoginScreen;
