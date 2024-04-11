import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chatroom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [file, setFile] = useState(null);
    const socket = io('http://192.168.27.213:6554'); // Replace with your backend URL

    useEffect(() => {
        socket.on('message', (messageData) => {
            setMessages(prevMessages => [...prevMessages, messageData]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            socket.emit('sendMessage', { content: newMessage });
            setNewMessage('');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            fetch('http://192.168.27.213:6554/api/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                socket.emit('sendMessage', { content: data.filePath });
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
            setFile(null);
        }
    };

    return (
        <div>
            <h2>Chatroom</h2>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-content">{message.content}</div>
                        <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                <button onClick={handleSendMessage}>Send Message</button>
                <button onClick={handleFileUpload}>Upload File</button>
            </div>
        </div>
    );
};

export default Chatroom;
