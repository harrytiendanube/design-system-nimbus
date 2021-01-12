import * as React from "react";
import * as ReactDOM from "react-dom";

import classNames from "classnames";

import {
  TiendanubeIcon,
  ExternalLinkIcon,
  Icon as IconType,
} from "@tiendanube/icons";
import Item from "./Menu.Item";
import Section from "./Menu.Section";
import { Title, Stack } from "..";

import "./Menu.css";

export { InterfaceMenuItem } from "./Menu.Item";

export interface InterfaceFooterMenu {
  label: string;
  icon: IconType;
  onClick: () => void;
}

export interface InterfaceMenu {
  /** React node of type children */
  children: React.ReactNode;
  /** Title */
  title: string;
  /** Align-items */
  href: string;
  /** Spacing between children */
  footer: InterfaceFooterMenu;
  /** Open menu callback */
  show?: boolean;
  /** Side from which the menu emerges */
  position?: "left" | "right";
  /** OnClose callback */
  onClose: () => void;
}

function Menu({
  children,
  title,
  href,
  footer,
  onClose,
  show = false,
  position = "right",
}: InterfaceMenu): JSX.Element {
  const FooterIcon = footer.icon;

  const handleClickOutside = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((event.target as HTMLElement).id === "nimbus--menu") {
        onClose?.();
      }
    },
    [onClose],
  );

  const wrapperClassName = classNames(
    "nimbus--menu",
    { "is--visible": show },
    `position--${position}`,
  );

  const container: HTMLElement = React.useMemo(
    () => document.createElement("div"),
    [],
  );

  const bodyClassName = "nimbus--menu--open";

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  React.useEffect(() => {
    if (show) {
      document.body.classList.add(bodyClassName);
    } else {
      document.body.classList.remove(bodyClassName);
    }
    return () => {
      document.body.classList.remove(bodyClassName);
    };
  }, [show]);

  const element: JSX.Element = (
    <div
      id="nimbus--menu"
      className={wrapperClassName}
      role="presentation"
      onClick={handleClickOutside}
    >
      <div className="nimbus--menu-wrapper">
        <div className="nimbus--menu-header">
          <Stack justify="space-between">
            <Stack.Item fill>
              <Stack spacing="tight">
                <Stack.Item>
                  <TiendanubeIcon size="medium" />
                </Stack.Item>
                <Stack.Item>
                  <Title type="h5">{title}</Title>
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <a
                href={href}
                aria-label={title}
                className="nimbus--menu-header__action"
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLinkIcon />
              </a>
            </Stack.Item>
          </Stack>
        </div>
        <div className="nimbus--menu-body">{children}</div>
        <div className="nimbus--menu-footer">
          <button
            type="button"
            onClick={footer.onClick}
            className="nimbus--menu-item"
          >
            <FooterIcon />
            {footer.label}
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(element, container);
}

Menu.Section = Section;
Menu.Item = Item;

export default Menu;
