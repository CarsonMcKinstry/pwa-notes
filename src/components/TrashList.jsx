import React, { Component, Fragment } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {
  List,
  ListItem,
  ListDivider,
  ListItemText,
  ListItemGraphic,
  ListItemSecondaryText
} from 'rmwc/List';

import { Checkbox } from 'rmwc/Checkbox';
import { Fab } from 'rmwc/Fab';
import { MenuAnchor, Menu, MenuItem } from 'rmwc/Menu';
import db from '../db';

const OpenMenu = styled(Fab)`
  background-color: ${({ theme }) => theme.secondary.base}!important;
  color: #fff!important;
  position: fixed!important;
  bottom: 12px;
  right: 12px;
`;

const PlacedMenu = styled(MenuAnchor)`
  background: transparent;
  position: fixed!important;
  bottom: 56px;
  right: 12px;
`;

// const StyledCheckbox = styled(Checkbox)`

// `;

class TrashList extends Component {
  state = {
    notes: [],
    selected: [],
    menuOpen: false,
    loading: true
  }

  componentWillMount() {
    const { setTitle } = this.props;
    setTitle('Trash');
    db.getTrash(null)
      .then(notes => this.setState({ notes, loading: false }));
  }

  handleSelect = (id) => {
    const { selected } = this.state;

    if (selected.includes(id)) {
      this.setState({
        selected: selected.filter(note => note !== id)
      });
    } else {
      this.setState({
        selected: [
          ...selected,
          id
        ]
      });
    }
  }

  deleteAll = () => {
    if (confirm('This will permanently delete these notes. Are you sure?')) { // eslint-disable-line
      db.collectTrash(null)
        .then(() => this.setState({ loading: true }))
        .then(db.getTrash)
        .then(notes => this.setState({ notes, loading: false }));
    }
  }

  deleteSelected = () => {
    const { selected } = this.state;
    if (
      selected.length > 0
      && confirm('This will permanently delete these notes. Are you sure?') // eslint-disable-line
    ) {
      Promise.all(selected.map(db.deleteNote))
        .then(() => this.setState({ loading: true }))
        .then(db.getTrash)
        .then(notes => this.setState({ notes, loading: false }));
    }
  }

  recoverSelected = () => {
    const { selected } = this.state;
    if (selected.length > 0) {
      Promise.all(selected.map(db.recoverNote))
        .then(() => this.setState({ loading: true }))
        .then(db.getTrash)
        .then(notes => this.setState({ notes, menuOpen: false, loading: false }));
    }
  }

  renderList = () => {
    const { selected, notes } = this.state;
    if (notes.length < 1) {
      return (
        <h1>
          Nope
        </h1>
      );
    }
    return notes.map((note) => {
      const [first, secondLine] = note.body.split(/\.|\n\n/g);

      return (
        <Fragment key={note.id}>
          <ListItem
            onClick={() => this.handleSelect(note.id)}
          >
            <Checkbox checked={selected.includes(note.id)} />
            <ListItemText>
              {first.replace(/^#/g, '').trim() || 'New Note'}
              <ListItemSecondaryText>
                {moment(note.createdAt).format('D/M/YY')}
                &nbsp;{secondLine && secondLine.replace(/^#+/g, '').trim()}
              </ListItemSecondaryText>
            </ListItemText>
          </ListItem>
          <ListDivider />
        </Fragment>
      );
    });
  }

  render() {
    const { menuOpen, loading } = this.state;
    if (loading) {
      return (
        <p>
          Loading
        </p>
      );
    }
    return (
      <Fragment>
        <List>
          { this.renderList() }
        </List>
        <PlacedMenu>
          <Menu
            open={menuOpen}
            onClose={() => this.setState({ menuOpen: false })}
          >
            <MenuItem
              onClick={this.recoverSelected}
            >
              <ListItemGraphic use="cached" />
              <ListItemText>
                Recover Selected
              </ListItemText>
            </MenuItem>
            <ListDivider />
            <MenuItem
              onClick={this.deleteSelected}
            >
              <ListItemGraphic use="delete_outline" />
              <ListItemText>
                Delete Selected
              </ListItemText>
            </MenuItem>
            <MenuItem
              onClick={this.deleteAll}
            >
              <ListItemGraphic use="delete_forever" />
              <ListItemText>
                Delete All
              </ListItemText>
            </MenuItem>
          </Menu>
          <OpenMenu mini onClick={() => this.setState({ menuOpen: !menuOpen })}>
           menu
          </OpenMenu>
        </PlacedMenu>
      </Fragment>
    );
  }
}

export default TrashList;
