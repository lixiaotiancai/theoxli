import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

export default function createApp() {
  const container = document.createElement('div');
  container.id = 'app';
  document.body.appendChild(container);

  ReactDOM.render(<Counter />, container);
}

if (!process.env.isMiniProgram) {
  createApp();
}
