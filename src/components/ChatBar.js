import React, { useState } from 'react';

const ChatBar = ({ currentUser: { name }, setUsername, addMessage }) => {
  const [usernameInput, setUsernameInput] = useState(name);
  const [messageInput, setMessageInput] = useState('');
  return (
    <div className="chat-bar">
      <input
        className="username"
        value={usernameInput}
        onChange={({ target: { value } }) => setUsernameInput(value)}
        onKeyUp={({ keyCode }) => {
          if (keyCode === 13) {
            setUsername(usernameInput);
          }
        }}
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

export default ChatBar;
