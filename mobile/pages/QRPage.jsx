import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomText } from '../components/CustomText';

const QRPage = () => {
  return (
    <View style={styles.container}>

      {/* Search input */}
      <View style={styles.searchBar}>
      <MaterialIcons name="search" size={24} color="#FFA500" />
      <TextInput
        style={styles.searchInput}
        placeholder='Search for your preferred restaurant'
        placeholderTextColor='#888'
      />
      </View>

      {/* Divider */}
      <CustomText style={styles.dividerText}>OR</CustomText>

      {/* Scan & Pay */}
      <TouchableOpacity style={styles.scanButton}>
        <Ionicons name="qr-code-outline" color="#000" size={160} />
        <CustomText style={styles.scanButtonText}>Scan, Pay & Enjoy!</CustomText>
      </TouchableOpacity>


    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '80%',
    justifyContent: 'center',
    borderRadius: 25,
    marginVertical: 100
  },
  searchInput: {
    color: '#888'
  },
  dividerText: {
    color: '#888',
    fontSize: 16
  },
  scanButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  scanButtonText: {
    color: '#888',
    fontSize: 20,
    marginTop: 30
  }
})

export default QRPage