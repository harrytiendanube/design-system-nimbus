import * as React from "react";

import "./Popover.css";

import { Title, Button } from "..";
import { ChevronDownIcon, ChevronUpIcon } from "@tiendanube/icons";

interface InterfacePopover {
  /**
   * Name of the Popover
   * */
  name: string;
  /**
   * Label of the Popover
   * */
  label: string;
  /**
   * Text of the Popover
   * */
  title?: string;
  /**
   * React node of type children
   */
  children: React.ReactNode;
}

/**
 *  @param name of the Popover
 *  @param label of the Popover
 *  @param title Text of the Popover
 *  @param children React node of type children
 */

function Popover({
  name,
  label,
  title,
  children,
}: InterfacePopover): JSX.Element {
  const [active, setActive] = React.useState(false);

  const memorizedTitle = React.useMemo(
    () =>
      title && (
        <div className="nimbus--popover-header">
          <Title type="h5">{title}</Title>
        </div>
      ),
    [title],
  );

  const memorizedActive = React.useMemo(
    () =>
      active && (
        <div
          id={`nimbus-popover-wrapper-${name}`}
          className="nimbus--popover-wrapper"
          role="dialog"
        >
          {memorizedTitle}
          <div className="nimbus--popover-body">{children}</div>
        </div>
      ),
    [active, children, memorizedTitle, name],
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setActive((currentActive) => !currentActive);
    },
    [],
  );

  const handleClickGlobal = React.useCallback(
    (event) => {
      let clickOnInside = false;
      let clickOnInitiator = false;
      event.composedPath()?.forEach((el: HTMLElement) => {
        if (el.className === "nimbus--popover-wrapper") {
          clickOnInside = true;
        }
        if (el.id === `nimbus-popover-initiator-${name}`) {
          clickOnInitiator = true;
        }
      });
      if (!clickOnInitiator && !clickOnInside) {
        setActive(false);
      }
    },
    [name],
  );

  React.useEffect(() => {
    document.addEventListener("click", handleClickGlobal, false);
    return () => {
      document.removeEventListener("click", handleClickGlobal, false);
    };
  }, [handleClickGlobal]);

  return (
    <div
      id={`nimbus-popover-${name}`}
      className="nimbus--popover"
      role="presentation"
    >
      <div id={`nimbus-popover-initiator-${name}`}>
        <Button
          link
          icon={active ? ChevronUpIcon : ChevronDownIcon}
          iconPosition="end"
          appearance="default"
          onClick={handleClick}
        >
          {label}
        </Button>
      </div>
      {memorizedActive}
    </div>
  );
}

export default React.memo(Popover);
