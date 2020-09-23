import * as React from "react";

import Section from "./Layout.Section";
import "./Layout.css";

export { InterfaceLayoutSection } from "./Layout.Section";

export interface InterfaceLayout {
  /** Type of layout */
  appearance?: "aside" | "halves" | "fluid" | "centered";
  /** Component to render in page content. */
  children: React.ReactNode;
}

/**
 * Layout component used to render content in one or more columns
 *
 * @param appearance Type of layout.
 * @param children Components to render inside layout.
 */
const Layout = React.memo(function Layout({
  appearance = "fluid",
  children,
}: InterfaceLayout): JSX.Element {
  return <main className={`nimbus--layout-${appearance}`}>{children}</main>;
}) as React.NamedExoticComponent<InterfaceLayout> & {
  Section: typeof Section;
};

Layout.Section = Section;

export default Layout;
