import * as React from "react";

import "./StatePriv.css";

import { Icon as IconType } from "@tiendanube/icons";
import { Text, Link, InterfaceLink } from "..";

export interface InterfaceStatePriv {
  /** Icon Component imported from @tiendanube/icons */
  icon: IconType;
  /** Title */
  title: string;
  /** Helper text */
  text?: string;
  /** Action to retry */
  action?: Pick<InterfaceLink, "children" | "onClick">;
}

function StatePriv({
  icon: Icon,
  title,
  text,
  action,
}: InterfaceStatePriv): JSX.Element {
  return (
    <div className="nimbus--state-priv">
      <div className="nimbus--state-priv__icon">
        <Icon size="large" />
      </div>
      <div className="nimbus--state-priv__content">
        <Text block appearance="secondary" textAlign="center" bold>
          {title}
        </Text>
        {text && (
          <Text block appearance="light" textAlign="center" size="small">
            {text}
          </Text>
        )}
        {action && (
          <Link onClick={action.onClick} underline>
            {action.children}
          </Link>
        )}
      </div>
    </div>
  );
}

export default StatePriv;
