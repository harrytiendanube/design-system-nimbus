import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, color } from "@storybook/addon-knobs";
import Button from '../components/Button/Button';

export default {
  title: 'Button',
  decorators: [withKnobs]
};

export const Text = () => <Button onClick={action('clicked')} style={ { backgroundColor: color('Color', 'red'), color: color('Color texto', 'white') } }>{ text('Texto', 'Texto inicial') }</Button>;

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);