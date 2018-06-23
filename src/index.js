import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Theme from './components/Theme';

import 'material-components-web/dist/material-components-web.min.css';

ReactDOM.render(
  <Theme>
    <App />
  </Theme>, 
  document.getElementById('root')
);
registerServiceWorker();
