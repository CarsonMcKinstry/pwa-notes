import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
  primary: {
    base: '#1e88e5',
    light: '#6ab7ff',
    dark: '#005cb2'
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
  }
  
  :root {
    --mdc-theme-primary: ${theme.primary.base}!important;
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