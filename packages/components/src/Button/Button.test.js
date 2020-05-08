import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '.';
import '@testing-library/jest-dom/extend-expect';

describe('Button', () => {
  it('Render Button', () => {
    const { getByTestId } = render(
      <Button data-testid="button"> this is my button </Button>,
    );
    const button = getByTestId('button');
    expect(button).toHaveTextContent('this is my button');
  });

  it('Render Red Button', () => {
    const { getByTestId } = render(
      <Button data-testid="button" className="red">
        {' '}
        this is my red button{' '}
      </Button>,
    );
    const button = getByTestId('button');
    expect(button).toHaveClass('red');
  });
  it('Render Blue Button', () => {
    const { getByTestId } = render(
      <Button data-testid="button" className="blue">
        {' '}
        this is my blue button{' '}
      </Button>,
    );
    const button = getByTestId('button');
    expect(button).toHaveClass('blue');
  });

  it('Click on Button must run callback', () => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <Button data-testid="button" className="blue" onClick={callback}>
        {' '}
        this is my button{' '}
      </Button>,
    );
    const button = getByTestId('button');
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });
});
