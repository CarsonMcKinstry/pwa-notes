import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Swipeable from 'react-swipeable';
import styled, { keyframes } from 'styled-components';
import { Icon } from 'rmwc/Icon';

const breakpoint = '600px';

const savingAnimation = keyframes`
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
`;

const SavingIcon = styled(({isSaving, ...props}) => <Icon {...props}/>)`
  animation-direction: forwards;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-duration: 1s;
  animation-name: ${props => props.isSaving ? savingAnimation : null};
`;

const NotePage = styled(Swipeable)`
  height: calc(100% - 56px);
  @media screen and (min-width: ${breakpoint}) {
    height: calc(100% - 64px);
  }
`;

const NoteTopBar = styled.div`
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

class Note extends Component {

  state = {
    isSaving: true
  }

  componentWillMount() {
    this.props.setTitle('Note')

    setTimeout(() => {
      this.setState({
        isSaving: false
      });
    }, 3000); 
  }

  handleSwipeRight = (e, d, f) => {
    if (f) {
      this.props.history.go(-1);
    }
  }

  render(){
    return(
      <NotePage
        onSwipedRight={this.handleSwipeRight}
      >
        <NoteTopBar>
          <SavingIcon 
            isSaving={this.state.isSaving} 
            use={this.state.isSaving ? 'autorenew' : 'done'}
          />
        </NoteTopBar>
      </NotePage>
    );
  }
}

Note.propTypes = {}

export default Note;