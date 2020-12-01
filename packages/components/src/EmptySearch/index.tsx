import * as React from "react";

import { ExclamationTriangleIcon } from "@tiendanube/icons";
import StatePriv from "../StatePriv";

export interface InterfaceEmptySearch {
  /** Title of the EmptySearch */
  title: string;
  /** Helper text of the EmptySearch */
  text?: string;
}

function EmptySearch({ title, text }: InterfaceEmptySearch): JSX.Element {
  return <StatePriv title={title} text={text} icon={ExclamationTriangleIcon} />;
}

export default EmptySearch;
