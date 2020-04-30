import React from 'react';
import { ExampleComponent } from '@tiendanube/components';

export default {
  title: 'ExampleComponent',
  component: ExampleComponent,
};

export const ToStorybook = () => (
  <ExampleComponent text="with sass theme provider lib 😄" />
);

ToStorybook.story = {
  name: 'Example component',
};
