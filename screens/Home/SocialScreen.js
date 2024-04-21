import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import axiosInstance from '../../axiosInstance';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const HomeworkDisplay = ({ navigation }) => {
  const [homeworkList, setHomeworkList] = useState([]);
  const [filteredHomework, setFilteredHomework] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
    const interval = setInterval(() => {
      if (currentUser) {
        fetchHomeworkAssignments(currentUser.classValue, currentUser.section);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get('http://192.168.254.213:6554/api/users/me');
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
      const response = await axiosInstance.get('http://192.168.254.213:6554/api/homework');
      if (response.status === 200) {
        const allHomework = response.data.map(item => ({
          ...item,
          createdAt: moment(item.createdAt).format('YYYY-MM-DD')
        }));
        setHomeworkList(allHomework);

        const filteredHomework = allHomework.filter(item =>
          item.classValue === classValue &&
          item.section === section &&
          item.subject === 'Social' &&
          moment(item.createdAt).format('YYYY-MM-DD') === selectedDate
        );
        setFilteredHomework(filteredHomework);
      } else {
        throw new Error('Failed to fetch homework assignments');
      }
    } catch (error) {
      console.error('Error fetching homework assignments:', error.message);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Homework Display</Text>
      <TouchableOpacity onPress={toggleCalendar}>
        <Text style={styles.date}>{moment(selectedDate).format('MMM DD, YYYY')}</Text>
      </TouchableOpacity>
      
      <FlatList
        data={filteredHomework}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.assignmentItemContainer}>
            <Text style={styles.assignmentTitle}>{item.title}</Text>
            <Text style={styles.assignmentInfo}>{item.description}</Text>
            <Text style={styles.dueDate}>Due Date: {item.dueDate}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noAssignments}>No homework assigned for this date.</Text>
        )}
      />

      <Modal visible={isCalendarVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleCalendar}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#007AFF' },
              ...Object.keys(homeworkList.reduce((obj, item) => {
                const date = moment(item.createdAt).format('YYYY-MM-DD');
                obj[date] = { marked: true, dotColor: '#FF6347' };
                return obj;
              }, {})).reduce((obj, date) => {
                obj[date] = { marked: true, dotColor: '#FF6347' };
                return obj;
              }, {}),
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    
  },
  assignmentItemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  assignmentTitle: {
    fontSize: 24,
    marginTop: 5,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'justify',
  },
  assignmentInfo: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  noAssignments: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'justify',
  },
  closeButton: {
    padding: 10,
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  dueDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default HomeworkDisplay;
