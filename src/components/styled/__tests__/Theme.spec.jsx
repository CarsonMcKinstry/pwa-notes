/* global it, describe, expect, shallow, mount */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme, { baseTheme } from '../Theme';

describe('<Theme/>', () => {
  it('should render without crashing', () => {
    const tree = shallow(<Theme />);

    expect(tree).toMatchSnapshot();
  });

  it('should render children', () => {
    const tree = shallow(
      <Theme>
        <div />
      </Theme>
    );
    expect(tree.find('div').length).toEqual(1);
    expect(tree).toMatchSnapshot();
  });

  it('should have a ThemeProvder with a theme of the baseTheme', () => {
    const tree = mount(
      <Theme />
    );

    expect(tree.find(ThemeProvider).length).toEqual(1);
    expect(tree.find(ThemeProvider).props().theme).toEqual(baseTheme);
    expect(tree).toMatchSnapshot();
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
    expect(tree).toMatchSnapshot();
  });
});
