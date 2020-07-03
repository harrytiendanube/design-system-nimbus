/* eslint-disable */

const getCssClassName = (variable) => {
  var className = "";
  for (var index = 0; index < variable.length; index++) {
    var currentChar = variable.charAt(index);
    if (currentChar === currentChar.toUpperCase()) {
      className = className + "-" + currentChar.toLowerCase();
    }

    if (currentChar === currentChar.toLowerCase()) {
      className = className + currentChar;
    }
  }

  return className;
};

const getTsxData = (variable) => {
  return `import * as React from "react";
import "@tiendanube/styles/css/${variable}.css";

interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
  /** Element inside tag component */
  children: React.ReactNode;
}\n
const ${variable}: React.FC<Props> = ({ children, ...share }: Props) => {
  return <div {...share}>{children}</div>;
};\n
${variable}.defaultProps = {};\n
export default ${variable};
`;
};

const getTestData = (variable) => {
  return `import React from "react";
import { render } from "@testing-library/react";
import ${variable} from ".";
import "@testing-library/jest-dom/extend-expect";

describe("${variable}", () => {
  it("Render ${variable}", () => {
    const { getByTestId } = render(
      <${variable} data-testid="${variable}">children</${variable}>
    );
    const component = getByTestId("${variable}");
    /** Validate than text is the same as the content tag */
    expect(component).toHaveTextContent("children");
  });
});
`;
};

const getScssData = (variable) => {
  return `@import "../StyleCore/style-core";
// ${variable}

.#{$prefix}--${getCssClassName(variable)} {}
`;
};

const getInsertStyle = (variable) => {
  return `@import "./${variable}/${variable}";\n`;
};

const getInsertComponent = (variable) => {
  return `\n// ${variable} reference added
export { default as ${variable} } from "./${variable}";
export * from "./${variable}";\n`;
};

const getStoryData = (variable) => {
  return `import { Meta, Story, Props, Preview } from "@storybook/addon-docs/blocks";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import { withA11y } from "@storybook/addon-a11y";
import { ${variable} } from '../../components/src';

import '../utils/style.css';

<Meta title="Atoms/${variable}" component={${variable}} />

# ${variable}

## detail component

Other description

<Preview>
  <Story name="standard" parameters={{ decorators: [withKnobs, withA11y] }}>
    <${variable}> {text("Texto", "Texto inicial")} </${variable}>
  </Story>
</Preview>

<Props of={${variable}} />
  `;
};

module.exports = {
  getTsxData,
  getTestData,
  getScssData,
  getInsertStyle,
  getInsertComponent,
  getStoryData,
};
