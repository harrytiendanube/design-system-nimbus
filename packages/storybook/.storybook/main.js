module.exports = {
  stories: ["../stories/**/*.stories.(js|mdx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-knobs/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-storysource",
  ],
};
