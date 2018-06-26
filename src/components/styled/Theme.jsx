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
  }
  
  :root {
    --mdc-theme-primary: ${baseTheme.primary.base}!important;
    --mdc-theme-secondary: ${baseTheme.secondary.base}!important;
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
