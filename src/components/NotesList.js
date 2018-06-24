import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';

import NotesListItem from './NotesListItem';
import { List } from 'rmwc/List';

class NotesList extends Component {
  
  handleDeletePress = (id) => {
    console.log(id);
  }

  renderList = () => this.props.notes.map(note => (
    <NotesListItem 
      onDelete={this.handleDeletePress} 
      key={note.id} 
      note={note}
    />
  ));

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