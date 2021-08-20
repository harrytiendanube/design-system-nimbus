# @tiendanube/storybook

[![@tiendanube/storybook](https://img.shields.io/npm/v/@tiendanube/storybook?color=%230272d5)](https://npmjs.com/package/@tiendanube/storybook) ![PRs](https://img.shields.io/badge/PRs-Welcome-0CA76B)

[Storybook](https://storybook.js.org) is a frontend library and playground for visually testing components. Check out [our playground here](https://tiendanube.github.io/design-system-nimbus).

## ⌨️ Development

### Folder & file structures 📁 📄
When creating a new component, you should also add a story to showcase all possible interactions and variations. To do so, you have to create a new file inside the `stories` directory in this package.
```
  ├─ 📁 storybook
  │  └─ 📁 stories
```
All stories must have the same name as the component, written in Pascal Case format and the extension `.stories.mdx`.
```
  ├─ 📁 stories
  │  └─ 📄 ComponentExample.stories.mdx
```
If you need to style your story with additional css classes without modifying the component styles, you can add them in the `utils/style.css` file.
```
  ├─ 📁 storybook
  │  └─ 📁 utils
  │  │  └─ 📄 style.css
```
In case you need to declare constants that can be used in multiple stories or include images, you can add them in the `stories/utils` directory.
```
  ├─ 📁 storybook
  │  └─ 📁 stories
  │  │  └─ 📁 utils
  │  │  │  └─ 📄 constants.tsx
  │  │  │  └─ 📄 image.jpg
```

### Story coding 🤖 ⌨️
All stories are written in `.mdx` format and have three main parts:
- All imports and declarations
```jsx
  // This must be imported into all stories
  import { Meta, Story, Props, Preview } from "@storybook/addon-docs/blocks";
  import { withA11y } from "@storybook/addon-a11y";
  // Only import the knobs you need for the story (if any)
  import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";
  // Only import actions if your component has callbacks
  import { action } from "@storybook/addon-actions";

  // Import the components you are documenting
  import { ComponentName } from "@tiendanube/components";

  // Include the style.css file if you have additional classes inside the story
  import "../utils/style.css";

  // Finally declare the name and category of the story and the component it is related to
  <Meta title="ComponentCategory/ComponentName" component={ComponentName} />
```
- The story (or stories)
```jsx
  # ComponentName

  <Preview>
    <Story name="story name" parameters={{ decorators: [withKnobs, withA11y] }}>
      ...
    </Story>
  </Preview>
```
- Props documentation
```jsx
  ## Properties

  <Props of={ComponentName} />
```

## Conventions 📓
When writing stories for components, please make sure to include the following:

### Default story *(required)*
A story showcasing the component in it's default state, along with any additional states *(i.e: a Button would have a pressed, focus, disabled, state; a Dropdown would have an open and closed state)*

### Variants story
If the component has variants, create one story for each one, showcasing additional states for all variants.

### Stressed story
If the component features user created content, add a story with a stressed version of the component, to show how the component handles a very large amount of user content.

### Playground story *(required)*
Add an additional story of the component in it's default state with all interactive knobs that allow the user to test all properties in real time.

### Skeleton story
If the component has a skeleton state, include a story for it.