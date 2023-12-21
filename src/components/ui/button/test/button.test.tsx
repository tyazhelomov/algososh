import renderer from 'react-test-renderer';

import { Button } from '../button';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

describe('Тест элемента Button:', () => {
  it('Кнопка с текстом рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button text={'Кнопка'} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 

  it('Кнопка без текста рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 

  it('Заблокированная кнопка рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button text={'Кнопка'} disabled={true} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 

  it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
    const tree = renderer
      .create(<Button text={'Кнопка'} isLoader={true} />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  }); 

  it('Вызов колбека при клике на кнопку выполняется без ошибок', () => {
    window.alert = jest.fn();

    render(<Button text={'Кнопка'} onClick={() => alert('Тест')} />)

    const link = screen.getByText('Кнопка');

    fireEvent.click(link);

    expect(window.alert).toHaveBeenCalledWith('Тест');
  });
});
