import React, { useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native'; // Import Keyboard and Platform
import axiosInstance from '../../axiosInstance';
import MessageItem from '../../components/MessageItem'; // Import the MessageItem component

const ChatroomScreen = ({ route }) => {
  const { chatroom } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [inputContainerBottom, setInputContainerBottom] = useState(0); // Store the bottom position of the input container
  const flatListRef = useRef(null); // Create a ref for FlatList

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);

  useEffect(() => {
    // Add listeners for keyboard events
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // Remove listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`http://192.168.27.213:6554/api/message/${chatroom.id}`);
      const data = response.data;
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      console.log('Sending message:', newMessage);
      const response = await axiosInstance.post(`http://192.168.27.213:6554/api/message/${chatroom.id}`, {
        message: newMessage,
      });
      const data = response.data;
      setNewMessage('');
      // Optionally, you can update the messages state with the new message here
      // setMessages([...messages, data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleContentPress = (item) => {
    setSelectedContent(item);
  };

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const keyboardDidShow = (event) => {
    setInputContainerBottom(0); // Add some extra space
  };

  const keyboardDidHide = (event) => {
    // Reset the bottom position of the input container when the keyboard is hidden
    setInputContainerBottom(0);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Attach ref to FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContentPress(item)}>
            <View style={[styles.messageContainer, item.sender === 'me' ? styles.sentMessage : styles.receivedMessage]}>
              <Text style={styles.username}>{item.username.username}</Text>
              <Text style={styles.message}>{item.message}</Text>
              {selectedContent && selectedContent._id === item._id && (
                <Text style={styles.timestamp}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>)}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        onContentSizeChange={() => scrollToBottom()} // Scroll to bottom when content size changes
      />

      {/* Use inline style to dynamically adjust the bottom position of the input container */}
      <View style={[styles.inputContainer, { bottom: inputContainerBottom }]}>
        <TextInput
          style={styles.input}
          placeholder="Type your message............"
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messageContainer: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F2F2F2', // Input field background color
    borderRadius: 20,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatroomScreen;
