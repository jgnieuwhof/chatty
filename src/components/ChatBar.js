import React, { useEffect, useState } from 'react';

const ChatBar = ({ currentUser, setUsername, addMessage }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  useEffect(
    () => {
      setUsernameInput(currentUser ? currentUser.name : '');
    },
    [currentUser]
  );
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
