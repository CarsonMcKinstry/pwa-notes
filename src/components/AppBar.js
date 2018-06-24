import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';

import {
  TopAppBar, 
  TopAppBarRow, 
  TopAppBarFixedAdjust,
  TopAppBarActionItem,
  TopAppBarNavigationIcon,
  TopAppBarSection,
  TopAppBarTitle
} from 'rmwc/TopAppBar';

import {
  MenuAnchor, Menu, MenuItem
} from 'rmwc/Menu';
import { Icon } from 'rmwc/Icon';
import { ListItem, ListItemText, ListItemGraphic, ListDivider } from 'rmwc/List';

const TopAppBarTitleSection = styled(TopAppBarSection)`

`

class AppBar extends Component {

  state = {
    menuOpen: false
  }

  render(){
    return(
      <Fragment>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon use={navigator.userAgent.includes('Mac OS X') ? 'arrow_back_ios' : 'arrow_back'}/>
            </TopAppBarSection>
            <TopAppBarTitleSection>
              <TopAppBarTitle>
                PWA Notes
              </TopAppBarTitle>
            </TopAppBarTitleSection>
            <TopAppBarSection alignEnd>
              <MenuAnchor>
                <Menu
                  open={this.state.menuOpen}
                  onClose={_ => this.setState({menuOpen: false})}
                >
                  <MenuItem>
                    <ListItemGraphic use="home"/>
                    <ListItemText>Home</ListItemText>
                  </MenuItem>
                  <ListDivider/>
                  <MenuItem>
                    <ListItemGraphic use="delete"/>
                    <ListItemText>Trash</ListItemText>
                  </MenuItem>
                </Menu>

                <TopAppBarActionItem
                  onClick={_ => this.setState({menuOpen: true})}
                >
                  { navigator.userAgent.includes('Mac OS X') ? 'more_horiz' : 'more_vert' } 
                </TopAppBarActionItem>
              </MenuAnchor>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>
      </Fragment>
    );
  }
}

AppBar.propTypes = {}

export default AppBar;