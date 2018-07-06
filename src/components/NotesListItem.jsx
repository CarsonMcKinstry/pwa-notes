import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Swipeable from 'react-swipeable';
import moment from 'moment';

import {
  ListItem,
  ListItemSecondaryText,
  ListItemText,
  ListDivider,
} from 'rmwc/List';
import { Icon } from 'rmwc/Icon';

const transition = 'transform 0.3s cubic-bezier(0, 0, .2, 1)';

const DeleteButton = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: ${({ theme }) => theme.danger.base};
  position: absolute;
  right: 0;
  transform: translateX(${({ swiped }) => swiped ? '0' : '60px'});
  z-index: 1000;
  transition: ${transition};
`;

const StyledListItemText = styled(({ swiped, ...props }) => <ListItemText {...props} />)`
  transition: ${transition};
  transform: translateX(${({ swiped }) => swiped ? '-60px' : 0});
`;

const deletingAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-200%);    
  }
`;

const StyledListItem = styled(({ swiped, deleting, ...props }) => <ListItem {...props} />)`
  padding-bottom: 6px!important;
  animation-name: ${deletingAnimation};
  animation-duration: .4s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-play-state: ${({ deleting }) => deleting ? 'running' : 'paused'};
`;

class NotesListItem extends Component {
  handleDeletePress = (e) => {
    const { note, onDelete } = this.props;
    e.stopPropagation();
    onDelete(note.id);
  }

  handleItemPress = () => {
    const { onClick, note: { id } } = this.props;
    onClick(id);
  }

  handleSwipeLeft = () => {
    const { onSwipe, note: { id } } = this.props;
    onSwipe(id);
  }

  handleSwipeRight = () => {
    const { onSwipe } = this.props;
    onSwipe(null);
  }

  render() {
    const { note, swiped, deleting } = this.props;
    const [first, secondLine] = note.body.split(/\.|\n\n/g);

    return (
      <Swipeable
        onSwipedRight={this.handleSwipeRight}
        onSwipedLeft={this.handleSwipeLeft}
      >
        <StyledListItem deleting={deleting} onClick={this.handleItemPress}>
          <StyledListItemText
            swiped={swiped}
          >
            {first.replace(/^#/g, '').trim() || 'New Note'}
            <ListItemSecondaryText>
              {moment(note.createdAt).format('D/M/YY')}
              &nbsp;{secondLine && secondLine.replace(/^#+/g, '').trim()}
            </ListItemSecondaryText>
          </StyledListItemText>
          <DeleteButton
            onClick={this.handleDeletePress}
            swiped={swiped}
          >
            <Icon use="delete" />
          </DeleteButton>
        </StyledListItem>
        <ListDivider />

      </Swipeable>
    );
  }
}

export default NotesListItem;
