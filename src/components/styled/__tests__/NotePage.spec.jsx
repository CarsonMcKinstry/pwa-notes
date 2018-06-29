/* global it, describe, expect, shallow, mount */
import React from 'react';
import {
  NotePage,
  NoteArea,
  NoteTopBar,
  NoteStatusIcons,
  NoteDate,
  OpenMenu,
  PlacedMenu,
  StyledMarkdown,
  SavingIcon
} from '../NotePage';
import { baseTheme } from '../Theme';

describe('<NotePage />', () => {
  it('should render without crashing', () => {
    shallow(<NotePage />).html();
  });

  it('should render children', () => {
    const child = shallow(
      <NotePage>
        <div />
      </NotePage>
    );

    expect(child.length).toEqual(1);
  });
});

describe('<NoteArea />', () => {
  it('should render without crashing', () => {
    shallow(<NoteArea />).html();
  });
});

describe('<NoteTopBar />', () => {
  it('should render without crashing', () => {
    shallow(<NoteTopBar />).html();
  });
});

describe('<NoteStatusIcons />', () => {
  it('should render without crashing', () => {
    shallow(
      <NoteStatusIcons>
        menu
      </NoteStatusIcons>
    ).html();
  });
});

describe('<NoteStatusIcons />', () => {
  it('should render without crashing', () => {
    shallow(<NoteStatusIcons />).html();
  });
});

describe('<SavingIcon />', () => {
  it('should render without crashing', () => {
    shallow(<SavingIcon />).html();
  });

  it('should render an i with the material-icons class', () => {
    const icon = mount(
      <SavingIcon>
        chaches
      </SavingIcon>
    ).find('i.material-icons');

    expect(icon.length).toEqual(1);
  });

  it('should render with isSaving equal to true', () => {
    shallow(<SavingIcon isSaving />).html();
  });
});

describe('<NoteDate />', () => {
  it('should render without crashing', () => {
    shallow(<NoteDate />);
  });
});

describe('<OpenMenu />', () => {
  it('should render without crashing', () => {
    shallow(<OpenMenu theme={baseTheme} />);
  });
});

describe('<PlacedMenu />', () => {
  it('should render without crashing', () => {
    shallow(<PlacedMenu />).html();
  });
});

describe('<StyledMarkdown />', () => {
  it('should render without crashing', () => {
    shallow(<StyledMarkdown />).html();
  });

  it('should render markdown', () => {
    const md = '# Hello World\n\n## Hello Other World\n\nthis should be a paragraph with a link: [this should be a link](https://google.com)';

    const tree = mount(<StyledMarkdown source={md} />);

    expect(tree.find('h1').length).toEqual(1);
    expect(tree.find('h1').text()).toBe('Hello World');

    expect(tree.find('h2').length).toEqual(1);
    expect(tree.find('h2').text()).toBe('Hello Other World');

    expect(tree.find('p').length).toEqual(1);
    expect(tree.find('p').text()).toBe('this should be a paragraph with a link: this should be a link');

    expect(tree.find('p > a').length).toEqual(1);
    expect(tree.find('p > a').text()).toBe('this should be a link');
    expect(tree.find('p > a').props().href).toBe('https://google.com');
  });
});
