import * as React from "react";

import "./NimbusApp.css";

export interface InterfaceNimbusApp {
  /** Menu Area */
  menu: React.ReactNode;
  /** Header Area */
  header: React.ReactNode;
  /** NavTabs Area */
  navTabs: React.ReactNode;
  /** Mains App content */
  children: React.ReactNode;
}

function NimbusApp({
  menu,
  header,
  navTabs,
  children,
}: InterfaceNimbusApp): JSX.Element {
  return (
    <div className="nimbus--app">
      <aside className="nimbus--app__aside">{menu}</aside>
      <main className="nimbus--app__main">
        <nav className="nimbus--app__header">{header}</nav>
        <div className="nimbus--app__body">{children}</div>
        {navTabs}
      </main>
    </div>
  );
}

export default NimbusApp;
