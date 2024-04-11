// App.js or index.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'; // Adjust the path as per your file structure

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
