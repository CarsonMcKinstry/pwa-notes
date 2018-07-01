import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Fab } from 'rmwc/Fab';
import { List } from 'rmwc/List';
import NotesListItem from './NotesListItem';
import db from '../db';

const AddNote = styled(Fab)`
  background-color: ${({ theme }) => theme.secondary.base}!important;
  color: #fff!important;
  position: fixed!important;
  bottom: 12px;
  right: 12px;
`;

const FabFix = styled.div`
  padding-top: 72px;
`;

class NotesList extends Component {
  state = {
    notes: [],
    swipedItem: null
  }

  componentWillMount() {
    const { setTitle } = this.props;
    setTitle('PWA Notes');
    db.getAllNotes(null)
      .then(notes => {
        this.setState({ notes });
      });
  }

  setSwipedItem = (id) => {
    this.setState({
      swipedItem: id
    });
  }

  handleNotePress = (id) => {
    const { history } = this.props;
    history.push(`/notes/${id}`);
  }

  addNewNote = () => {
    const { history } = this.props;
    db.createNote('')
      .then(id => history.push(`/notes/${id}`));
  }


  renderList = () => {
    const { swipedItem, notes } = this.state;
    return notes.map(note => (
      <NotesListItem
        onClick={this.handleNotePress}
        onDelete={this.handleDeletePress}
        onSwipe={this.setSwipedItem}
        swiped={note.id === swipedItem}
        key={note.id}
        note={note}
      />
    ));
  }


  render() {
    return (
      <Fragment>
        <List>
          {this.renderList()}
        </List>
        <FabFix />
        <AddNote
          onClick={this.addNewNote}
        >
          add
        </AddNote>
      </Fragment>
    );
  }
}

export default NotesList;
