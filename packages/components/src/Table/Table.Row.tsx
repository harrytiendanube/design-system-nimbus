import * as React from "react";

import { RowContext } from "./RowContext";

export interface InterfaceTableRow {
  /** React node of type children */
  children?: React.ReactNode;
  /** Adds a light gray background to the row */
  grayed?: boolean;
}

/**
 * @param children React node of type children
 * @param grayed Adds a light gray background to the row
 */
function Row({ children, grayed = false }: InterfaceTableRow): JSX.Element {
  const { setRowProps } = React.useContext(RowContext);
  React.useEffect(() => {
    setRowProps({ grayed });
  }, [setRowProps, grayed]);
  return <>{children}</>;
}

export default React.memo(Row);
