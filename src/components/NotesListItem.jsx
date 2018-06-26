import React, { Component } from 'react';
import styled from 'styled-components';
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

const StyledListItem = styled(({ swiped, ...props }) => <ListItem {...props} />)`
  padding-bottom: 6px!important;
`;

class NotesListItem extends Component {
  defaultProps = {

  }

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
    const { onSwipe, notes: { id } } = this.props;
    onSwipe(id);
  }

  handleSwipeRight = () => {
    const { onSwipe } = this.props;
    onSwipe(null);
  }

  render() {
    const { note, swiped } = this.props;

    const [first, secondLine] = note.body.split('.');

    return (
      <Swipeable
        onSwipedRight={this.handleSwipeRight}
        onSwipedLeft={this.handleSwipeLeft}
      >
        <StyledListItem onClick={this.handleItemPress}>
          <StyledListItemText
            swiped={swiped}
          >
            {first.replace(/^#/g, '')}
            <ListItemSecondaryText>
              {moment(note.createdAt).format('D/M/YY')}
              -
              {secondLine}
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
