import * as React from "react";
import classNames from "classnames";

import { Text } from "..";

export interface InterfaceMenuSection {
  /** React node of type children */
  children: React.ReactNode;
  /** Title */
  title?: string;
}

function Section({ children, title }: InterfaceMenuSection): JSX.Element {
  const mainClass = classNames("nimbus--menu-section");
  return (
    <div className={mainClass}>
      {title && (
        <div className="nimbus--menu-section__title">
          <Text size="small" block appearance="light">
            {title}
          </Text>
        </div>
      )}
      <div className="nimbus--menu-section__content">{children}</div>
    </div>
  );
}

export default Section;
