import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import axiosInstance from '../../axiosInstance';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const HomeworkDisplay = ({ navigation }) => {
  const [homeworkList, setHomeworkList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

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
        const filteredHomework = response.data.filter(item =>
          item.classValue === classValue &&
          item.section === section &&
          item.subject === 'English'
        ).map(item => ({
          ...item,
          createdAt: moment(item.createdAt).format('YYYY-MM-DD') // Format createdAt date
        }));
        setHomeworkList(filteredHomework);
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

  const filteredHomework = homeworkList.filter(item => item.createdAt === selectedDate);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Homework Display</Text>
      </View>
      <View style={styles.homeworkContainer}>
        <TouchableOpacity onPress={toggleCalendar}>
          <Text style={styles.date}>{moment(selectedDate).format('MMM DD, YYYY')}</Text>
        </TouchableOpacity>
        {filteredHomework.length > 0 ? (
          <View>
            <Text style={styles.homeworkTitle}>{filteredHomework[0].title}</Text>
            <Text style={styles.homeworkDescription}>{filteredHomework[0].description}</Text>
            <Text style={styles.dueDate}>Due Date:{filteredHomework[0].dueDate}</Text>
          </View>
        ) : (
          <Text style={styles.noHomework}>No homework assigned for this date.</Text>
        )}
      </View>
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
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  homeworkContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  date: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  homeworkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  homeworkDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  dueDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noHomework: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  closeButton: {
    padding: 10,
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
});

export default HomeworkDisplay;
