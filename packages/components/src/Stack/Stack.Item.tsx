import * as React from "react";
import classNames from "classnames";

export interface InterfaceStackItem {
  /** React node of type children */
  children?: React.ReactNode;
  /**  */
  fill?: boolean;
}

/**
 * @param children React node of type children
 * @param fill Define whether the item should stretch beyond it's limit
 */
function Item({ children, fill = false }: InterfaceStackItem): JSX.Element {
  const mainClass = React.useMemo(
    () =>
      classNames("nimbus--stack-item", {
        "stack-item--fill": fill,
      }),
    [fill],
  );
  return <div className={mainClass}>{children}</div>;
}

export default React.memo(Item);
