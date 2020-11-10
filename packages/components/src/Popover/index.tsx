import * as React from "react";

import "./Popover.css";

import classNames from "classnames";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
} from "@tiendanube/icons";
import { Title, Link } from "..";

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

function Popover({
  name,
  label,
  title,
  children,
  isMenu,
  position = "left",
}: InterfacePopover): JSX.Element {
  const [active, setActive] = React.useState(false);

  const className = classNames("nimbus--popover-wrapper", {
    "position--right": position === "right",
  });

  const renderTitle = title && (
    <div className="nimbus--popover-header">
      <Title type="h5">{title}</Title>
    </div>
  );

  const renderActive = active && (
    <div
      id={`nimbus-popover-wrapper-${name}`}
      className={className}
      role="dialog"
    >
      {renderTitle}
      <div className="nimbus--popover-body">{children}</div>
    </div>
  );

  const handleClick = () => {
    setActive((currentActive) => !currentActive);
  };

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
          <Link
            icon={EllipsisIcon}
            iconSize="medium"
            appearance="secondary"
            onClick={handleClick}
          />
        ) : (
          <Link
            icon={active ? ChevronUpIcon : ChevronDownIcon}
            iconPosition="end"
            appearance="default"
            onClick={handleClick}
          >
            {label}
          </Link>
        )}
      </div>
      {renderActive}
    </div>
  );
}

const Skeleton = () => <div className="nimbus--popover-skeleton" />;

Popover.Skeleton = Skeleton;

export default Popover;
