import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import {
  List,
  ListItem,
  ListDivider,
  ListItemText,
  ListItemGraphic
} from 'rmwc/List';

import { Checkbox } from 'rmwc/Checkbox';
import { Fab } from 'rmwc/Fab';
import { MenuAnchor, Menu, MenuItem } from 'rmwc/Menu';

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
    selected: [],
    menuOpen: false
  }

  componentWillMount() {
    const { setTitle } = this.props;
    setTitle('Trash');
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

  renderList = () => {
    const { notes } = this.props;
    const { selected } = this.state;
    return notes.map((note) => {
      const [first] = note.body.split('.');

      return (
        <Fragment key={note.id}>
          <ListItem
            onClick={() => this.handleSelect(note.id)}
          >
            <Checkbox checked={selected.includes(note.id)} />
            <ListItemText>
              { first }
            </ListItemText>
          </ListItem>
          <ListDivider />
        </Fragment>
      );
    });
  }

  render() {
    const { menuOpen } = this.state;

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
            <MenuItem>
              <ListItemGraphic use="cached" />
              <ListItemText>
                Recover Selected
              </ListItemText>
            </MenuItem>
            <ListDivider />
            <MenuItem>
              <ListItemGraphic use="delete_outline" />
              <ListItemText>
                Delete Selected
              </ListItemText>
            </MenuItem>
            <MenuItem>
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
