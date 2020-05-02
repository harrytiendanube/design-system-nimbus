const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.(js|mdx|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-storysource',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, '../stories')],
        transpileManager: true,
      },
    },
    '@storybook/addon-docs',
  ],
};
