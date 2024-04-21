import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'; // Add Dimensions
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axiosInstance';
import { BarChart, PieChart } from 'react-native-chart-kit';

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
      const response = await axiosInstance.get('http://192.168.254.213:6554/api/users/me');
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
      const response = await axiosInstance.get('http://192.168.254.213:6554/api/grades/me', {
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

  // Prepare data for pie chart
  const preparePieChartData = () => {
    const subjects = {};
    marks.forEach(mark => {
      if (subjects[mark.subject]) {
        subjects[mark.subject] += mark.marks;
      } else {
        subjects[mark.subject] = mark.marks;
      }
    });
    return Object.keys(subjects).map(subject => ({ name: subject, value: subjects[subject] }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Your Marks</Text>
          {marks.length === 0 ? (
            <Text>No marks available</Text>
          ) : (
            <View>
              {/* Bar Chart */}
              <Text style={styles.chartTitle}>Bar Chart</Text>
              <BarChart
                data={{
                  labels: marks.map(mark => mark.subject),
                  datasets: [
                    {
                      data: marks.map(mark => mark.marks),
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                yAxisLabel="Marks"
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              {/* Pie Chart */}
              <Text style={styles.chartTitle}>Pie Chart</Text>
              <PieChart
                data={preparePieChartData()}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default UserMarksPage;
