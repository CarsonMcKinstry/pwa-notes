import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import {
  List,
  ListItem, 
  ListDivider,
  ListItemText
} from 'rmwc/List';

import { Checkbox } from 'rmwc/Checkbox';
import { Fab } from 'rmwc/Fab';
import { MenuAnchor, Menu, MenuItem } from 'rmwc/Menu';

const OpenMenu = styled(Fab)`
  background-color: ${ props => props.theme.secondary.base }!important;
  color: #fff!important;
  position: fixed!important;
  bottom: 12px;
  right: 12px;
`

const PlacedMenu = styled(MenuAnchor)`
  background: transparent;
  position: fixed!important;
  bottom: 56px;
  right: 12px;
`

const StyledCheckbox = styled(Checkbox)`

`

class TrashList extends Component {

  state = {
    selected: [],
    menuOpen: false
  }

  componentWillMount() {
    this.props.setTitle('Trash')
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
      })
    }
  }

  renderList = () => {
    const { notes } = this.props;

    return notes.map(note => {
      const [ first, ...rest ] = note.body.split('.');

      return ( 
        <Fragment key={note.id}>
          <ListItem
            onClick={() => this.handleSelect(note.id)}
          >
            <Checkbox checked={this.state.selected.includes(note.id)}/>
            <ListItemText>
              { first }
            </ListItemText>
          </ListItem>
          <ListDivider/>
        </Fragment>
      )
    })
  }

  render(){
    return(
      <Fragment>
        <List>
          { this.renderList() }
        </List>
        <PlacedMenu>
          <Menu
            open={this.state.menuOpen}
            onClose={e => this.setState({menuOpen: false})}
          >
            <MenuItem>Delete Selected</MenuItem>
            <MenuItem>Delete All</MenuItem>
          </Menu>
          <OpenMenu mini onClick={e => this.setState({menuOpen: !this.state.menuOpen})}>delete_forever</OpenMenu>
        </PlacedMenu>
      </Fragment>
    );
  }
}

TrashList.propTypes = {}

export default TrashList;