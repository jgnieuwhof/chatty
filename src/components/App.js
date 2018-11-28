import React, { useEffect, useState } from 'react';

import MessageList from './MessageList';
import ChatBar from './ChatBar';

import './App.css';

const Header = ({ currentUser: { name } }) => (
  <div className="header">
    <h2>Chatty</h2>
    <div>{name}</div>
  </div>
);

const App = ({ socket, socketSend }) => {
  const [currentUser, setCurrentUser] = useState({ name: 'Anonymous' });
  const [messages, setMessages] = useState([]);

  const setUsername = name => {
    setCurrentUser({ ...currentUser, name });
    socketSend({
      type: 'postNotification',
      content: {
        username: name,
        content: `${currentUser.name} has changed their name to ${name}.`
      }
    });
  };

  const addMessage = content => {
    socketSend({
      type: 'postMessage',
      content: { username: currentUser.name, content }
    });
  };

  useEffect(() => {
    socket.onmessage = ({ data }) => {
      const { type, content } = JSON.parse(data);
      switch (type) {
        case 'incomingMessage':
          setMessages([...messages, { ...content, type: 'message' }]);
          break;
        case 'incomingNotification':
          setMessages([...messages, { ...content, type: 'notification' }]);
          break;
        default:
          console.error(`Unrecognized message:\n"${data}"`);
          break;
      }
    };
  });

  return (
    <div className="app">
      <Header {...{ currentUser }} />
      <MessageList {...{ messages }} />
      <ChatBar {...{ currentUser, setUsername, addMessage }} />
    </div>
  );
};

export default App;
