import * as React from "react";

import "./Tooltip.css";

import { Icon as IconType } from "@tiendanube/icons";

interface InterfaceTooltip {
  /**
   * Name of the Tooltip
   * */
  name: string;
  /**
   * Icon label for the tooltip
   * */
  labelIcon?: IconType;
  /**
   * Text Label for the Tooltip
   * */
  labelText: string;
  /**
   * Position of the tooltip
   */
  position?: "top" | "bottom" | "left" | "right";
  /**
   * React node of type children
   */
  children: React.ReactNode;
}

/**
 *  @param name Name of the Tooltip
 *  @param labelIcon Icon label for the tooltip
 *  @param labelText Text Label for the Tooltip
 *  @param position Position of the tooltip
 *  @param children React node of type children
 */

function Tooltip({
  name,
  labelIcon: Icon,
  labelText,
  position,
  children,
}: InterfaceTooltip): JSX.Element {
  const [isMouse, setIsMouse] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const memorizedActive = React.useMemo(
    () =>
      active && (
        <div
          id={`nimbus-tooltip-wrapper-${name}`}
          className={`nimbus--tooltip-wrapper nimbus--tooltip-wrapper--${position}`}
          role="dialog"
        >
          <div className="nimbus--tooltip__caret" />
          <div className="nimbus--tooltip__content">{children}</div>
        </div>
      ),
    [active, children, name, position],
  );

  const memorizedIcon = React.useMemo(
    () => (Icon ? <Icon /> : `${labelText}`),
    [Icon, labelText],
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!isMouse) {
        setActive((currentActive) => !currentActive);
      }
    },
    [isMouse],
  );

  const handleMouseEnter = React.useCallback(() => {
    if (!isMouse) setIsMouse(true);
    setActive(true);
  }, [isMouse]);

  const handleMouseLeave = React.useCallback(() => {
    setActive(false);
  }, []);

  return (
    <>
      <div
        className="nimbus--tooltip"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="tooltip"
      >
        <button
          id={`nimbus-tooltip-initiator-${name}`}
          className="nimbus--tooltip-trigger"
          aria-label={labelText}
          type="button"
          onClick={handleClick}
        >
          {memorizedIcon}
        </button>
        {memorizedActive}
      </div>
    </>
  );
}

Tooltip.defaultProps = {
  position: "top",
};

export default React.memo(Tooltip);
