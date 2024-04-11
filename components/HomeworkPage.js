// frontend/components/HomeworkPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import SubjectCard from './SubjectCard';

const HomeworkPage = () => {
  const [homeworkData, setHomeworkData] = useState([]);

  useEffect(() => {
    fetchHomeworkData();
  }, []);

  const fetchHomeworkData = async () => {
    try {
      const response = await axios.get('http://192.168.27.213:6554/api/homework');
      setHomeworkData(response.data);
    } catch (error) {
      console.error('Error fetching homework data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Homework Assignments</Text>
      <FlatList
        data={homeworkData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <SubjectCard subject={item.subject} assignments={item.assignments} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeworkPage;
