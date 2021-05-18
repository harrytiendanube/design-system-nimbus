import * as React from "react";

import "./CalloutCard.css";

import { Icon as IconType } from "@tiendanube/icons";
import classNames from "classnames";
import Text from "../Text";

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
}

function CalloutCard({
  id,
  icon: Icon,
  appearance,
  title,
  subtitle,
  onClick,
}: InterfaceCalloutCard): JSX.Element {
  const className = classNames(
    "nimbus--callout-card",
    `nimbus--callout-card--${appearance}`,
  );

  const renderSubtitle = subtitle && <Text>{subtitle}</Text>;

  const cardContent = (
    <>
      <div className="nimbus--callout-card__icon" aria-label={title}>
        <Icon size="medium" />
      </div>
      <div className="nimbus--callout-card__info">
        <Text bold>{title}</Text>
        {renderSubtitle}
      </div>
    </>
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    onClick?.(id);
  };

  return onClick ? (
    <button id={id} type="button" className={className} onClick={handleClick}>
      {cardContent}
    </button>
  ) : (
    <div className={className}>{cardContent}</div>
  );
}

export default CalloutCard;
