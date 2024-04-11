import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const GradeScreen = () => {
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');

  const handleAddGrade = () => {
    // Logic to add grade to database or perform any other action
    console.log(`Added grade ${grade} for subject ${subject}`);
    // Reset form fields after adding grade
    setGrade('');
    setSubject('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Grade</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter grade"
        value={grade}
        onChangeText={text => setGrade(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter subject"
        value={subject}
        onChangeText={text => setSubject(text)}
      />
      <Button title="Add Grade" onPress={handleAddGrade} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default GradeScreen;
