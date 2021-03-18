import * as React from "react";

import {
  TiendanubeIcon,
  ExternalLinkIcon,
  Icon as IconType,
} from "@tiendanube/icons";

import Item from "./Menu.Item";
import Section from "./Menu.Section";

import { Title, Stack, IconButton } from "..";

import "./Menu.css";

export { InterfaceMenuItem } from "./Menu.Item";

export interface InterfaceFooterMenu {
  /** Label */
  label: string;
  /** Icon */
  icon: IconType;
  /** OnClick */
  onClick: () => void;
}

export interface InterfaceBaseMenu {
  /** React node of type children */
  children: React.ReactNode;
  /** Title */
  title: string;
  /** Href Link */
  href: string;
  /** Footer */
  footer: InterfaceFooterMenu;
}

function BaseMenu({
  title,
  href,
  children,
  footer,
}: InterfaceBaseMenu): JSX.Element {
  const IconFooter = footer.icon;
  return (
    <>
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
            <IconButton icon={ExternalLinkIcon} ariaLabel={title} href={href} />
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
          <IconFooter />
          {footer.label}
        </button>
      </div>
    </>
  );
}

BaseMenu.Section = Section;
BaseMenu.Item = Item;

export default BaseMenu;
