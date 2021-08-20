# @tiendanube/components

[![@tiendanube/components](https://img.shields.io/npm/v/@tiendanube/components?color=%230272d5)](https://npmjs.com/package/@tiendanube/components) ![PRs](https://img.shields.io/badge/PRs-Welcome-0CA76B)

Nimbus components is a component library built with [React](https://reactjs.org), designed to help our teams and ecosystem build better products for our merchants. 

## 🚀 Getting started

Install `@tiendanube/components` using any package manager.

```shell
  $ npm install @tiendanube/components

  // or

  $ yarn add @tiendanube/components
```

## 💻 Usage

```jsx
  import { Button } from "@tiendanube/components";

  function ComponentExample() {
    return <Button>Hello World</Button>;
  }
```
For more information about our components, check out our [Storybook](https://tiendanube.github.io/design-system-nimbus/).

## ⌨️ Development

We use Storybook as our front-end playground. To run it locally use:

```shell
  $ yarn start:dev
```

Storybook should be running at http://localhost:6006

For detailed documentation on how to write components, please follow along.
For documentation on how to write common styles, please refer to our [styles documentation](./styles).

### Folder & file structures 📁 📄
- For best practices in structure files please read this [document](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic)
- When creating a new component, do so inside the **src** directory
```
  ├─ 📁 components
  │  └─ 📁 src
```
- The directory should have the same name as the component. The component file should have the name of the component in Pascal Case format and the extension `.tsx`
``` 
  ├─ 📁 ComponentExample
  │  └─ 📄 ComponentExample.tsx
```
- Every directory should contain a 📄 **index.ts** which serves as an entry point for the module, component, utils and/or hooks.
```
  ├─ 📁 ComponentExample
  │  ├─ 📄 index.ts
  │  └─ 📄 ComponentExample.tsx
```
- Every component, utils and/or hooks should come with a test. The test must have the same name as the file being tested and the extension must be `.spec.tsx`
```
  ├─ 📁 ComponentExample
  │  ├─ 📄 index.ts
  │  ├─ 📄 ComponentExample.tsx
  │  └─ 📄 ComponentExample.spec.tsx
```
- The styles for the component will be written in a `.scss` file using the same name and case as the component file. The `.css` file is generated at build time.
```
  ├─ 📁 ComponentExample
  │  ├─ 📄 index.ts
  │  ├─ 📄 ComponentExample.scss
  │  ├─ 📄 ComponentExample.tsx
  │  └─ 📄 ComponentExample.spec.tsx
```
- If the components contain subcomponents, they should have their own module subdirectory inside the component directory.
```
  ├─ 📁 ComponentExample
  │  ├─ 📁 ComponentChild
  │  │  ├─ 📄 index.ts
  │  │  ├─ 📄 ComponentChild.scss
  │  │  ├─ 📄 ComponentChild.tsx
  │  │  └─ 📄 ComponentChild.spec.tsx
  │  ├─ 📄 index.ts
  │  ├─ 📄 ComponentExample.scss
  │  ├─ 📄 ComponentExample.tsx
  │  └─ 📄 ComponentExample.spec.tsx
```
- If a component has two or more children components, a subdirectory **📁 components** must be created inside de main directory of the component.
```
  ├─ 📁 ComponentExample
  │  ├─ 📁 components
  │  │  ├─ 📄 index.ts
  │  │  ├─ 📁 ComponentChild
  │  │  │  ├─ 📄 index.ts
  │  │  │  └ ···
  │  │  └─ 📁 ComponentSecondary
  │  │     ├─ 📄 index.ts
  │  │     └ ···
  │  ├─ 📄 index.ts
  │  ├─ 📄 ComponentExample.scss
  │  ├─ 📄 ComponentExample.tsx
  │  └─ 📄 ComponentExample.spec.tsx
```
- In the case of hooks, their names should start by the preffix **use** and use Camel Case format and have the extension `\*.ts`. They should be contained in a directory with the same name, along with an index file and its corresponding test (`\*.spec.ts`)
```
  ├─ 📁 ComponentExample
  │  ├─ 📁 useCount
  │  │  ├─ 📄 index.ts
  │  │  ├─ 📄 useCount.ts
  │  │  └─ 📄 useCount.spec.ts 
  │  ├─ 📄 index.ts
  │  ├─ 📄 ComponentExample.scss
  │  ├─ 📄 ComponentExample.tsx
  │  └─ 📄 ComponentExample.spec.tsx
```
- In the case of utils, the suffix **Utils** must be added to the name and the name must be compliant with the Camel Case format and the extension `\*.ts`. Utils should be contained in a directory with the same name along with an index file and the corresponding test (`\*.spec.ts`)
```
  ├─ 📁 ComponentExample
  │  ├─ 📁 domUtils
  │  │  ├─ 📄 index.ts
  │  │  ├─ 📄 domUtils.ts
  │  │  └─ 📄 domUtils.spec.ts 
  │  ├─ 📄 index.ts
  │  ├─ 📄 ComponentExample.scss
  │  ├─ 📄 ComponentExample.tsx
  │  └─ 📄 ComponentExample.spec.tsx
```
- If there are two or more hooks and/or utils, they should comply with the same rules as children components, being grouped in a subdirectory named hooks or utils accordingly.
```
  ├─ 📁 ComponentExample
  │  ├─ 📁 hooks
  │  │  ├─ 📄 index.ts
  │  │  ├─ 📁 useCount
  │  │  │  ├─ 📄 index.ts
  │  │  │  └ ···
  │  │  └─ 📁 useOrders
  │  │     ├─ 📄 index.ts
  │  │     └ ···
  │  ├─ 📁 utils
  │  │  ├─ 📄 index.ts
  │  │  ├─ 📁 domUtils
  │  │  │  ├─ 📄 index.ts
  │  │  │  └ ···
  │  │  └─ 📁 isArrayEqualUtils
  │  │     ├─ 📄 index.ts
  │  │     └ ···
  │  ├─ 📄 index.ts
  │  ├─ 📄 ComponentExample.scss
  │  ├─ 📄 ComponentExample.tsx
  │  └─ 📄 ComponentExample.spec.tsx
```

### Component coding 🤖 ⌨️
- The component should have the same name as the file using Pascal Case format. It should be declared in a Regular Function, always typying the expected answer and making the default export at the end of the file.
```jsx
  // ComponentExample.tsx
  import React from "react";

  function ComponentExample(): JSX.Element {
    return (
      <div>...</div>
    )
  }
  export default ComponentExample;
```
- Should the component have props, they will be declared as an interface in the same file with the same name of the component, appending the suffix Props.
```jsx
  // ComponentExample.tsx
  import React from "react";
  
  interface ComponentExampleProps {
    title: string;
    description: string;
  }
  
  function ComponentExample({ 
    title, 
    description 
  }: ComponentExampleProps): JSX.Element {
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    )
  }
  export default ComponentExample;
```
- The index file will be responsible for exporting everything needed form the module. Especially, the component's default.
```jsx
  // index.ts
  export { default } from "./ComponentExample";
```
- The mock constants can stay in the same file, as long as they do not fill more than 5 lines. If they do, they must be moved to a constants file. Their name should be declared in uppercase, in SNAKE_CASE format.  
```jsx
  // ComponentExample.tsx
  import React from "react";

  const TIME_IN_A_DAY = 23412341341341234;
  function ComponentExample(): JSX.Element {
    const date = new Date(TIME_IN_A_DAY);
    return (
      <div>{date.getMonth()}</div>
    )
  }
  export default ComponentExample;
```

### CSS class names 🎨
- The nomenclature that should be used is [BEM - Block Element Modifier](http://getbem.com/naming/) 
- The name of the component class (henceforth called block) must start by a preffix (**nimbus**) followed by the name of the component in kebab-case format (**ComponentExample -> component-example**) with a double dash separating both (**stratus--component-example**)
```html
  function ComponentExample(): JSX.Element {
    return (
      <div className="nimbus--component-example">
        ...
      </div>
    )
  }
```
- Should the block contain children elements with classes, their name should start likewise by the preffix and the name of the component (**nimbus--component-example**) plus a new name identifying the element, separated from the rest by two underscores (**nimbus--component-example__title**)
```html
  function ComponentExample(): JSX.Element {
    return (
      <div className="nimbus--component-example">
        <h1 className="nimbus--component-example__title">Hello World</h1>
      </div>
    )
  }
```
- If the block contains more than one nested children, the rule  `prefix--block-name__element-name` will always be followed
```html
  function ComponentExample(): JSX.Element {
    return (
      <div className="nimbus--component-example">
        <div className="nimbus--component-example__container">
          <h1 className="nimbus--component-example__title">Hello World</h1>
          <p className="nimbus--component-example__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
      </div>
    )
  }
```
- If the block or the element require an alternative class (this will be considered as a modifier), a new double-dash-separated identifier will be appended at the end of the name of the class. (**nimbus--component-example--margin-12** or **nimbus--component-example__description--italic**) 
```html
  function ComponentExample(): JSX.Element {
    return (
      <div className="nimbus--component-example--margin-12">
        <div className="nimbus--component-example__container">
          <h1 className="nimbus--component-example__title">Hello World</h1>
          <p className="nimbus--component-example__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <h1 className="nimbus--component-example__description--italics">Sed eiusmod tempor incidunt ut labore et dolore magna aliqua</h1>
        </div>
      </div>
    )
  }
```
- The `scss` file should be named the same as the `tsx`. At the beginning of the file we should import the core styles file that has all the variables and common classes.
```scss
  @import "../../styles/core";
```
- All classes should be written using the `prefix` variable
```scss
  .#{$prefix}--component-name {
    ...
  }
```
- Don't nest classes inside other classes. Since we are using BEM naming methodology, all components will have clearly different class names and therefore there is no need to increase specificity by nesting.
```scss
  .#{$prefix}--component-name {
    ...
  }

  .#{$prefix}--component-name__element-name {
    ...
  }

  .#{$prefix}--component-name__element-name--modifier {
    ...
  }
```
- In case you need to add interaction to a component by using an additional modifier class, you can skip using BEM to name the modifier class. Instead, use a name that clearly explains what the modifier will do to the component. Also, you may nest this modifier class to keep it encapsulated inside the component.
```scss
  .#{$prefix}--component-name {
    &.is-visible {
      ...
    }
  }
```
- If you need to create component-level mixins and functions that **will not** be reused by other components, create an additional `_core.scss` file at the root of the component directory. Use this file to import the global core styles and store all local variables, functions and mixins. Then, import this file into your `ComponentName.scss` file and style the component in the latter.
```scss
// _core.scss

@import "../../styles/core";

@function MyFunction() {
  ...
}

@mixin MyMixin() {
  ...
}

$variable-name: variable-value;

// ComponentName.scss

@import "core";

.#{$prefix}--component-name {
  @include MyMixin($variable-name);
  @include MyFunction($variable-name);
  ...
}
```

### Testing 🧪🔬
- For testing best practices, please read this [document](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library).
- To create a test is necessary to import from the testing library both the render and the screen.
```jsx
  import { render, screen } from "@testing-library/react";
```
- The component to be tested should also be imported.
```jsx
  import { render, screen } from "@testing-library/react";
  import ComponentExample from "./ComponentExample";
```
- The heading of the tests must be written following the order Given-When-Then [Documentation](https://cucumber.io/docs/gherkin/reference/) 
  - **Given** represents a precondition
  - **When** an action
  - **Then** a result or consequence of the action (user acceptance criteria).
  - **And** a result or consequence of other consequence (user acceptance criteria).
  - **But** a result which should not be possibly observable
```jsx
  import { render, screen } from "@testing-library/react";
  import ComponentExample from "./ComponentExample";

  describe("GIVEN a ComponentExample", () => {
    describe("WHEN rendered", () => {
      it("THEN should display the correct text", () => {
        ...
      });
    });
  });
```
- In this first instance, we will verify the right rendering of the component by checking the text in each of the elements.
```jsx
  import { render, screen } from "@testing-library/react";
  import ComponentExample from "./ComponentExample";

  describe("GIVEN a ComponentExample", () => {
    describe("WHEN rendered", () => {
      it("THEN should display the correct text", () => {
        render(<ComponentExample title="title" description="description" />);
        expect(screen.getByText(/title/i)).toBeInTheDocument();
        expect(screen.getByText(/description/i)).toBeInTheDocument();
      });
    });
  });
```