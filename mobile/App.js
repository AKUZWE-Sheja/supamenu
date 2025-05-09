import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Register from './pages/Register';
import { FontProvider } from './contexts/fontContext';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './pages/LandingPage';
import QRPage from './pages/QRPage';
import RestoDashboard from './pages/RestoDashboard';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <FontProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="QRPage" component={QRPage} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RestoDashboard" component={RestoDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
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
