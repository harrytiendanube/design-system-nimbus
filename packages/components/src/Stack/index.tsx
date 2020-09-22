import * as React from "react";

import classNames from "classnames";

import Item from "./Stack.Item";
import "./Stack.css";

export { InterfaceStackItem } from "./Stack.Item";

export interface InterfaceStack {
  /** React node of type children */
  children: React.ReactNode;
  /** Justify content */
  justify?: "flex-start" | "center" | "flex-end" | "space-between";
  /** Align-items */
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  /** Spacing between children */
  spacing?: "base" | "tight";
  /** Define if the stack is a column */
  column?: boolean;
  /** Define if items break into lines upon reaching the parent's limit */
  wrap?: boolean;
}

/**
 * @param children React node of type children
 * @param justify Justify content
 * @param align Align-items
 * @param spacing Define if the stack is a column
 * @param column Define if the stack is a column
 * @param wrap Define if items break into lines upon reaching the parent's limit
 */

const Stack = React.memo(function Stack({
  children,
  justify = "flex-start",
  align = "center",
  spacing = "base",
  column = false,
  wrap = false,
}: InterfaceStack) {
  const mainClass = React.useMemo(
    () =>
      classNames(
        "nimbus--stack-wrapper",
        `justify-content--${justify}`,
        `align-items--${align}`,
        `spacing--${spacing}`,
        { "stack--column": column },
        { "stack--wrap": wrap },
      ),
    [justify, spacing, align, column, wrap],
  );

  return <div className={mainClass}>{children}</div>;
}) as React.NamedExoticComponent<InterfaceStack> & {
  Item: typeof Item;
};

Stack.Item = Item;

export default Stack;
