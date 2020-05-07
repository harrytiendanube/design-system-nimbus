import * as React from 'react';

import { ExampleComponent } from '../../components/src';

export default {
  title: 'ExampleComponent',
  component: ExampleComponent,
};

export const ToStorybook = (): JSX.Element => (
  <ExampleComponent text="with sass theme provider lib 😄" />
);
