import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import faker from 'faker';
import AppBar from './components/AppBar';
import NotesList from './components/NotesList';
import TrashList from './components/TrashList';
import moment from 'moment';
import { Switch, Route } from 'react-router-dom'; 
import Note from './components/Note';
import NewNote from './components/NewNote';
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
    addPage: false,
    title: 'PWA Notes'
  }

  setTitle = (title) => {
    this.setState({
      title
    })
  }

  render(){
    return(
      <Fragment>
        <AppBar title={this.state.title}/>
        <Switch>
          <Route exact path="/" render={(props) => <NotesList {...props} notes={notes} setTitle={this.setTitle}/>}/>
          <Route exact path="/notes/:id" render={(props) => <Note {...props} setTitle={this.setTitle}/>}/>
          <Route exact path="/new" render={(props) => <NewNote {...props} notes={notes} setTitle={this.setTitle}/>}/>
          <Route exact path="/trash" render={(props) => <TrashList {...props} notes={notes} setTitle={this.setTitle}/>}/>
        </Switch>
      </Fragment>
    );
  }
}

App.propTypes = {}

export default App;