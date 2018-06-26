/* global beforeEach, it, describe, expect, shallow, sinon */
import React from 'react';

import {
  NotePage,
  NoteArea,
  NoteTopBar,
  NoteStatusIcons,
  NoteDate,
  OpenMenu,
  PlacedMenu,
  StyledMarkdown
} from '../NotePage';

describe('<NotePage />', () => {
  it('should render without crashing', () => {
    const tree = shallow(<NotePage />);

    expect(tree).toMatchSnapshot();
  });

  it('should render children', () => {
    const tree = shallow(
      <NotePage>
        <div />
      </NotePage>
    );

    expect(tree.find('div').length).toEqual(1);
    expect(tree).toMatchSnapshot();
  });
});

describe('<NoteArea />', () => {
  it('should render without crashing', () => {
    const tree = shallow(<NoteArea />);

    expect(tree).toMatchSnapshot();
  });
});

describe('<NoteTopBar />', () => {
  it('should render without crashing', () => {
    const tree = shallow(<NoteTopBar />);

    expect(tree).toMatchSnapshot();
  });
});

describe('<NoteStatusIcons />', () => {
  it('should render without crashing', () => {
    const tree = shallow(
      <NoteStatusIcons>
        menu
      </NoteStatusIcons>
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('<NoteStatusIcons />', () => {
  it('should render without crashing', () => {
    const tree = shallow(
      <NoteStatusIcons>
        menu
      </NoteStatusIcons>
    );

    expect(tree).toMatchSnapshot();
  });
});
