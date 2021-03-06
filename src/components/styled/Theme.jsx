/* eslint-disable no-unused-expressions */
import React from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';

export const baseTheme = {
  primary: {
    base: '#0d47a1',
    light: '#5472d3',
    dark: '#002171'
  },
  secondary: {
    base: '#81c784',
    light: '#b2fab4',
    dark: '#519657'
  },
  danger: {
    base: '#f44336',
    light: '#ff7961',
    dark: '#ba000d'
  }
};
const breakpoint = '600px';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto|Material+Icons');

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    height: 100%;
  }

  #root {
    height: 100%;
    position: relative;
    &> div {
      position: inherit;
      &:last-child {
        height: calc(100% - 56px);
        @media screen and (min-width: ${breakpoint}) {
          height: calc(100% - 64px);
        }
      }
    }
    @media (display-mode: standalone) {
      margin-top: 36px;
    }
  }
  
  :root {
    --mdc-theme-primary: ${baseTheme.primary.base}!important;
    --mdc-theme-secondary: ${baseTheme.secondary.base}!important;
  }

  .statusbar {
    height: 36px;
    width: 100%;
    position: fixed;
    margin-top: -36px;
    background-color: ${baseTheme.primary.base};
  }

`;

const Theme = ({ children, theme }) => (
  <ThemeProvider
    theme={{
      ...theme,
      ...baseTheme
    }}
  >
    {children}
  </ThemeProvider>
);

export default Theme;
