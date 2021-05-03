import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from './reducers';
import App from 'cerebral';
import { Container } from "@cerebral/react";
import Devtools from 'cerebral/devtools'
import Main from './components';

const app = App({
  state: {
    title: 'My Project2',
    songsList: [
      { title: 'No Scrubs', duration: '4:05' },
      { title: 'Macarena', duration: '2:30' },
      { title: 'All Star', duration: '3:15' },
      { title: 'I Want it That Way', duration: '1:45' }
    ],
    selectedSong: {}
  }
}, {
  devtools: Devtools({
    // This should point to the host and port you
    // create in the Devtools application
    host: 'localhost:5555'
  })
});

ReactDOM.render(
  <Container app={app}>
    <Main />
  </Container>,
  document.querySelector('#root')
);
