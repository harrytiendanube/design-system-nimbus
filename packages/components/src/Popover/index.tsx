import * as React from "react";

import "./Popover.css";

import classNames from "classnames";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
} from "@tiendanube/icons";
import { Title, Link, InterfaceLink } from "..";

export interface InterfacePopover {
  /** Name of the Popover */
  name: string;
  /** Label of the Popover */
  label?: string;
  /** Text of the Popover */
  title?: string;
  /** React node of type children */
  children?: React.ReactNode;
  /** Determines whether the initiator is a button or an icon */
  menu?: (
    | Pick<InterfaceLink, "children" | "appearance" | "onClick" | "icon">
    | "skeleton"
  )[];
  /** Custom Render Prop Initiator */
  renderInitiator?: (onClick: () => void, onBlur: () => void) => JSX.Element;
  /** Determines the position of the popover menu */
  position?: "left" | "right";
}

function Popover({
  name,
  label,
  title,
  children,
  menu,
  renderInitiator,
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
      onTouchStart={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {renderTitle}
      <div className="nimbus--popover-body">
        {menu ? (
          <ul className="nimbus--popover-menu">
            {menu.map((option, index) =>
              option !== "skeleton" ? (
                <li key={index} className="nimbus--popover-menu__item">
                  <Link
                    onClick={() => {
                      option.onClick?.();
                      setActive(false);
                    }}
                    icon={option.icon}
                    appearance={option.appearance}
                  >
                    {option.children}
                  </Link>
                </li>
              ) : (
                <Link.Skeleton key={index} />
              ),
            )}
          </ul>
        ) : (
          children
        )}
      </div>
    </div>
  );

  const handleClick = () => {
    setActive((currentActive) => !currentActive);
  };

  const handleBlur = () => {
    setActive(false);
  };

  const getTagFromEvent = (target: HTMLElement) =>
    target.tagName.toLocaleLowerCase();

  const handleClickOnDiv = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const tag = getTagFromEvent(event.target as HTMLElement);
    if (tag === "div") setActive(() => false);
  };

  const handleTouchOnDiv = (event: React.TouchEvent<HTMLDivElement>) => {
    switch (getTagFromEvent(event.target as HTMLElement)) {
      case "div":
        setActive(() => false);
        break;
      case "a":
        event.stopPropagation();
        break;
      case "svg":
        event.stopPropagation();
        break;
      default:
    }
  };

  const handleClickGlobal = React.useCallback(
    (event) => {
      let clickOnInside = false;
      let clickOnInitiator = false;
      event.composedPath().forEach((el: HTMLElement) => {
        const currentClassName = el.className || "";
        if (
          currentClassName.toString().indexOf("nimbus--popover-wrapper") >= 0
        ) {
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
    if (active) {
      document.addEventListener("click", handleClickGlobal, false);
      document.addEventListener("touchstart", handleClickGlobal, false);
    } else {
      document.removeEventListener("click", handleClickGlobal, false);
      document.removeEventListener("touchstart", handleClickGlobal, false);
    }
    return () => {
      document.removeEventListener("click", handleClickGlobal, false);
      document.removeEventListener("touchstart", handleClickGlobal, false);
    };
  }, [active, handleClickGlobal]);

  const renderMenuOrDefault = menu ?
    <Link
      icon={EllipsisIcon}
      iconSize="medium"
      appearance="secondary"
      onClick={handleClick}
    > {label} </Link>
    :
    <Link
      icon={active ? ChevronUpIcon : ChevronDownIcon}
      iconPosition="end"
      appearance="default"
      onClick={handleClick}
    >
      {label}
    </Link>

  return (
    <div
      id={`nimbus-popover-${name}`}
      className="nimbus--popover"
      role="presentation"
      onClick={handleClickOnDiv}
      onTouchStart={handleTouchOnDiv}
    >
      <div id={`nimbus-popover-initiator-${name}`}>
        {
          renderInitiator ? renderInitiator(handleClick, handleBlur) : renderMenuOrDefault
        }
      </div>
      {renderActive}
    </div>
  );
}

const Skeleton = () => <div className="nimbus--popover-skeleton" />;

Popover.Skeleton = Skeleton;

export default Popover;
