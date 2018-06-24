import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Swipeable from 'react-swipeable';
import styled from 'styled-components';

const breakpoint = '600px';

const NotesPage = styled(Swipeable)`
  height: calc(100% - 56px);
  @media screen and (min-width: ${breakpoint}) {
    height: calc(100% - 64px);
  }
`;

class Note extends Component {

  componentWillMount() {
    this.props.setTitle('Note')
  }

  handleSwipeRight = (e, d, f) => {
    if (f) {
      this.props.history.go(-1);
    }
  }

  render(){
    return(
      <NotesPage
        onSwipedRight={this.handleSwipeRight}
      >

      </NotesPage>
    );
  }
}

Note.propTypes = {}

export default Note;