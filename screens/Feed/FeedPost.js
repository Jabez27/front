// //FeedPost.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosInstance';
import { useNavigation } from '@react-navigation/native';

const FeedPost = () => {
  const navigation = useNavigation(); 
  const [content, setContent] = useState('');

  const handlePost = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const username = await AsyncStorage.getItem('username'); // Assuming you store the username in AsyncStorage
      const createdAt = new Date(); // Get the current date and time
  
      const feedResponse = await axiosInstance.post('http://192.168.254.213:6554/api/feed', {
        content: content,
        username: username,
        createdAt: createdAt,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
  
      if (feedResponse.status === 201) {
        alert('Feed update posted successfully');
        navigation.replace("Main");
      } else {
        throw new Error('Failed to post feed update');
      }
    } catch (error) {
      console.error('Error posting feed update:', error.message);
      alert('Failed to post feed update. Please try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your feed update"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  feedItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default FeedPost;
