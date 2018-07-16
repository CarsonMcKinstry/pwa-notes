/* eslint-disable */
/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'material-components-web/dist/material-components-web.min.css';

import Theme from './components/styled/Theme';

import history from './history';

ReactDOM.render(
  <Router history={history}>
    <Theme>
      <Route component={App} />
    </Theme>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
