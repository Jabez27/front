import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, TextInput, ScrollView } from 'react-native'; // Import ScrollView
import { Table, Row, Rows } from 'react-native-table-component';
import axiosInstance from '../../axiosInstance';
import { useNavigation } from '@react-navigation/native';

const MarksTable = ({ route }) => {
  const { classValue, section, subject, exam } = route.params;
  const navigation = useNavigation(); // Access navigation object
  
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, [classValue, section, subject, exam]);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get('http://192.168.27.213:6554/api/users/');
      if (response.status === 200) {
        const students = response.data;
        const filteredStudents = students.filter(student => (
          student.classValue === classValue &&
          student.section === section 
        ));
        const initialStudentData = filteredStudents.map(student => ({
          rollNumber: student.rollNumber,
          username: student.username,
          classValue: student.classValue,
          section: student.section,
          subject: subject,
          exam: exam,
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
      console.log('Submitting marks:', studentData);
      const response = await axiosInstance.post('http://192.168.27.213:6554/api/grades', {
        grades: studentData,
      });
      console.log('Response:', response);
      if (response.status === 201) {
        alert('Marks uploaded successfully');
        navigation.navigate('Main'); 
      } else {
        throw new Error('Failed to upload marks');
      }
    } catch (error) {
      console.error('Error uploading marks:', error.message);
      alert('Failed to upload marks. Please try again.');
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, padding: 5, paddingTop: 30, backgroundColor: '#fff' }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={['Roll Number', 'Username', 'Class', 'Section', 'Subject', 'Exam', 'Marks']} style={{ height: 50, backgroundColor: '#f1f8ff' }} textStyle={{ margin: 7, textAlign: 'center' }} />
            <Rows
              data={studentData.map((student, index) => [
                student.rollNumber,
                student.username,
                student.classValue,
                student.section,
                student.subject,
                student.exam,
                <TextInput
                  style={{ textAlign: 'center', borderWidth: 1, borderColor: '#C1C0B9', padding: 5 }}
                  value={String(student.marks)}
                  onChangeText={text => handleMarksChange(text, index, 'marks')}
                />,
              ])}
              textStyle={{ textAlign: 'center' }} 
            />
          </Table>
          <Button title="Save Marks" onPress={handleSubmitMarks} />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default MarksTable;
