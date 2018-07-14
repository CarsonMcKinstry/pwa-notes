import React from 'react';
import styled from 'styled-components';

const TransitionWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  z-index: 1;
  height: 100%;
  
  &.slide-forward-enter {
    transform: translateX(100%);
    opacity: 0;
    z-index: 1;
    &.slide-forward-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: all 250ms ease-in;
    }
  }

  &.slide-forward-exit {
    transform: translateX(0);
    opacity: 1;
    z-index: 1;
    &.slide-forward-exit-active {
      opacity: 0;
      transform: translateX(100%);
      transition: all 250ms ease-in;
    }
  }

  &.slide-backward-enter {
    transform: translate(-100%);
    z-index: 100;
    &.slide-backward-enter-active {
      transform: translate(0);
      transition: all 250ms ease-in;
    }
  }

  &.slide-backward-exit {
    transform: translate(0);
    z-index: 100;
    &.slide-backward-exit-active {
      transform: translate(-100%);
      transition: all 250ms ease-in;
    }
  }

`;

export default Component => props => (
  <TransitionWrapper>
    <Component {...props} />
  </TransitionWrapper>
);
