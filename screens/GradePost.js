import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import axiosInstance from '../axiosInstance';

const MarksTable = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get('http://192.168.27.213:6554/api/users/');
      if (response.status === 200) {
        const students = response.data;
        const initialStudentData = students.map(student => ({
          rollNumber: student.rollNumber,
          username: student.username,
          classValue: student.classValue,
          section: student.section,
          subject: '',
          exam: '',
          marks: '',
        }));
        setStudentData(initialStudentData);
      } else {
        throw new Error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  const handleMarksChange = (text, rowIndex, columnName) => {
    const updatedStudentData = [...studentData];
    updatedStudentData[rowIndex][columnName] = text;
    setStudentData(updatedStudentData);
  };

  const handleSubmitMarks = async () => {
    try {
      // Send marks data to the server to save in the database
      const response = await axiosInstance.post('http://192.168.27.213:6554/api/grades', {
        grades: studentData,
      });
      if (response.status === 201) {
        alert('Marks uploaded successfully');
      } else {
        throw new Error('Failed to upload marks');
      }
    } catch (error) {
      console.error('Error uploading marks:', error.message);
      alert('Failed to upload marks. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        <Row data={['Roll Number', 'Username', 'Class', 'Section', 'Subject', 'Exam', 'Marks']} style={styles.head} textStyle={styles.text} />
        <Rows
          data={studentData.map((student, index) => [
            student.rollNumber,
            student.username,
            student.classValue,
            student.section,
            <TextInput
              style={styles.input}
              value={student.subject}
              onChangeText={text => handleMarksChange(text, index, 'subject')}
            />,
            <TextInput
              style={styles.input}
              value={student.unitTest1}
              onChangeText={text => handleMarksChange(text, index, 'exam')}
            />,
            <TextInput
              style={styles.input}
              value={student.final}
              onChangeText={text => handleMarksChange(text, index, 'marks')}
            />,
          ])}
          textStyle={styles.cellText}
        />
      </Table>
      <Button title="Save Marks" onPress={handleSubmitMarks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 50, backgroundColor: '#f1f8ff' },
  text: { margin: 7, textAlign: 'center' },
  cellText: { textAlign: 'center' },
  input: { textAlign: 'center', borderWidth: 1, borderColor: '#C1C0B9', padding: 5 },
});

export default MarksTable;
