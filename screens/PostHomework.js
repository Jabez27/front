import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axiosInstance from '../axiosInstance';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const HomeworkPost = () => {
  const navigation = useNavigation(); 
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('English'); // Default subject set to English
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handlePost = async () => {
    try {
      const response = await axiosInstance.post('http://192.168.27.213:6554/api/homework', {
        classValue,
        section,
        subject,
        title,
        description,
        dueDate,
      });

      if (response.status === 201) {
        alert('Homework assignment posted successfully');

        // Clear input fields after posting assignment
        setClassValue('');
        setSection('');
        setSubject('English'); // Reset subject to English
        setTitle('');
        setDescription('');
        setDueDate('');
        navigation.replace("Main");
      } else {
        throw new Error('Failed to post homework assignment');
      }
    } catch (error) {
      console.error('Error posting homework assignment:', error.message);
      alert('Failed to post homework assignment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Homework Post Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Class"
        value={classValue}
        onChangeText={setClassValue}
      />
      <TextInput
        style={styles.input}
        placeholder="Section"
        value={section}
        onChangeText={setSection}
      />
      {/* Dropdown for Subject */}
      <Picker
        selectedValue={subject}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}
      >
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Language" value="Language" />
        <Picker.Item label="Maths" value="Maths" />
        <Picker.Item label="Sciences" value="Sciences" />
        <Picker.Item label="Social" value="Social" />
      </Picker>
      {/* End Dropdown */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <Button title="Post Homework" onPress={handlePost} />
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
});

export default HomeworkPost;
