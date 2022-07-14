import * as React from "react";

import "./CalloutCard.css";

import { ChevronRightIcon, Icon as IconType } from "@tiendanube/icons";
import classNames from "classnames";
import Text from "../Text";
import Link, { InterfaceLink } from "../Link";

export interface InterfaceCalloutCard {
  /** ID */
  id?: string;
  /** Icon Component imported from @tiendanube/icons */
  icon: IconType;
  /** Appearance of the CalloutCard determines the background color */
  appearance: "primary" | "secondary" | "danger" | "warning" | "success";
  /** Title for the CalloutCard */
  title: string;
  /** Subtitle for the CalloutCard */
  subtitle: string;
  /** Event fired when clicking the component */
  onClick?: (id: string | undefined) => void;
  /** Renders the component as skeleton */
  skeleton?: boolean;
  /** Renders an optional text link */
  textLink?: Pick<InterfaceLink, "children" | "icon" | "iconPosition">;
}

function CalloutCard({
  id,
  icon: Icon,
  appearance,
  title,
  subtitle,
  onClick,
  skeleton = false,
  textLink,
}: InterfaceCalloutCard): JSX.Element {
  const className = classNames(
    "nimbus--callout-card",
    `nimbus--callout-card--${appearance}`,
    { "nimbus--callout-card--skeleton": skeleton },
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    onClick?.(id);
  };

  const renderTitle = skeleton ? (
    <Text.Skeleton />
  ) : (
    <Text size="small" bold>
      {title}
    </Text>
  );
  const renderSubtitle =
    subtitle && skeleton ? (
      <Text.Skeleton width="fill" />
    ) : (
      <Text size="small">{subtitle}</Text>
    );

  const renderTextLink = textLink && (
    <Link
      appearance="primary"
      icon={textLink.icon}
      iconPosition={textLink.iconPosition}
      size="small"
    >
      {textLink.children}
    </Link>
  );

  const cardContent = (
    <>
      <div className="nimbus--callout-card__icon" aria-label={title}>
        {!skeleton && <Icon size="medium" />}
      </div>
      <div className="nimbus--callout-card__content">
        <div className="nimbus--callout-card__info">
          {renderTitle}
          {renderSubtitle}
          {renderTextLink}
        </div>
        {!textLink && (
          <i className="nimbus--callout-card__carat" aria-hidden="true">
            <ChevronRightIcon />
          </i>
        )}
      </div>
    </>
  );

  return onClick ? (
    <button id={id} type="button" className={className} onClick={handleClick}>
      {cardContent}
    </button>
  ) : (
    <div className={className}>{cardContent}</div>
  );
}

export default CalloutCard;
