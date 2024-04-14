import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import EnglishScreen from './EnglishScreen';
import LanguageScreen from './LanguageScreen'; // Import other subject screens
import MathsScreen from './MathsScreen';
import SciencesScreen from './SciencesScreen';
import SocialScreen from './SocialScreen';




const SubjectCard = ({ subject, color, navigation }) => {
  const handlePress = () => {
    navigation.navigate(`${subject}Screen`); // Navigate to the corresponding screen
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <Text style={styles.subject}>{subject}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Stack = createStackNavigator();

const SubjectsList = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SubjectCard subject="English" color="#87CEEB" navigation={navigation} />
      <SubjectCard subject="Language" color="#90EE90" navigation={navigation} />
      <SubjectCard subject="Maths" color="#FFD700" navigation={navigation} />
      <SubjectCard subject="Sciences" color="#FFA07A" navigation={navigation} />
      <SubjectCard subject="Social" color="#FF69B4" navigation={navigation} />
    </ScrollView>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="Subjects">
        <Stack.Screen name="Subjects" component={SubjectsList} options={{ headerShown: false }} />
        <Stack.Screen name="EnglishScreen" component={EnglishScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LanguageScreen" component={LanguageScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="MathsScreen" component={MathsScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="SciencesScreen" component={SciencesScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="SocialScreen" component={SocialScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#f0f0f0',
    
    
  },
  headerContainer: {
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0, 
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    width: '100%',
    height: 125,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 15,
  },
  subject: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
