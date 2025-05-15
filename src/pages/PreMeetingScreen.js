// src/pages/PreMeetingScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

const PreMeetingScreen = ({ navigation }) => {
  const [invitationLink, setInvitationLink] = useState('');
  const [meetingCode, setMeetingCode] = useState('');

  // Generate a fake invitation link, copy it, and show confirmation.
  const generateInvitationLink = () => {
    const randomSegment = () => Math.random().toString(36).substring(2, 5);
    const link = `https://meet.google.com/${randomSegment()}-${randomSegment()}-${randomSegment()}`;
    setInvitationLink(link);
    Clipboard.setString(link);
    Alert.alert('Link Copied', 'Your invitation link has been copied to the clipboard.');
  };

  // When "Ok" is pressed, navigate to the VideoCallScreen.
  const handleJoinMeeting = () => {
    navigation.navigate('VideoCallScreen');
  };

  // When the invitation link is pressed, navigate to VideoCallScreen.
  const handleLinkPress = () => {
    navigation.navigate('VideoCallScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pre-Meeting</Text>
      
      {/* Join Meeting Section */}
      <View style={styles.joinContainer}>
        <TextInput
          style={styles.meetingInput}
          placeholder="Enter Meeting Code"
          placeholderTextColor="#999"
          value={meetingCode}
          onChangeText={setMeetingCode}
        />
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinMeeting}>
          <Text style={styles.joinButtonText}>Ok</Text>
        </TouchableOpacity>
      </View>

      {/* Invitation Section */}
      <TouchableOpacity style={styles.inviteButton} onPress={generateInvitationLink}>
        <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.inviteButtonText}>Send Invitation</Text>
      </TouchableOpacity>

      {/* Clickable Invitation Link */}
      {invitationLink ? (
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.linkText}>{invitationLink}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  joinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    justifyContent: 'center',
  },
  meetingInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  joinButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default PreMeetingScreen;
