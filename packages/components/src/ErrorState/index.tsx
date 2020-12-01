import * as React from "react";

import "./ErrorState.css";

import { ExclamationTriangleIcon } from "@tiendanube/icons";
import { StatePriv, InterfaceLink } from "..";

export interface InterfaceErrorState {
  /** Title of the ErrorState */
  title: string;
  /** Action to retry */
  action?: Pick<InterfaceLink, "children" | "onClick">;
}

function ErrorState({ title, action }: InterfaceErrorState): JSX.Element {
  return (
    <StatePriv title={title} action={action} icon={ExclamationTriangleIcon} />
  );
}

export default ErrorState;
