import React from 'react';
import DebouncedInput from 'react-debounce-input';
import { Fab } from 'rmwc/Fab';
import { MenuAnchor } from 'rmwc/Menu';
import { Icon } from 'rmwc/Icon';
import Markdown from 'react-markdown';
import Swipeable from 'react-swipeable';
import styled, { keyframes } from 'styled-components';

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
  .markdown-wrapper {
    height: calc(100% - 36px);
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
  height: calc(100% - 36px);
`;
