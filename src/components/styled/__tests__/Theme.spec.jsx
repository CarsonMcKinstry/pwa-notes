/* global it, describe, expect, shallow, mount */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme, { baseTheme } from '../Theme';

describe('<Theme/>', () => {
  it('should render without crashing', () => {
    shallow(<Theme />).html();
  });

  it('should render children', () => {
    const child = shallow(
      <Theme>
        <div />
      </Theme>
    ).find('div');
    expect(child.length).toEqual(1);
  });

  it('should have a ThemeProvder with a theme of the baseTheme', () => {
    const tree = mount(
      <Theme />
    );

    expect(tree.find(ThemeProvider).length).toEqual(1);
    expect(tree.find(ThemeProvider).props().theme).toEqual(baseTheme);
  });

  it('should extend the baseTheme', () => {
    const theme = {
      white: '#fff',
      black: '#000'
    };
    const tree = mount(
      <Theme theme={theme} />
    );

    expect(tree.find(ThemeProvider).props().theme).toEqual({
      ...baseTheme,
      ...theme
    });
  });
});
