import * as React from "react";

import classNames from "classnames";
import "./Tabs.css";

export interface InterfaceTabsItem {
  /** React JSX Element */
  children: JSX.Element;
  /** Label Tab */
  label: string;
}

function Item({ children }: InterfaceTabsItem): JSX.Element {
  return <>{children}</>;
}

export interface InterfaceTabs {
  /** React JSX Elements */
  children: JSX.Element[];
  /** Active tab index */
  activeTab: number;
  /** OnChange callback function */
  onChange: (index: number) => void;
}

function Tabs({
  children,
  activeTab = 0,
  onChange,
}: InterfaceTabs): JSX.Element {
  const renderTabs = React.Children.map(children, (child, index) => {
    const handleOnclickTab = () => onChange(index);
    const {
      props: { label },
    } = child;
    const tabClassName = classNames("nimbus--tab", {
      "nimbus--tab--active": activeTab === index,
    });
    return (
      <li
        key={label}
        role="presentation"
        className={tabClassName}
        onClick={handleOnclickTab}
      >
        {label}
      </li>
    );
  });

  const renderActiveChild = (
    <> {React.Children.toArray(children)[activeTab]} </>
  );
  return (
    <div className="nimbus--tabs-wrapper">
      <ul role="tablist" className="nimbus--tabs">
        {renderTabs}
      </ul>
      <div role="tabpanel" className="nimbus--tabs-content">
        {renderActiveChild}
      </div>
    </div>
  );
}

Tabs.Item = Item;

export default Tabs;
