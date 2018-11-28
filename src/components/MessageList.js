import React, { createRef, useEffect } from 'react';

import isImageUrl from 'is-image-url';

const parseMessage = message => {
  return message.split(' ').map(s => {
    const content = s.trim();
    return {
      type: isImageUrl(content) ? 'image' : 'text',
      content
    };
  });
};

const Message = ({ client, message: { username, content } }) => (
  <div className="message">
    <span className="username" style={{ color: client.color }}>
      {username}
    </span>
    <div className="content">
      {parseMessage(content).map(({ type, content }, i) => (
        <span key={i}>
          {type === 'image' ? (
            <img
              alt={content}
              src={content}
              style={{
                maxHeight: 200,
                maxWidth: 200,
                width: 'auto',
                height: 'auto'
              }}
            />
          ) : (
            <span>{content}</span>
          )}
          &nbsp;
        </span>
      ))}
    </div>
  </div>
);

const Notification = ({ client, notification: { content } }) => (
  <div className="notification">
    <span className="content">{content}</span>
  </div>
);

const messageListRef = createRef();
const MessageList = ({ clients, messages }) => {
  useEffect(
    () => {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    },
    [messages]
  );
  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map(({ type, ...x }, i) => {
        const client = clients[x.userId];
        return type === 'notification' ? (
          <Notification key={i} {...{ client }} notification={x} />
        ) : type === 'message' ? (
          <Message key={i} {...{ client }} message={x} />
        ) : (
          <div />
        );
      })}
    </div>
  );
};

export default MessageList;
