import React, { useState } from 'react';
import { StyleSheet, StatusBar, TextInput, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CustomText } from '../components/CustomText';

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: ''
  });

  const validateField = (name, value) => {
    let error = '';
    if (!value.trim()) {
      error = 'This field is required';
    } else {
      switch (name) {
        case 'phone':
          if (!/^\d{10,15}$/.test(value)) error = 'Invalid phone number';
          break;
        case 'email':
          if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format';
          break;
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const handleSubmit = () => {
    const isValid = Object.keys(formData).every(field =>
      validateField(field, formData[field])
    );
    if (isValid) {
        console.log('Form submitted:', formData);
        navigation.navigate('QRPage');
    } else {
        console.log('Validation failed:', errors);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#FFA500" barStyle="light-content" />

          <View style={styles.uppContainer}>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.regContainer}>
              <CustomText style={styles.logoText}>
                <CustomText style={styles.supa}>Supa</CustomText>
                <CustomText style={styles.menu}>Menu</CustomText>
              </CustomText>

              <CustomText style={styles.welcome}>Welcome ...</CustomText>
              <CustomText style={styles.subtext}>Please fill in the information</CustomText>

              {/* Full Name */}
              <View style={[styles.inputContainer, errors.fullName && styles.inputError]}>
                <Ionicons name='person-outline' size={20} color="gray" style={styles.icon} />
                <TextInput 
                  placeholder='Full name'
                  style={styles.input}
                  value={formData.fullName}
                  onChangeText={(text) => handleChange('fullName', text)}
                  onBlur={() => validateField('fullName', formData.fullName)}
                />
              </View>
              {errors.fullName ? <CustomText style={styles.errorText}>{errors.fullName}</CustomText> : null}

              {/* Phone */}
              <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
                <AntDesign name='phone' size={20} color="gray" style={styles.icon} />
                <TextInput 
                  placeholder='Phone Number' 
                  style={styles.input} 
                  keyboardType='phone-pad'
                  value={formData.phone}
                  onChangeText={(text) => handleChange('phone', text)}
                  onBlur={() => validateField('phone', formData.phone)}
                />
              </View>
              {errors.phone ? <CustomText style={styles.errorText}>{errors.phone}</CustomText> : null}

              {/* Email */}
              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <Fontisto name='email' size={20} color="gray" style={styles.icon} />
                <TextInput 
                  placeholder='Your email' 
                  style={styles.input} 
                  keyboardType='email-address'
                  value={formData.email}
                  onChangeText={(text) => handleChange('email', text)}
                  onBlur={() => validateField('email', formData.email)}
                />
              </View>
              {errors.email ? <CustomText style={styles.errorText}>{errors.email}</CustomText> : null}

              {/* Buttons */}
              <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
                <CustomText style={styles.buttonText}>Proceed</CustomText>
              </TouchableOpacity>

              <CustomText style={styles.orText}>OR</CustomText>
              <CustomText style={styles.pmNote}>If you have a PMG account</CustomText>

              <TouchableOpacity style={styles.buttonPrimary}>
                <CustomText style={styles.buttonText}>Sign In</CustomText>
              </TouchableOpacity>

              <CustomText style={styles.RegText}>
                Don't have an account? <CustomText style={styles.RegLink}>Register</CustomText>
              </CustomText>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 60,
    paddingHorizontal: '10%',
  },
  uppContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFA500',
  },
  regContainer: {
    paddingVertical: 20,
  },
  logoText: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20,
  },
  supa: {
    color: 'black',
  },
  menu: {
    color: '#FFA500',
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#FFA500',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  orText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  pmNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  RegText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#888',
  },
  RegLink: {
    color: '#F7941E',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 10,
  },
});

export default Register;
