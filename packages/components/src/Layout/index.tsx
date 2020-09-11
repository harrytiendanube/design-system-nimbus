import * as React from "react";

import "./Layout.css";

export interface InterfaceLayout {
  /**
   * Type of layout
   */
  appearance?: "aside" | "halves" | "fluid" | "centered";
  /**
   * Component to render in page content.
   */
  children: React.ReactNode;
}

/**
 * Layout component used to render content in one or more columns
 * @param appearance Type of layout.
 * @param children Components to render inside layout.
 */
function Layout({ appearance, children }: InterfaceLayout): JSX.Element {
  return <main className={`nimbus--layout-${appearance}`}>{children}</main>;
}

Layout.defaultProps = {
  appearance: "fluid",
};

export default React.memo(Layout);
