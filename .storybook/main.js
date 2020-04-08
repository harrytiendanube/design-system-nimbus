module.exports = {
  stories: ['../stories/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-actions', 
    '@storybook/addon-links', 
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
    '@storybook/addon-a11y/register'
  ],
};
