import React, { Component, Fragment } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import NotesList from './components/NotesList';
import TrashList from './components/TrashList';
import Note from './components/Note';
import transitionWrapper from './components/styled/TransitionWrapper';

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
    const { location } = this.props;
    const { title } = this.state;
    const direction = (location.pathname === '/' || location.pathname === '/trash')
      ? 'slide-backward'
      : 'slide-forward';
    return (
      <Fragment>
        <AppBar title={title} />
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames={direction}
            timeout={300}
          >
            <Switch location={location}>
              <Route exact path="/" render={props => transitionWrapper(NotesList)({ ...props, setTitle: this.setTitle })} />
              <Route exact path="/notes/:id" render={props => transitionWrapper(Note)({ ...props, setTitle: this.setTitle })} />
              <Route exact path="/trash" render={props => transitionWrapper(TrashList)({ ...props, setTitle: this.setTitle })} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

export default App;
