/* eslint-disable */

const getCssData = (variable) => {
  return (
    "." + getCssClassName(variable) + " {  /* Escriba el estilo aquí */  }"
  );
};

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
  return `import * as React from "react";\n
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
    const { getByTestId } = render(<${variable} data-testid="${variable}">children</${variable}>);
    const component = getByTestId("${variable}");
    /** Validate than text is the same as the content tag */
    expect(component).toHaveTextContent("children");
  });
});
`;
};

const getJsData = (variable) => {
  const ctrlName = variable + "Ctrl";

  return (
    "(function () { \n\t'use strict'; \n\tangular \n\t\t.module('clemente.components') \n\t\t.controller('" +
    ctrlName +
    "', " +
    ctrlName +
    "); \n\n\t\tfunction " +
    ctrlName +
    "($scope) { \n\t\t\treturn { \n\t\t\t/* Escribir código */\n\t\t\t} \n\t\t}; \n})();"
  );
};

module.exports = {
  getTsxData,
  getTestData,
};
