import * as React from "react";

import "./Popover.css";

import classNames from "classnames";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
} from "@tiendanube/icons";
import { Title, Button } from "..";

interface InterfacePopover {
  /** Name of the Popover */
  name: string;
  /** Label of the Popover */
  label?: string;
  /** Text of the Popover */
  title?: string;
  /** React node of type children */
  children: React.ReactNode;
  /** Determines whether the initiator is a button or an icon */
  isMenu?: boolean;
  /** Determines the position of the popover menu */
  position?: "left" | "right";
}

/**
 * @param name Of the Popover
 * @param label Of the Popover
 * @param title Text of the Popover
 * @param children React node of type children
 * @param isMenu Determines whether the initiator is a button or an icon
 * @param position Determines the position of the popover menu
 */
const Popover = React.memo(function Popover({
  name,
  label,
  title,
  children,
  isMenu,
  position = "left",
}: InterfacePopover): JSX.Element {
  const [active, setActive] = React.useState(false);

  const className = React.useMemo(
    () =>
      classNames("nimbus--popover-wrapper", {
        "position--right": position === "right",
      }),
    [position],
  );

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
          className={className}
          role="dialog"
        >
          {memorizedTitle}
          <div className="nimbus--popover-body">{children}</div>
        </div>
      ),
    [active, children, className, memorizedTitle, name],
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
      event.composedPath().forEach((el: HTMLElement) => {
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
        {isMenu ? (
          <Button
            link
            icon={EllipsisIcon}
            iconSize="medium"
            appearance="secondary"
            onClick={handleClick}
          />
        ) : (
          <Button
            link
            icon={active ? ChevronUpIcon : ChevronDownIcon}
            iconPosition="end"
            appearance="default"
            onClick={handleClick}
          >
            {label}
          </Button>
        )}
      </div>
      {memorizedActive}
    </div>
  );
}) as React.NamedExoticComponent<InterfacePopover> & {
  Skeleton: typeof Skeleton;
};

const Skeleton = () => <div className="nimbus--popover-skeleton" />;

Popover.Skeleton = Skeleton;

export default Popover;
