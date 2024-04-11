// PostDetails.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostDetails = ({ post }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>{post?.author}</Text>
      <Text style={styles.content}>{post?.content}</Text>
      <Text style={styles.date}>{post?.date}</Text>
      {/* Render other post details */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  author: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 17,
    marginTop: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default PostDetails;
