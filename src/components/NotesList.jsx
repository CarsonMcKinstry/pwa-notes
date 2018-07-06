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
    swipedItem: null,
    deletedItem: null,
    loading: true
  }

  componentWillMount() {
    const { setTitle } = this.props;
    setTitle('PWA Notes');
    db.getAllNotes(null)
      .then(notes => {
        this.setState({ notes, loading: false });
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
      .then(id => history.push(`/notes/${id}?isNew=1`));
  }

  handleDeletePress = id => {
    this.setState({
      deletedItem: id
    }, () => {
      setTimeout(() => {
        db.trashNote(id)
          .then(db.getAllNotes)
          .then(notes => this.setState({ notes, deletedItem: null }));
      }, 400);
    });
  }

  renderList = () => {
    const { swipedItem, deletedItem, notes } = this.state;
    if (notes.length < 1) {
      return (
        <h1>
          Nope
        </h1>
      );
    }
    return notes.map(note => (
      <NotesListItem
        deleting={note.id === deletedItem}
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
    const { loading } = this.state;
    if (loading) {
      return (
        <p>
          loading
        </p>
      );
    }
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
