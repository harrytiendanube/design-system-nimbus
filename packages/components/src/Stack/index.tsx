import * as React from "react";

import classNames from "classnames";

import "./Stack.css";

export interface InterfaceStack {
  /**
   * React node of type children
   * */
  children: React.ReactNode;
  /**
   * Horizontal alignment
   */
  hAlignment?: "start" | "end" | "center" | "between";
  /**
   * Vertical alignment
   */
  vAlignment?: "start" | "end" | "center" | "between";
  /**
   * Spacing between children
   */
  spacing?: "base" | "tight";
  /**
   *  Define if the stack is a column
   */
  vertical?: boolean;
  /**
   *  Define if items break into lines upon reaching the parent's limit
   */
  wrap?: boolean;
}

/**
 *  @param children React node of type children
 *  @param hAlignment Horizontal alignment
 *  @param vAlignment Vertical alignment
 *  @param spacing Define if the stack is a column
 *  @param vertical Define if the stack is a column
 *  @param wrap Define if items break into lines upon reaching the parent's limit
 */

const Stack = React.memo(function Stack({
  children,
  hAlignment = "start",
  vAlignment = "center",
  spacing = "base",
  vertical = false,
  wrap = false,
}: InterfaceStack) {
  const mainClass = React.useMemo(()=>classNames(
    "nimbus--stack-wrapper",
    `h-alignment--${hAlignment}`,
    `v-alignment--${vAlignment}`,
    `spacing--${spacing}`,
    { "stack--vertical": vertical },
    { "stack--wrap": wrap },
  ), [hAlignment, spacing, vAlignment, vertical, wrap]);

  return <div className={mainClass}>{children}</div>;
}) as React.NamedExoticComponent<InterfaceStack> & {
  Item: typeof Item;
};
export interface InterfaceStackItem {
  /**
   * React node of type children
   * */
  children?: React.ReactNode;
  /**
   *
   */
  fill?: boolean;
}

/**
 *  @param children React node of type children
 *  @param fill Define whether the item should stretch beyond it's limit
 */
function Item({ children, fill = false }: InterfaceStackItem): JSX.Element {
  const mainClass = React.useMemo(()=> classNames("nimbus--stack-item", {
    "stack-item--fill": fill,
  }), [fill]);
  return <div className={mainClass}>{children}</div>;
}

Stack.Item = Item;

export default Stack;
