import renderer from 'react-test-renderer';

import { Circle } from '../circle';
import { ElementStates } from '../../../../types/element-states';
import React from 'react';

describe('Тест элемента Circle:', () => {
  it('Circle без буквы', () => {
    const tree = renderer
      .create(<Circle letter={''} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с буквами', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с head', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} head={'head'}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в head', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} head={<Circle letter={'head'}/>} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с tail', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} tail={'tail'}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с react-элементом в tail', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} tail={<Circle letter={'tail'}/>} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с index', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} index={1}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle с пропом isSmall === true', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} isSmall={true}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии default', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} state={ElementStates.Default} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии changing', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} state={ElementStates.Changing} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Circle в состоянии modified', () => {
    const tree = renderer
      .create(<Circle letter={'circle'} state={ElementStates.Modified} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });
});
