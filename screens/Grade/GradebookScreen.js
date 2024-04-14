import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosInstance';

const UserMarksPage = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get('http://192.168.27.213:6554/api/users/me');
      if (response.status === 200) {
        setCurrentUser(response.data); // Set current user state
        fetchUserMarks(response.data.classValue, response.data.section, response.data.rollNumber);
      } else {
        throw new Error('Failed to fetch current user profile');
      }
    } catch (error) {
      console.error('Error fetching current user profile:', error.message);
    }
  };

  const fetchUserMarks = async (classValue, section, rollNumber) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const response = await axiosInstance.get('http://192.168.27.213:6554/api/grades/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        const filteredMarks = response.data.filter(item => item.classValue === classValue && item.section === section && item.rollNumber === rollNumber); // Fix comparison operator
        setMarks(filteredMarks); // Set filtered marks
        setLoading(false);
      } else {
        throw new Error('Failed to fetch marks');
      }
    } catch (error) {
      console.error('Error fetching marks:', error.message);
      setError('Failed to fetch marks. Please try again.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Marks</Text>
      {marks.length === 0 ? (
        <Text>No marks available</Text>
      ) : (
        <View>
          {marks.map((mark, index) => (
            <View key={index} style={styles.markContainer}>
              <Text style={styles.markText}>Subject: {mark.subject}</Text>
              <Text style={styles.markText}>Exam: {mark.exam}</Text>
              <Text style={styles.markText}>Marks: {mark.marks}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  markContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 150,
    marginBottom: 10,
    borderRadius: 8, // Rounded corners
    backgroundColor: '#fff', // White background
  },
  markText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default UserMarksPage;
