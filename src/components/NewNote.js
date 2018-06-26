import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
  NotePage,
  NoteTopBar,
  NoteDate,
  NoteArea,
  NoteStatusIcons,
  SavingIcon,
  StyledMarkdown,
  PlacedMenu,
  OpenMenu,
  debounce
 } from './Note';
import moment from 'moment';
import { Icon } from 'rmwc/Icon';

import { Fab } from 'rmwc/Fab';
import { Menu, MenuAnchor, MenuItem } from 'rmwc/Menu';
import { ListDivider, ListItemText, ListItemGraphic } from 'rmwc';

class NewNote extends Component {

  state = {
    isSaving: false,
    menuOpen: false,
    editing: true,
    note: '',
    currentDate: moment().format('ddd, D MMM. \'YY @ H:mm')
  }

  componentWillMount() {
    this.props.setTitle('New Note');
  }

  handleSwipeRight = (e, d, f) => {
    if (f) {
      this.props.history.go(-1);
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
        })
      }, 3000);
    })
  }

  render(){
    return(
      <NotePage
        onSwipedRight={this.handleSwipeRight}
      >
        <NoteTopBar>
          <NoteDate>
            { this.state.currentDate }
          </NoteDate>
          <NoteStatusIcons>
          <Icon 
              onClick={e => this.setState({editing: !this.state.editing})}
              use={ this.state.editing ? 'edit' : 'remove_red_eye'}
            />
            <SavingIcon 
              isSaving={this.state.isSaving} 
              use={this.state.isSaving ? 'autorenew' : 'done'}
            />
          </NoteStatusIcons>
        </NoteTopBar>
        {
          this.state.editing
            ? <NoteArea 
                value={this.state.note}
                debounceTimeout={1000}
                onChange={this.handleNoteChange}
              />
            : <StyledMarkdown source={this.state.note}/>
        }
        <PlacedMenu element="span">
          <Menu
            open={this.state.menuOpen}
            onClose={e => this.setState({menuOpen: false})}
          >
            <MenuItem onClick={e => this.setState({editing: !this.state.editing})}>
              <ListItemGraphic use={ this.state.editing ? 'edit' : 'remove_red_eye'} />
              <ListItemText>{ this.state.editing ? 'View' : 'Edit' }</ListItemText>
            </MenuItem>
            <ListDivider/>
            <MenuItem>
              <ListItemGraphic use="delete"/>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
          <OpenMenu mini onClick={e => this.setState({menuOpen: !this.state.menuOpen})}>menu</OpenMenu>
        </PlacedMenu>
      </NotePage>
    );
  }
}

NewNote.propTypes = {}

export default NewNote;