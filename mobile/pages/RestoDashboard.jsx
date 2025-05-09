import React, { useState } from 'react';
import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomText } from '../components/CustomText';

const allRestaurants = [
  { id: '1', name: 'Choose Kigali', description: 'World, African, Pizzas, Coffee' },
  { id: '2', name: 'Java House', description: 'Burgers, Coffee, Wraps, Salad' },
  { id: '3', name: 'The Hut', description: 'Traditional, Grill, African Delights' },
  { id: '4', name: 'Café Neo', description: 'Coffee, Sandwiches, Desserts' },
  { id: '5', name: 'Tamu Tamu', description: 'Swahili, African, Seafood' },
  { id: '6', name: 'Meze Fresh', description: 'Mexican, Tacos, Burritos' },
  { id: '7', name: 'Heaven Restaurant', description: 'Fusion, Modern African, Local' },
];

const RestoDashboard = ({ navigation }) => {
  const [search, setSearch] = useState('');
  
  const filteredRestaurants = allRestaurants.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.itemContainer}>
      <AntDesign name="home" color="#FFA500" size={60} />
      <View style={styles.textContainer}>
        <CustomText style={styles.name}>{item.name}</CustomText>
        <CustomText style={styles.description}>{item.description}</CustomText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchBar}>
        <MaterialIcons name="arrow-back-ios" color="#FFA500" size={26} onPress={() => navigation.navigate('QRPage')} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search ..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Nearby Restaurants Section */}
      <View style={styles.dashboard}>
        <CustomText style={styles.sectionTitle}>Nearby Restaurants</CustomText>
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredRestaurants.map(item => renderItem({ item }))}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <AntDesign name="home" color="#FFA500" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" color="#FFA500" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="restaurant-outline" color="#FFA500" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="clockcircleo" color="#FFA500" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cart-outline" color="#FFA500" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#E0E0E0',
    padding: 6,
    borderRadius: 16,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
  },
  description: {
    color: '#888',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    justifyContent: 'flex-start',
    borderRadius: 25,
    marginTop: 20,
  },
  searchInput: {
    color: '#888',
    marginLeft: 20,
  },
  sectionTitle: {
    paddingVertical: 10,
    color: '#FFA500',
    fontSize: 16,
  },
  dashboard: {
    flex: 1, // Allow dashboard to take remaining space
    width: '100%',
    justifyContent: 'flex-start',
  },
  list: {
    flexGrow: 0, // Prevent ScrollView from expanding unnecessarily
    width: '100%',
  },
  listContent: {
    paddingBottom: 70,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    elevation: 20,
  },
});

export default RestoDashboard;