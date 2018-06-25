import React, {Component,Fragment} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import Swipeable from 'react-swipeable';
import moment from 'moment';

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
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: ${ props => props.theme.danger.base };
  position: absolute;
  right: 0;
  transform: translateX(${props => props.swiped ? '0' : '60px'});
  z-index: 1000;
  transition: ${transition};
`;

const StyledListItemText = styled(({swiped, ...props}) => <ListItemText {...props}/>)`
  transition: ${transition};
  transform: translateX(${props => props.swiped ? '-60px' : 0});
`

const StyledListItem = styled(({swiped, ...props}) => <ListItem {...props}/>)`
  padding-bottom: 6px!important;
`

class NotesListItem extends Component {

  handleDeletePress = (e) => {
    const { note } = this.props;
    e.stopPropagation();
    this.props.onDelete(note.id);
  }

  handleItemPress = (e) => {
    this.props.onClick(this.props.note.id);
  }

  handleSwipeLeft = (e, d, f) => {
    this.props.onSwipe(this.props.note.id)
  }

  handleSwipeRight = (e, d, f) => {
    this.props.onSwipe(null);
  }

  render(){

    const { note } = this.props;

    const [ first, secondLine, ...rest] = note.body.split('.');

    return(
      <Swipeable
        onSwipedRight={this.handleSwipeRight}
        onSwipedLeft={this.handleSwipeLeft}
      >
        <StyledListItem onClick={this.handleItemPress}>
          <StyledListItemText
            swiped={this.props.swiped}
          >
            {first.replace(/^#/g, '')}
            <ListItemSecondaryText>
              {moment(note.createdAt).format('D/M/YY')} - {secondLine}
            </ListItemSecondaryText>
          </StyledListItemText>
          <DeleteButton 
            onClick={this.handleDeletePress}
            swiped={this.props.swiped}
          >
            <Icon use="delete"/>
          </DeleteButton>
        </StyledListItem>
        <ListDivider/>

      </Swipeable>
    );
  }
}

NotesListItem.propTypes = {}

export default NotesListItem;