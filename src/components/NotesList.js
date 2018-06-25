import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import { Fab } from 'rmwc/Fab';
import NotesListItem from './NotesListItem';
import { List } from 'rmwc/List';

const AddNote = styled(Fab)`
  background-color: ${props => props.theme.secondary.base}!important;
  color: #fff!important;
  position: fixed!important;
  bottom: 12px;
  right: 12px;
`

const FabFix = styled.div`
  padding-top: 72px;
`

class NotesList extends Component {
  
  state = {
    swipedItem: null
  }
  
  componentWillMount() {
    this.props.setTitle('PWA Notes');
  }

  handleNotePress = (id) => {
    this.props.history.push(`/notes/${id}`);
  }

  handleDeletePress = (id) => {
    console.log(id);
  }

  renderList = () => this.props.notes.map(note => (
    <NotesListItem 
      onClick={this.handleNotePress}
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
      <Fragment>
        <List>
          {this.renderList()}
        </List>
        <FabFix/>
        <AddNote>add</AddNote>
      </Fragment>
    );
  }
}

NotesList.propTypes = {}

export default NotesList;