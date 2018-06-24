import React, {Component,Fragment} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import Swipeable from 'react-swipeable';

import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemSecondaryText,
  ListItemText,
  ListDivider,
} from 'rmwc/List';
import { Icon } from 'rmwc/Icon';

const transition = 'transform 0.3s cubic-bezier(0, 0, .2, 1)'

const DeleteButton = styled.div`
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: ${ props => props.theme.danger.base };
  position: absolute;
  right: 0;
  transform: translateX(${props => props.swiped ? '0' : '48px'});
  z-index: 1000;
  transition: ${transition};
`;

const StyledListItemText = styled(({swiped, ...props}) => <ListItemText {...props}/>)`
  transition: ${transition};
  transform: translateX(${props => props.swiped ? '-48px' : 0});
`

class NotesListItem extends Component {

  handleDeletePress = (e) => {
    const { note } = this.props;
    e.stopPropagation();
    this.props.onDelete(note.id);
  }

  handleItemPress = (e) => {
    // this will eventually be for linking to the next page
  }

  handleSwipeLeft = (e, d, f) => {
    this.props.onSwipe(this.props.note.id)
  }

  handleSwipeRight = (e, d, f) => {
    this.props.onSwipe(null);
  }

  render(){
    return(
      <Swipeable
        onSwipedRight={this.handleSwipeRight}
        onSwipedLeft={this.handleSwipeLeft}
      >
        <ListItem onClick={this.handleItemPress}>
          <StyledListItemText
            swiped={this.props.swiped}
          >
            {this.props.note.title}
            <ListItemSecondaryText>Hello Date</ListItemSecondaryText>
          </StyledListItemText>
          <DeleteButton 
            onClick={this.handleDeletePress}
            swiped={this.props.swiped}
          >
            <Icon use="delete"/>
          </DeleteButton>
        </ListItem>
        <ListDivider/>

      </Swipeable>
    );
  }
}

NotesListItem.propTypes = {}

export default NotesListItem;