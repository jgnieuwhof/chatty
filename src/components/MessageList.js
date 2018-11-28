import React from 'react';

const Message = ({ message: { username, content } }) => (
  <div className="message">
    <span className="username">{username}</span>
    <span className="content">{content}</span>
  </div>
);

const Notification = ({ notification: { content } }) => (
  <div className="notification">
    <span className="content">{content}</span>
  </div>
);

const MessageList = ({ messages }) => (
  <div className="message-list">
    {messages.map(({ type, ...x }, i) =>
      type === 'notification' ? (
        <Notification key={i} notification={x} />
      ) : type === 'message' ? (
        <Message key={i} message={x} />
      ) : (
        <div />
      )
    )}
  </div>
);

export default MessageList;
