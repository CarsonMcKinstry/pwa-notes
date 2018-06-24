import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';

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

class NotesList extends Component {

  renderList = () => {
    const { notes } = this.props;

    return notes.map(note => {
      return (
        <Fragment>
          <ListItem>
            <ListItemText>
              {note.title}
              <ListItemSecondaryText>Hello Date</ListItemSecondaryText>
            </ListItemText>
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