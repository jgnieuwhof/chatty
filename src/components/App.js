import React, { useEffect, useState } from 'react';

import MessageList from './MessageList';
import ChatBar from './ChatBar';

import './App.css';

const Header = ({ currentUser, clients }) => (
  <div className="header">
    <h2>Chatty</h2>
    {currentUser && (
      <div>
        {currentUser.name} {currentUser.id && `(${currentUser.id})`} (
        {Object.keys(clients).length})
      </div>
    )}
  </div>
);

const App = ({ socket, socketSend }) => {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [clients, setClients] = useState({});
  const currentUser = clients[userId];

  const setUsername = name => {
    socketSend({
      type: 'postChangeUsername',
      content: { userId, name }
    });
  };

  const addMessage = content => {
    socketSend({
      type: 'postMessage',
      content: { userId, username: currentUser.name, content }
    });
  };

  useEffect(() => {
    socket.onmessage = ({ data }) => {
      const { type, content } = JSON.parse(data);
      console.log({ type, content });
      switch (type) {
        case 'incomingMessage':
          setMessages([...messages, { ...content, type: 'message' }]);
          break;
        case 'incomingNotification':
          setMessages([...messages, { ...content, type: 'notification' }]);
          break;
        case 'incomingClientInit':
          setUserId(content.id);
          break;
        case 'incomingUpdateClient':
          setClients({ ...clients, [content.id]: content });
          break;
        case 'incomingClients':
          setClients(content.reduce((obj, c) => ({ ...obj, [c.id]: c }), {}));
          break;
        default:
          console.error(`Unrecognized message:\n"${data}"`);
          break;
      }
    };
  });

  return (
    <div className="app">
      <Header {...{ currentUser, clients }} />
      <MessageList {...{ clients, messages }} />
      <ChatBar {...{ currentUser, setUsername, addMessage }} />
    </div>
  );
};

export default App;
