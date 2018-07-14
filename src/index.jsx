/* eslint-disable */
/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import Theme from './components/styled/Theme';


import history from './history';

import 'material-components-web/dist/material-components-web.min.css';

ReactDOM.render(
  <Router history={history}>
    <Theme>
      <Route component={App} />
    </Theme>
  </Router>,
  document.getElementById('root')
);
// registerServiceWorker();
window.addEventListener('load', () => {
  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swUrl)
      .then(reg => {
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('new Content available');
              } else {
                console.log('content is cached for offline use');
              }
            }
          }
        }
      })
  }
});
