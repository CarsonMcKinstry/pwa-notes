/* global navigator */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
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
import { ListItemText, ListItemGraphic, ListDivider } from 'rmwc/List';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;
`;

const TopAppBarTitleSection = styled(TopAppBarSection)`

`;

const BackPlaceholder = styled.div`
  height: 36px;
  width: 36px;
`;

class AppBar extends Component {
  state = {
    menuOpen: false,
  }

  needsBackButton = () => {
    const { location } = this.props;

    return location.url !== '/';
  }

  render() {
    const {
      history,
    } = this.props;
    const {
      menuOpen,
      title
    } = this.state;
    return (
      <Fragment>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              { this.needsBackButton()
                ? (
                  <TopAppBarNavigationIcon
                    onClick={() => history.go(-1)}
                    use={navigator.userAgent.includes('Mac OS X') ? 'arrow_back_ios' : 'arrow_back'}
                  />
                )
                : <BackPlaceholder />
              }
            </TopAppBarSection>
            <TopAppBarTitleSection>
              <TopAppBarTitle>
                {title}
              </TopAppBarTitle>
            </TopAppBarTitleSection>
            <TopAppBarSection alignEnd>
              <MenuAnchor>
                <Menu
                  open={menuOpen}
                  onClose={_ => this.setState({ menuOpen: false })} //eslint-disable-line
                >
                  <StyledLink to="/">
                    <MenuItem onClick={() => this.setState({ menuOpen: false })}>
                      <ListItemGraphic use="insert_drive_file" />
                      <ListItemText>
                        Notes
                      </ListItemText>
                    </MenuItem>
                  </StyledLink>
                  <ListDivider />
                  <StyledLink to="/trash">
                    <MenuItem onClick={() => this.setState({ menuOpen: false })}>
                      <ListItemGraphic use="delete" />
                      <ListItemText>
                        Trash
                      </ListItemText>
                    </MenuItem>
                  </StyledLink>
                </Menu>

                <TopAppBarActionItem
                  onClick={_ => this.setState({ menuOpen: true })} //eslint-disable-line
                >
                  { navigator.userAgent.includes('Mac OS X') ? 'more_horiz' : 'more_vert' }
                </TopAppBarActionItem>
              </MenuAnchor>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </Fragment>
    );
  }
}

export default withRouter(AppBar);
