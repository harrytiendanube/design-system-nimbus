import * as React from "react";

import "./Label.css";

import { Icon as IconType } from "@tiendanube/icons";

export interface InterfaceLabel {
  /**
   * ID
   */
  id: string;
  /**
   * Appearance
   */
  appearance?:
    | "primary"
    | "secondary"
    | "default"
    | "warning"
    | "danger"
    | "success";
  /**
   * Icon Component imported from @tiendanube/icons
   */
  icon?: IconType;
  /**
   * Text for the label
   */
  label: React.ReactText;
  /**
   *  Event to be fired upon clicking the Label
   */
  onClick?: (id: string) => void;
}
/**
 *  @param id ID
 *  @param appearance Appearance
 *  @param icon Icon Component imported from @tiendanube/icons
 *  @param label Text for the label
 *  @param onClick Event to be fired upon clicking the Label
 */
function Label({
  id,
  appearance,
  icon: Icon,
  label,
  onClick,
}: InterfaceLabel): JSX.Element {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      event.stopPropagation();
      onClick?.(id);
    },
    [id, onClick],
  );

  const className = React.useMemo(
    () => `nimbus--label nimbus--label--${appearance}`,
    [appearance],
  );
  const memorizedIcon = React.useMemo(() => Icon && <Icon />, [Icon]);

  const memorizedButton = React.useMemo(
    () =>
      onClick && (
        <button
          type="button"
          id={id}
          className={className}
          onClick={handleClick}
        >
          {memorizedIcon}
          {label}
        </button>
      ),
    [className, handleClick, id, label, memorizedIcon, onClick],
  );

  const memorizedSpan = React.useMemo(
    () =>
      !onClick && (
        <span id={id} className={className} role="status">
          {memorizedIcon}
          {label}
        </span>
      ),
    [className, id, label, memorizedIcon, onClick],
  );

  return (
    <>
      {memorizedButton}
      {memorizedSpan}
    </>
  );
}

Label.defaultProps = {
  appearance: "default",
};

export default React.memo(Label);
