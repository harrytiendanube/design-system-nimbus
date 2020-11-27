import * as React from "react";

import "./ErrorState.css";

import { ExclamationTriangleIcon } from "@tiendanube/icons";
import { Text, Link, InterfaceLink } from "..";

export interface InterfaceErrorState {
  /** Title of the ErrorState */
  title: string;
  /** Action to retry */
  action?: Pick<InterfaceLink, "children" | "onClick">;
}

function ErrorState({ title, action }: InterfaceErrorState): JSX.Element {
  return (
    <div className="nimbus--error-state">
      <div className="nimbus--error-state__icon">
        <ExclamationTriangleIcon size="large" />
      </div>
      <div className="nimbus--error-state__content">
        <Text block appearance="secondary" textAlign="center" bold>
          {title}
        </Text>
        {action && (
          <Link onClick={action.onClick} underline>
            {action.children}
          </Link>
        )}
      </div>
    </div>
  );
}

export default ErrorState;
