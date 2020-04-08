import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, color } from "@storybook/addon-knobs";
import { withA11y } from '@storybook/addon-a11y';
import Button from '../components/Button/Button';

export default {
  title: 'Button',
  decorators: [withKnobs, withA11y]
};

export const Text = () => <Button onClick={action('clicked')} style={ { backgroundColor: color('Color', 'red'), color: color('Color texto', 'white') } }>{ text('Texto', 'Texto inicial') }</Button>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);