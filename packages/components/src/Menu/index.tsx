import * as React from "react";

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
}

function Menu({ children, title, href, footer }: InterfaceMenu): JSX.Element {
  const mainClass = classNames("nimbus--menu-wrapper");
  const FooterIcon = footer.icon;

  return (
    <div className={mainClass}>
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
              target="_blank"
              rel="noreferrer"
              className="nimbus--menu-header__action"
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
  );
}

Menu.Section = Section;
Menu.Item = Item;

export default Menu;
