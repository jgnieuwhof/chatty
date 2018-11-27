import React, { useState } from 'react';
import './App.css';

const Message = ({ message: { username, content } }) => (
  <div className="message">
    <span className="username">{username}</span>
    <span className="content">{content}</span>
  </div>
);

const MessageList = ({ messages }) => (
  <div className="message-list">
    {messages.map((m, i) => (
      <Message key={i} message={m} />
    ))}
  </div>
);

const ChatBar = ({ currentUser: { name }, setUsername, addMessage }) => {
  const [messageInput, setMessageInput] = useState('');
  return (
    <div className="chat-bar">
      <input
        className="username"
        value={name}
        onChange={({ target: { value } }) => setUsername(value)}
      />
      <input
        className="message"
        placeholder="Type a message and hit ENTER"
        value={messageInput}
        onChange={({ target: { value } }) => setMessageInput(value)}
        onKeyUp={e => {
          if (e.keyCode === 13) {
            addMessage(messageInput);
            setMessageInput('');
          }
        }}
      />
    </div>
  );
};

const Header = () => (
  <div className="header">
    <h2>Chatty</h2>
  </div>
);

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Bob'
  });
  const [messages, setMessages] = useState([
    {
      username: 'Bob',
      content: 'Has anyone seen my marbles?'
    },
    {
      username: 'Anonymous',
      content:
        'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    }
  ]);

  return (
    <div className="app">
      <Header />
      <MessageList {...{ messages }} />
      <ChatBar
        {...{ currentUser }}
        setUsername={name => setCurrentUser({ ...currentUser, name })}
        addMessage={content => {
          setMessages([...messages, { username: currentUser.name, content }]);
        }}
      />
    </div>
  );
};

export default App;
