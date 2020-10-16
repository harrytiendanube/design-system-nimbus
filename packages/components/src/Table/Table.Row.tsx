import * as React from "react";

import { RowContext } from "./RowContext";

export interface InterfaceTableRow {
  /** React node of type children */
  children?: React.ReactNode;
  /** Adds a light gray background to the row */
  grayed?: boolean;
  /** Callback to be called when a row is clicked */
  onClick?: () => void;
}

/**
 * @param children React node of type children
 * @param grayed Adds a light gray background to the row
 * @param onClick Callback to be called when a row is clicked
 */
function Row({
  children,
  grayed = false,
  onClick,
}: InterfaceTableRow): JSX.Element {
  const { setRowProps } = React.useContext(RowContext);
  React.useEffect(() => {
    setRowProps({ grayed, onClick });
  }, [setRowProps, grayed, onClick]);
  return <>{children}</>;
}

export default React.memo(Row);
