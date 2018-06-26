import React, { Component } from 'react';
import { Menu, MenuItem } from 'rmwc/Menu';
import { ListDivider, ListItemText, ListItemGraphic } from 'rmwc';
import { Icon } from 'rmwc/Icon';
import moment from 'moment';
import {
  NotePage,
  NoteTopBar,
  NoteDate,
  NoteArea,
  NoteStatusIcons,
  SavingIcon,
  StyledMarkdown,
  PlacedMenu,
  OpenMenu
} from './Note';

class NewNote extends Component {
  state = {
    isSaving: false,
    menuOpen: false,
    editing: true,
    note: '',
    currentDate: moment().format('ddd, D MMM. \'YY @ H:mm')
  }

  componentWillMount() {
    const { setTitle } = this.props;
    setTitle('New Note');
  }

  handleSwipeRight = (e, d, f) => {
    const { history } = this.props;
    if (f) {
      history.go(-1);
    }
  }

  handleNoteChange = (e) => {
    e.persist();
    this.setState({
      note: e.target.value,
      isSaving: true
    }, () => {
      setTimeout(() => {
        this.setState({
          isSaving: false
        });
      }, 3000);
    });
  }

  render() {
    const {
      currentDate,
      editing,
      isSaving,
      note,
      menuOpen
    } = this.state;

    return (
      <NotePage
        onSwipedRight={this.handleSwipeRight}
      >
        <NoteTopBar>
          <NoteDate>
            { currentDate }
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
                value={note}
                debounceTimeout={1000}
                onChange={this.handleNoteChange}
              />
            )
            : <StyledMarkdown source={note} />
        }
        <PlacedMenu element="span">
          <Menu
            open={menuOpen}
            onClose={() => this.setState({ menuOpen: false })}
          >
            <MenuItem onClick={() => this.setState({ editing: !editing })}>
              <ListItemGraphic use={editing ? 'edit' : 'remove_red_eye'} />
              <ListItemText>
                {editing ? 'View' : 'Edit'}
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

export default NewNote;
