import React from 'react';
import ExampleComponent from './';

describe('ExampleComponent', () => {
  it('is truthy', () => {
    expect(<ExampleComponent text="hola" />).toBeTruthy();
  });
});
