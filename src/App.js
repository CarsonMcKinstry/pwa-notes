import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import faker from 'faker';
import AppBar from './components/AppBar';
import NotesList from './components/NotesList';
import moment from 'moment';

const notes = Array
  .apply(null, Array(100))
  .map((_, i) => {
    return {
      id: i,
      body: faker.lorem.paragraphs(3),
      createdAt: moment().add(Math.random() * 10, 'minutes').toISOString()
    }
  })

class App extends Component {

  state = {
    addPage: false
  }

  render(){
    return(
      <Fragment>
        <AppBar/>
        <NotesList notes={notes}/>
      </Fragment>
    );
  }
}

App.propTypes = {}

export default App;