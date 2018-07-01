import React, { Component } from 'react';
import moment from 'moment';
import { Icon } from 'rmwc/Icon';
import { ListDivider, ListItemText, ListItemGraphic } from 'rmwc/List';
import { Menu, MenuItem } from 'rmwc/Menu';
import db from '../db';

import {
  NotePage,
  NoteTopBar,
  NoteDate,
  NoteStatusIcons,
  SavingIcon,
  NoteArea,
  StyledMarkdown,
  PlacedMenu,
  OpenMenu
} from './styled/NotePage';


class Note extends Component {
  state = {
    isSaving: false,
    note: null,
    menuOpen: false,
    editing: false
  }

  componentWillMount() {
    const { setTitle, match: { params: { id } } } = this.props;
    setTitle('Note');

    db.getNote(id)
      .then(note => this.setState({ note }));
  }

  handleSwipeRight = (e, d, f) => {
    const { history } = this.props;
    if (f) {
      history.go(-1);
    }
  }

  handleNoteChange = (e) => {
    e.persist();
    this.setState(
      prevState => ({
        note: {
          ...prevState.note,
          body: e.target.value,
        },
        isSaving: true
      }),
      () => {
        const { note } = this.state;
        db.updateNote(note.id, note.body)
          .then(() => {
            setTimeout(() => {
              this.setState({
                isSaving: false
              });
            }, 1500);
          });
      }
    );
  }

  handleNoteClick = e => {
    console.log(e);
    if (e.target.nodeName !== 'A') {
      this.setState({
        editing: true
      });
    }
  }

  render() {
    const {
      note,
      isSaving,
      menuOpen,
      editing
    } = this.state;

    if (!note) return null;

    return (
      <NotePage
        onSwipedRight={this.handleSwipeRight}
      >
        <NoteTopBar>
          <NoteDate>
            { moment(note.createdAt).format('ddd, D MMM. \'YY @ H:mm')}
          </NoteDate>
          <NoteStatusIcons>
            <Icon
              onClick={() => this.setState({ editing: !editing })}
              use={editing ? 'edit' : 'remove_red_eye'}
            />
            <SavingIcon
              isSaving={isSaving}
              use={isSaving ? 'autorenew' : 'done'}
            />
          </NoteStatusIcons>
        </NoteTopBar>
        {
          editing
            ? (
              <NoteArea
                value={note.body}
                debounceTimeout={1000}
                onChange={this.handleNoteChange}
              />
            )
            : (
              <div
                onClick={this.handleNoteClick}
                onKeyDown={this.handleNoteClick}
                role="textbox"
                tabIndex={0}
              >
                <StyledMarkdown
                  source={note.body}
                />
              </div>
            )
        }
        <PlacedMenu element="span">
          <Menu
            open={menuOpen}
            onClose={() => this.setState({ menuOpen: false })}
          >
            <MenuItem onClick={() => this.setState({ editing: !editing })}>
              <ListItemGraphic use={editing ? 'edit' : 'remove_red_eye'} />
              <ListItemText>
                {editing ? 'View' : 'Edit' }
              </ListItemText>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <ListItemGraphic use="delete" />
              <ListItemText>
                Delete
              </ListItemText>
            </MenuItem>
          </Menu>
          <OpenMenu mini onClick={() => this.setState({ menuOpen: !menuOpen })}>
            menu
          </OpenMenu>
        </PlacedMenu>
      </NotePage>
    );
  }
}

export default Note;
