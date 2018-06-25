import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
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
import { Icon } from 'rmwc/Icon';
import { ListItem, ListItemText, ListItemGraphic, ListDivider } from 'rmwc/List';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;
`

const TopAppBarTitleSection = styled(TopAppBarSection)`

`

const BackPlaceholder = styled.div`
  height: 36px;
  width: 36px;
`

class AppBar extends Component {

  state = {
    menuOpen: false,
    hasBackButton: false
  }

  componentWillMount() {
    if (this.props.location.pathname !== '/') {
      this.setState({hasBackButton: true})
    }

    console.log(this.props);
  }

  componentWillReceiveProps(next) {
    if (
        this.props.location.pathname !== next.location.pathname
        && next.location.pathname !== '/'
      ) {
      this.setState({ hasBackButton: true });
    } else if (next.location.pathname === '/') {
      this.setState({ hasBackButton: false });
    }
  }

  render(){
    return(
      <Fragment>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              { this.state.hasBackButton 
                ? <TopAppBarNavigationIcon 
                    onClick={() => this.props.history.go(-1)}
                    use={navigator.userAgent.includes('Mac OS X') ? 'arrow_back_ios' : 'arrow_back'}
                  />
                : <BackPlaceholder/>
              }
            </TopAppBarSection>
            <TopAppBarTitleSection>
              <TopAppBarTitle>
                { this.props.title }
              </TopAppBarTitle>
            </TopAppBarTitleSection>
            <TopAppBarSection alignEnd>
              <MenuAnchor>
                <Menu
                  open={this.state.menuOpen}
                  onClose={_ => this.setState({menuOpen: false})}
                >
                  <StyledLink to="/">
                    <MenuItem onClick={() => this.setState({menuOpen: false})}>
                      <ListItemGraphic use="insert_drive_file"/>
                      <ListItemText>Notes</ListItemText>
                    </MenuItem>
                  </StyledLink>
                  <ListDivider/>
                  <StyledLink to="/trash">
                    <MenuItem onClick={() => this.setState({menuOpen: false})}>
                      <ListItemGraphic use="delete"/>
                      <ListItemText>Trash</ListItemText>
                    </MenuItem>
                  </StyledLink>
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

export default withRouter(AppBar);