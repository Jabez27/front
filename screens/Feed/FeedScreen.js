import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axiosInstance from '../../axiosInstance';

const FeedScreen = () => {
  const [feedUpdates, setFeedUpdates] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    fetchFeedUpdates();

    const interval = setInterval(() => {
      fetchFeedUpdates();
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const fetchFeedUpdates = async () => {
    try {
      const response = await axiosInstance.get('http://192.168.27.213:6554/api/feed');
      if (response.status === 200) {
        setFeedUpdates(response.data);
      } else {
        throw new Error('Failed to fetch feed updates');
      }
    } catch (error) {
      console.error('Error fetching feed updates:', error.message);
    }
  };

  const handleContentPress = (item) => {
    setSelectedContent(item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={feedUpdates}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContentPress(item)}>
            <View style={styles.feedItem}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.content}>{item.content}</Text>
              {selectedContent && selectedContent._id === item._id && (
                <Text style={styles.timestamp}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  feedItem: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#E1E8ED',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#1DA1F2',
  },
  content: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 14,
    color: '#FF69B4',
  },
});

export default FeedScreen;
