import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axiosInstance from '../../axiosInstance';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const CreateChatroomScreen = () => {
  const navigation = useNavigation(); 
  const [groupName, setGroupName] = useState('');
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');

  const handleCreateChatroom = async () => {
    try {
      const response = await axiosInstance.post('http://192.168.27.213:6554/api/chatrooms', {
        groupName,
        classValue,
        section,
      });
      if (response.status === 201) {
        alert('Successfully Created group');
        navigation.replace("Main");
      } else {
        throw new Error('Failed to create chatroom');
      }
    } catch (error) {
      console.error('Error creating chatroom:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Group Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
      />
      <Text style={styles.label}>Class</Text>
      <Picker
        selectedValue={classValue}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setClassValue(itemValue)}>
        <Picker.Item label="Select class" value="" />
        <Picker.Item label="LKG" value="LKG" />
        <Picker.Item label="UKG" value="UKG" />
        <Picker.Item label="1st" value="1st" />
        <Picker.Item label="2nd" value="2nd" />
        <Picker.Item label="3rd" value="3rd" />
        <Picker.Item label="4th" value="4th" />
        <Picker.Item label="5th" value="5th" />
        <Picker.Item label="6th" value="6th" />
        <Picker.Item label="7th" value="7th" />
        <Picker.Item label="8th" value="8th" />
        <Picker.Item label="9th" value="9th" />
        <Picker.Item label="10th" value="10th" />
        <Picker.Item label="11th" value="11th" />
        <Picker.Item label="12th" value="12th" />
      </Picker>
      <Text style={styles.label}>Section</Text>
      <Picker
        selectedValue={section}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setSection(itemValue)}>
        <Picker.Item label="Select Section" value="" />
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="C" value="C" />
        <Picker.Item label="D" value="D" />
        <Picker.Item label="E" value="E" />
        <Picker.Item label="F" value="F" />
      </Picker>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateChatroom}>
        <Text style={styles.createButtonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#E1E8ED',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateChatroomScreen;
