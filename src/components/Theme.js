import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
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
}

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
    --mdc-theme-primary: ${theme.primary.base}!important;
    --mdc-theme-secondary: ${theme.secondary.base}!important;
  }

`


const Theme = ({children, ...props}) => (
  <ThemeProvider theme={{
    ...props.theme,
    ...theme
  }}>
    {children}
  </ThemeProvider>
)

Theme.propTypes = {}

export default Theme;