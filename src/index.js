import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { server, port } from './common/config';

import './index.css';

const socket = new WebSocket(`ws://${server}:${port}`);

const socketSend = ({ type, content }) =>
  socket.send(JSON.stringify({ type, content }));

ReactDOM.render(
  <App {...{ socket, socketSend }} />,
  document.getElementById('root')
);
