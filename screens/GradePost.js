import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axiosInstance from '../axiosInstance';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const FilterGrade = () => {
  const navigation = useNavigation();
  const [classValue, setClassValue] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState(''); // Default subject set to empty string
  const [exam, setExam] = useState('');

  const handleFilter = () => {
    navigation.navigate('MarksTable', { classValue, section, subject, exam });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FilterGrade</Text>
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

      <Picker
        selectedValue={section}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setSection(itemValue)}
      >
        <Picker.Item label="Select Section" value="" />
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="C" value="C" />
        <Picker.Item label="D" value="D" />
        <Picker.Item label="E" value="E" />
        <Picker.Item label="F" value="F" />
      </Picker>

      <Picker
        selectedValue={subject}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}
      >
        <Picker.Item label="Select subject" value="" />
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Language" value="Language" />
        <Picker.Item label="Maths" value="Maths" />
        <Picker.Item label="Sciences" value="Sciences" />
        <Picker.Item label="Social" value="Social" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="exam name"
        value={exam}
        onChangeText={setExam}
      />
      <Button title="Filter" onPress={handleFilter} />
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

export default FilterGrade;
