// src/pages/MapsScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Dimensions, ActivityIndicator, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const MapsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const [mapHtml, setMapHtml] = useState(
    `<html><body style="margin:0;padding:0;"><iframe width="100%" height="100%" frameborder="0" src="https://maps.google.com/maps?output=embed"></iframe></body></html>`
  );
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery) return;
    setLoading(true);
    const encoded = encodeURIComponent(searchQuery);
    const html = `
      <html><body style="margin:0;padding:0;">
        <iframe width="100%" height="100%" frameborder="0" src="https://maps.google.com/maps?q=${encoded}&output=embed"></iframe>
      </body></html>
    `;
    setMapHtml(html);
    setAddress(searchQuery);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for location"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Set Location" onPress={handleSearch} />
      </View>
      <View style={styles.mapContainer}>
        {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader}/>}        
        <WebView
          originWhitelist={["*"]}
          source={{ html: mapHtml }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
      {address ? (
        <Text style={styles.addressText}>Your location is {address}</Text>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
    zIndex: 10,
  },
  webview: {
    flex: 1,
    width: width,
    height: height,
  },
  addressText: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
  },
});

export default MapsScreen;