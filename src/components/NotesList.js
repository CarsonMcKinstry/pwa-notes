import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';

import NotesListItem from './NotesListItem';
import { List } from 'rmwc/List';

class NotesList extends Component {
  
  state = {
    swipedItem: null
  }

  handleDeletePress = (id) => {
    console.log(id);
  }

  renderList = () => this.props.notes.map(note => (
    <NotesListItem 
      onDelete={this.handleDeletePress} 
      onSwipe={this.setSwipedItem}
      swiped={ note.id === this.state.swipedItem }
      key={note.id} 
      note={note}
    />
  ));

  setSwipedItem = (id) => {
    this.setState({
      swipedItem: id
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