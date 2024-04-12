import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axiosInstance from '../../axiosInstance';

const HomeworkDisplay = () => {
  const [homeworkList, setHomeworkList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();

    const interval = setInterval(() => {
      if (currentUser) {
        fetchHomeworkAssignments(currentUser.classValue, currentUser.section);
      }
    }, 3000);
  
    return () => clearInterval(interval);
  }, [currentUser]);

const fetchCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('http://192.168.27.213:6554/api/users/me');
    if (response.status === 200) {
      setCurrentUser(response.data);
      fetchHomeworkAssignments(response.data.classValue, response.data.section);
    } else {
      throw new Error('Failed to fetch current user profile');
    }
  } catch (error) {
    console.error('Error fetching current user profile:', error.message);
  }
};

const fetchHomeworkAssignments = async (classValue, section) => {
  try {
    const response = await axiosInstance.get('http://192.168.27.213:6554/api/homework');
    if (response.status === 200) {
      const filteredHomework = response.data.filter(item => item.classValue === classValue && item.section === section  && item.subject === 'Language');
      setHomeworkList(filteredHomework);
    } else {
      throw new Error('Failed to fetch homework assignments');
    }
  } catch (error) {
    console.error('Error fetching homework assignments:', error.message);
  }
};

return (
  <View style={styles.container}>
    <Text style={styles.title}>Homework Assignments</Text>
    {homeworkList.length > 0 ? (
      <FlatList
        data={homeworkList}
        renderItem={({ item }) => (
          <View style={styles.assignmentContainer}>
            <Text style={styles.assignmentTitle}>{item.title}</Text>
            <Text style={styles.assignmentInfo}>Class: {item.classValue}</Text>
            <Text style={styles.assignmentInfo}>Section: {item.section}</Text>
            <Text style={styles.assignmentInfo}>Subject: {item.subject}</Text>
            <Text style={styles.assignmentInfo}>Description: {item.description}</Text>
            <Text style={styles.assignmentInfo}>Due Date: {item.dueDate}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    ) : (
      <Text style={styles.noAssignments}>No homework assignments found</Text>
    )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  assignmentContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  assignmentInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  noAssignments: {
    fontSize: 16,
    fontStyle: 'italic',
  }
});

export default HomeworkDisplay;
