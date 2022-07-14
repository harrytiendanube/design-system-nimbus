import * as React from "react";

import "./IconButton.css";

import { Icon as IconType } from "@tiendanube/icons";
import Tooltip from "../Tooltip";
import Text from "../Text";

export interface InterfaceIconButton {
  /** Icon Component imported from @tiendanube/icons */
  icon: IconType;
  /** Specifies the URL of the page the link goes to */
  href?: string;
  /** Specifies where to open the linked document */
  target?: "_blank" | "_parent" | "_self" | "_top";
  /** Label to be used as aria-label attribute */
  ariaLabel: string;
  /** Callback to be called when IconButton is clicked */
  onClick?: () => void;
}

function IconButton({
  icon: Icon,
  href,
  target = "_blank",
  ariaLabel,
  onClick,
}: InterfaceIconButton): JSX.Element {
  const handleOnClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!href) {
      event.preventDefault();
    }
    event.stopPropagation();
    onClick?.();
  };

  return (
    <a
      className="nimbus--icon-button__wrapper"
      onClick={handleOnClick}
      href={href}
      target={href && target}
      aria-label={ariaLabel}
      role="button"
    >
      <i className="nimbus--icon-button">
        <Tooltip labelIcon={Icon} ariaLabel={ariaLabel}>
          <Text>{ariaLabel}</Text>
        </Tooltip>
      </i>
    </a>
  );
}

const Skeleton = () => <span className="nimbus--icon-button-skeleton" />;

IconButton.Skeleton = Skeleton;

export default IconButton;
