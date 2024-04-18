import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosInstance';

const GroupListScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');
  const [chatrooms, setChatrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const response = await axiosInstance.get('http://192.168.27.213:6554/api/chatrooms',
        {
          groupName,
          classValue,
          section,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
      const data = response.data;
      setChatrooms(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setLoading(false);
    }
  };
  const handleChatroomPress = (chatroom) => {
    navigation.navigate('Chatroom', { chatroom });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatrooms}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatroomPress(item)}>
            <View style={styles.chatroomItem}>
              <Text style={styles.chatroomName}>{item.groupName}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  chatroomItem: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomColor: '#E1E8ED',
    borderBottomWidth: 1,
  },
  chatroomName: {
    fontSize: 17,
    color: '#1DA1F2',
  },
});

export default GroupListScreen;
