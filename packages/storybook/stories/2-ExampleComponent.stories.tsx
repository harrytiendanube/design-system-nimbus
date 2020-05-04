import * as React from 'react';
import { ExampleComponent } from '../../components/src';

export default {
  title: 'ExampleComponent',
  component: ExampleComponent
};

export const ToStorybook = () => (
  <ExampleComponent text="with sass theme provider lib 😄" />
);

ToStorybook.story = {
  name: 'Example component',
};
