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
    prompt: null, // eslint-disable-line
    installHandler: null
  }

  componentDidMount() {
    this.setState({
      prompt: window.addEventListener('beforeinstallprompt', (e) => { // eslint-disable-line
        console.log(e);
        e.preventDefault();
        const event = e;
        e.userChoice.then(c => {
          console.log(c);
        });
        this.setState({
          installHandler: () => {
            console.log(event);
            event.userChoice.then((c) => {
              console.log('user choice', c);
            });
            console.log('prompting');
            event.prompt().then(() => {
              console.log('installed');
            });
          }
        });
      })
    });
  }

  setTitle = (title) => {
    this.setState({
      title,
    });
  }

  render() {
    const { location } = this.props;
    const { title, installHandler } = this.state;
    const direction = (location.pathname === '/' || location.pathname === '/trash')
      ? 'slide-backward'
      : 'slide-forward';
    return (
      <Fragment>
        <AppBar title={title} installHandler={installHandler} />
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
