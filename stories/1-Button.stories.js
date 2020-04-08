import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, color } from "@storybook/addon-knobs";
import { withA11y } from '@storybook/addon-a11y';
import Button from '../components/Button/Button';

export default {
  title: 'Button',
  decorators: [withKnobs, withA11y],
  parameters: {
    component: Button,
    componentSubtitle: 'Botón básico',
  }
};/* Badge component metadata */

export const Text = () => <Button className={select('Class', ['default', 'blue', 'red'])}>Texto inicial</Button>;
export const TextCode = () => <Button>Texto inicial 2</Button>;

/* export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
); */