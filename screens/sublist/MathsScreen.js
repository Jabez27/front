import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';


export default function HomeworkDisplay({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [homeworks, setHomeworks] = useState({});
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Homework Display</Text>
      </View>
      <View style={styles.homeworkContainer}>
        <TouchableOpacity onPress={toggleCalendar}>
          <Text style={styles.date}>{moment(selectedDate).format('MMM DD, YYYY')}</Text>
        </TouchableOpacity>
        <Text style={styles.homeworkText}>{homeworks[selectedDate] || 'No homework assig.'}</Text>
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
              ...Object.keys(homeworks).reduce((obj, date) => {
                obj[date] = { marked: true, dotColor: '#FF6347' };
                return obj;
              }, {}),
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostHomework" component={PostHomework} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  homeworkContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  date: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  homeworkText: {
    fontSize: 17,
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    margin: 20,
  },
  addButtonLabel: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 17,
    color: '#007AFF',
  },
});
