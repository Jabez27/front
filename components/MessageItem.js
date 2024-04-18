// components/MessageItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageItem = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sender}>{message.username}:</Text>
      <Text>{message.message}</Text>
      <Text>{message.createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sender: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default MessageItem;
