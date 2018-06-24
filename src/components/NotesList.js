import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';

import {
  List,
  SimpleListItem,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemSecondaryText,
  ListItemText,
  ListDivider,
} from 'rmwc/List';
import { Icon } from 'rmwc/Icon';

// this needs to be transformed into a 

const Test = styled.span`
  width: 48px;
  height: 48px;
  background-color: red;
  position: absolute;
  right: 0;
  ${'' /* transform: translate(48px); */}
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const StyledListItemText = styled(ListItemText)`
  transform: translateX(-48px);
  ${'' /* overflow: visible!important; */}
`

const StyledIcon = styled(Icon)`
  color: #fff;
`

class NotesList extends Component {

  renderList = () => {
    const { notes } = this.props;

    // these can be made swipeable
    // this will also be its own component, in order to handle the swipe and state stuff
    return notes.map(note => {
      return (
        <Fragment>
          <ListItem onClick={() => console.log('item clicked')}>
            <StyledListItemText>
              {note.title}
              <ListItemSecondaryText>Hello Date</ListItemSecondaryText>
            </StyledListItemText>
            <Test onClick={e => {
              e.stopPropagation();
              console.log('delete clicked');
            }}>
              <StyledIcon use="delete"/>
            </Test>
          </ListItem>
          <ListDivider/>
        </Fragment>
      )
    });
  }

  render(){
    return(
      <List>
        {this.renderList()}
      </List>
    );
  }
}

NotesList.propTypes = {}

export default NotesList;