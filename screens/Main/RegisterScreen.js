import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://192.168.27.213:6554/api/auth/register', {
        username,
        email,
        password,
        classValue,
        section,
        rollNumber,
      });
      // Handle successful registration
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Login'); // Navigate to login screen after successful registration
    } catch (error) {
      // Handle registration error
      Alert.alert('Error', 'Registration failed');
      console.error('Registration error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>Register</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text>Username:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              
              borderRadius: 5,
              height: 40,
              paddingHorizontal: 10,
              width: 250,
            }}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text>Class:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5,
              height: 40,
              paddingHorizontal: 10,
              width: 250,
            }}
            value={classValue}
            onChangeText={setClassValue}
            placeholder="Enter your Class"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text>Section:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5,
              height: 40,
              paddingHorizontal: 10,
              width: 250,
            }}
            value={section}
            onChangeText={setSection}
            placeholder="Enter your Section"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text>Rollnumber:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5,
              height: 40,
              paddingHorizontal: 10,
              width: 250,
            }}
            value={rollNumber}
            onChangeText={setRollNumber}
            placeholder="Enter your rollnumber"
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text>Email:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5,
              height: 40,
              paddingHorizontal: 10,
              width: 250,
            }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Password:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D0D0D0',
              borderRadius: 5,
              height: 40,
              paddingHorizontal: 10,
              width: 250,
            }}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>
        <Pressable
          onPress={handleRegistration}
          style={{
            width: 200,
            backgroundColor: '#4A55A2',
            padding: 15,
            marginTop: 10,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 17,
              color: 'white',
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: 17 }}>Already have an account? Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
