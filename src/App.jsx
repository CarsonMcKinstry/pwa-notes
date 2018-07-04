import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import NotesList from './components/NotesList';
import TrashList from './components/TrashList';
import Note from './components/Note';

class App extends Component {
  state = {
    title: 'PWA Notes',
  }

  setTitle = (title) => {
    this.setState({
      title,
    });
  }

  render() {
    const { title } = this.state;

    return (
      <Fragment>
        <AppBar title={title} />
        <Switch>
          <Route exact path="/" render={props => <NotesList {...props} setTitle={this.setTitle} />} />
          <Route exact path="/notes/:id" render={props => <Note {...props} setTitle={this.setTitle} />} />
          <Route exact path="/trash" render={props => <TrashList {...props} setTitle={this.setTitle} />} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
