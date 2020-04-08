module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions', 
    '@storybook/addon-links', 
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y/register'
  ],
};
