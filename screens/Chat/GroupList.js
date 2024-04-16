import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axiosInstance from '../../axiosInstance';

const GroupsDisplayScreen = ({ navigation }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [classValue, setClassValue] = useState(''); 
  const [section, setSection] = useState(''); 

  useEffect(() => {
    fetchChatrooms(); 
  }, [groupName, classValue, section]); 

  const fetchChatrooms = async () => {
    try {
      const response = await axiosInstance.get('http://192.168.27.213:6554/api/chatrooms', {
        params: {
          groupName,
          classValue,
          section,
        },
      });
      if (response.status === 200) {
        setChatrooms(response.data);
        console.log('groupName:', groupName);
        console.log('classValue:', classValue);
        console.log('section:', section);
        console.log('response.data:', response.data);
      } else {
        throw new Error('Failed to fetch chatrooms');
      }
    } catch (error) {
      console.error('Error fetching chatrooms:', error.message);
    }
  };
  
  // const handleChatroomPress = (chatroom) => {
  //   navigation.navigate('Chatroom', { chatroom });
  // };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatrooms}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatroomPress(item)}>
            <View style={styles.chatroomItem}>
              <Text style={styles.chatroomName}>{item.name}</Text>
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

export default GroupsDisplayScreen;
