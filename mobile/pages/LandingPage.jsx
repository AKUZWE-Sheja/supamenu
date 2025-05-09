import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { CustomText } from '../components/CustomText';

const LandingPage = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="orange" barStyle="light-content" />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <CustomText style={styles.logoText}>
                <CustomText style={styles.supa}>Supa</CustomText>
                <CustomText style={styles.menu}>Menu</CustomText>
            </CustomText>
            </TouchableOpacity>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFA500',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoText: {
        fontSize: 36,
    },
    supa: {
        color: 'black',
    },
    menu: {
        color: 'white',
    },
});
    

export default LandingPage;