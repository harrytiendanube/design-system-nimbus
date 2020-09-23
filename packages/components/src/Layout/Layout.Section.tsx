import * as React from "react";
import classNames from "classnames";

export interface InterfaceLayoutSection {
  /** React node of type children */
  children?: React.ReactNode;
  /** Main section indicator */
  isMain?: boolean;
}

/**
 * @param children React node of type children
 * @param isMain Main section indicator
 */
function Section({
  children,
  isMain = false,
}: InterfaceLayoutSection): JSX.Element {
  const mainClass = React.useMemo(
    () =>
      classNames("nimbus--layout-section", {
        "nimbus--layout-section--main": isMain,
      }),
    [isMain],
  );
  return <section className={mainClass}>{children}</section>;
}

export default React.memo(Section);
