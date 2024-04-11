import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const MyBarChart = () => {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.header}>Subject-wise Performance</Text>
      <BarChart
        data={{
          labels: ['MATH', 'SCI', 'SOC', 'ENG', 'TAMIL', 'FRENCH'],
          datasets: [{ data: [80, 95, 78, 80, 99, 92] }],
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel={'MARKS'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 20,
          },
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const MyPieChart = () => {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.header}>Overall Performance</Text>
      <PieChart
        data={[
          {
            name: 'MATH',
            population: 80,
            color: '#ff0000',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'SCI',
            population: 95,
            color: '#00ff00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'SOC',
            population: 78,
            color: '#0000ff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'ENG',
            population: 80,
            color: '#ff6600',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'TAMIL',
            population: 99,
            color: '#6600cc',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'FRENCH',
            population: 92,
            color: '#ff3399',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
        ]}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 20,
          },
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          {/* Example of Bar Chart */}
          <MyBarChart />
          {/* Example of Pie Chart */}
          <MyPieChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  chartContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default App;
