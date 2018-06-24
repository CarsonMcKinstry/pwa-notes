import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Theme from './components/Theme';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';

import history from './history';

import 'material-components-web/dist/material-components-web.min.css';

ReactDOM.render(
  <Router history={history}>
    <Theme>
      <Route path="/" component={App}/>
    </Theme>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();
