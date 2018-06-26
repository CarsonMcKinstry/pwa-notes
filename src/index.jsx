/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Theme from './components/styled/Theme';


import history from './history';

import 'material-components-web/dist/material-components-web.min.css';

ReactDOM.render(
  <Router history={history}>
    <Theme>
      <Route path="/" component={App} />
    </Theme>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
