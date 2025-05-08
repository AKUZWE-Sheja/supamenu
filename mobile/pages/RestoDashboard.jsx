import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomText } from '../components/CustomText';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

const restaurants = [
  { id: '1', name: 'Choose Kigali', description: 'World, African, Pizzas, Coffee', image: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Choose Kigali', description: 'World, African, Pizzas, Coffee', image: 'https://via.placeholder.com/50' },
  { id: '3', name: 'Choose Kigali', description: 'World, African, Pizzas, Coffee', image: 'https://via.placeholder.com/50' },
  { id: '4', name: 'Choose Kigali', description: 'World, African, Pizzas, Coffee', image: 'https://via.placeholder.com/50' },
  { id: '5', name: 'Choose Kigali', description: 'World, African, Pizzas, Coffee', image: 'https://via.placeholder.com/50' },
];

const RestoDashboard = () => {
    const [search, setSearch] = useState('');

    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
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
                <MaterialIcons name="arrow-back-ios" color="#FFA500" size={26} />
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search ...'
                    value={search}
                    onChange={setSearch}
                />
            </View>

            {/* Nearby Restaurants Section */}
            <View style={styles.dashboard}>
            <CustomText style={styles.sectionTitle}>Nearby Restaurant</CustomText>
            <FlatList
                data={restaurants}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
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
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },  
    itemContainer: {
        flexDirection: 'row',
        margin: 8,
        backgroundColor: '#E0E0E0',
        padding: 6,
        borderRadius: 16    
    },
    textContainer: {
        justifyContent: 'center',
        marginLeft: 10
    },
    name: {
        fontSize: 16
    },
    description: {
        color: '#888'
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '90%',
        justifyContent: 'flext-start',
        borderRadius: 25,
        marginTop: 20,
    },
    searchInput: {
        color: '#888',
        marginLeft: 20  
    },
    sectionTitle: {
        paddingVertical: 10,
        color: '#FFA500',
        fontSize: 16
    },
    list: {
        paddingBottom: 70
    },
    dashboard: {
        width: '100%',
        justifyContent: 'flex-start'
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        bottom: 0,
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '100%',
        height: 80,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff',
        position: 'absolute',
        shadowColor: '#000',
        // Elevation for Android
        elevation: 20,
        },


})

export default RestoDashboard;