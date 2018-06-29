// /* global it, describe, expect, shallow, mount */
// import React from 'react';
// import {
//   NotePage,
//   NoteArea,
//   NoteTopBar,
//   NoteStatusIcons,
//   NoteDate,
//   OpenMenu,
//   PlacedMenu,
//   StyledMarkdown,
//   SavingIcon
// } from '../NotePage';
// import { baseTheme } from '../Theme';

// describe('<NotePage />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<NotePage />);

//     expect(tree).toMatchSnapshot();
//   });

//   it('should render children', () => {
//     const tree = shallow(
//       <NotePage>
//         <div />
//       </NotePage>
//     );

//     expect(tree.find('div').length).toEqual(1);
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<NoteArea />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<NoteArea />);

//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<NoteTopBar />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<NoteTopBar />);

//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<NoteStatusIcons />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(
//       <NoteStatusIcons>
//         menu
//       </NoteStatusIcons>
//     );

//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<NoteStatusIcons />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<NoteStatusIcons />);

//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<SavingIcon />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<SavingIcon />);
//     expect(tree).toMatchSnapshot();
//   });

//   it('should render an i with the material-icons class', () => {
//     const tree = mount(
//       <SavingIcon>
//         chaches
//       </SavingIcon>
//     );

//     expect(tree.find('i.material-icons').length).toEqual(1);
//   });

//   it('should render with isSaving equal to true', () => {
//     const tree = shallow(<SavingIcon isSaving />);

//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<NoteDate />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<NoteDate />);

//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<OpenMenu />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<OpenMenu theme={baseTheme} />);

//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<PlacedMenu />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<PlacedMenu />);

//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('<StyledMarkdown />', () => {
//   it('should render without crashing', () => {
//     const tree = shallow(<StyledMarkdown />);

//     expect(tree).toMatchSnapshot();
//   });

//   it('should render markdown', () => {
//     const md = '# Hello World\n\n## Hello Other World\n\nthis should be a paragraph with a link: [this should be a link](https://google.com)';

//     const tree = mount(<StyledMarkdown source={md} />);

//     expect(tree.find('h1').length).toEqual(1);
//     expect(tree.find('h1').text()).toBe('Hello World');

//     expect(tree.find('h2').length).toEqual(1);
//     expect(tree.find('h2').text()).toBe('Hello Other World');

//     expect(tree.find('p').length).toEqual(1);
//     expect(tree.find('p').text()).toBe('this should be a paragraph with a link: this should be a link');

//     expect(tree.find('p > a').length).toEqual(1);
//     expect(tree.find('p > a').text()).toBe('this should be a link');
//     expect(tree.find('p > a').props().href).toBe('https://google.com');

//     expect(tree).toMatchSnapshot();
//   });
// });
