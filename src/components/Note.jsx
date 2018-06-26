import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import styled, { keyframes } from 'styled-components';
import { Icon } from 'rmwc/Icon';
import faker from 'faker';
import moment from 'moment';
import DebouncedInput from 'react-debounce-input';
import { Fab } from 'rmwc/Fab';
import { Menu, MenuAnchor, MenuItem } from 'rmwc/Menu';
import { ListDivider, ListItemText, ListItemGraphic } from 'rmwc/List';
import Markdown from 'react-markdown';

const breakpoint = '600px';

const savingAnimation = keyframes`
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
`;

export const SavingIcon = styled(({ isSaving, ...props }) => <Icon {...props} />)`
  animation-direction: forwards;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-duration: 1s;
  animation-name: ${({ isSaving }) => isSaving ? savingAnimation : null};
  margin-left: 6px;
`;

export const NotePage = styled(Swipeable)`
  position: relative;
  height: calc(100% - 56px);
  @media screen and (min-width: ${breakpoint}) {
    height: calc(100% - 64px);
  }
`;

export const NoteTopBar = styled.div`
  position: relative;
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

export const NoteArea = styled(props => <DebouncedInput {...props} element="textarea" />)`
  resize: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  line-height: 1.5;
  height: calc(100% - 36px);
  box-sizing: border-box;
  padding: 6px 12px 48px;
  width: 100%;
  border: 0;
  &:focus {
    outline: 0;
    border: 0;
  }
`;

export const NoteDate = styled.p`
  color: rgba(0,0,0,0.54);
  font-size: 90%;
`;

export const NoteStatusIcons = styled.div`
  color: rgba(0,0,0,0.54);
`;

export const OpenMenu = styled(Fab)`
  background-color: ${({ theme }) => theme.secondary.base}!important;
  color: #fff!important;
  position: fixed!important;
  bottom: 12px;
  right: 12px;
`;

export const PlacedMenu = styled(MenuAnchor)`
  background: transparent;
  position: fixed!important;
  bottom: 56px;
  right: 12px;
`;

export const StyledMarkdown = styled(Markdown)`
  padding: 6px 12px 48px;
  font-size: 1em;
  line-height: 1.5;
  box-sizing: border-box;
`;

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
