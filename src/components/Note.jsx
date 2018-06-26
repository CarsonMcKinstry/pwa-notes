import React, { Component } from 'react';
import faker from 'faker';
import moment from 'moment';
import { Icon } from 'rmwc/Icon';
import { ListDivider, ListItemText, ListItemGraphic } from 'rmwc/List';
import { Menu, MenuItem } from 'rmwc/Menu';

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
    note: faker.lorem.paragraphs(5),
    menuOpen: false,
    editing: false
  }

  componentWillMount() {
    const { setTitle } = this.props;
    setTitle('Note');
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
      note,
      isSaving,
      menuOpen,
      editing
    } = this.state;

    return (
      <NotePage
        onSwipedRight={this.handleSwipeRight}
      >
        <NoteTopBar>
          <NoteDate>
            { moment().format('ddd, D MMM. \'YY @ H:mm')}
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
