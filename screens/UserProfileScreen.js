// EmptyPage.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyPage = () => {
  return (
    <View style={styles.container}>
      <Text>This is an empty page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyPage;
