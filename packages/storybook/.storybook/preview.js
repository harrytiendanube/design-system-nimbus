import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

export const parameters = {
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Intro",
        "Atomic components",
        "Composite components",
        "Layout",
        "Patterns",
      ],
    },
  },
};
