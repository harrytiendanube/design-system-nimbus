import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, color } from "@storybook/addon-knobs";

export default {
  title: 'Button',
  decorators: [withKnobs]
};

export const Text = () => <button onClick={action('clicked')} style={ { backgroundColor: color('Color', 'red'), color: color('Color texto', 'white') } }>{ text('Texto', 'Texto inicial') }</button>;

export const Emoji = () => (
  <button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </button>
);