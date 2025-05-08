import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import { FontProvider } from './contexts/fontContext';
import QRPage from './pages/QRPage';
import RestoDashboard from './pages/RestoDashboard';

export default function App() {
  
  return (
    <FontProvider>
    <View style={styles.container}>
      <StatusBar style="black" />
      <RestoDashboard />
      </View>
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
