import * as React from "react";

import "./CalloutCard.css";

import { Icon as IconType } from "@tiendanube/icons";
import classNames from "classnames";
import Text from "../Text";

export interface InterfaceCalloutCard {
  /** Icon Component imported from @tiendanube/icons */
  icon: IconType;
  /** Appearance of the CalloutCard determines the background color */
  appearance: "primary" | "secondary" | "danger" | "warning" | "success";
  /** Title for the CalloutCard */
  title: string;
  /** Subtitle for the CalloutCard */
  subtitle: string;
}

function CalloutCard({
  icon: Icon,
  appearance,
  title,
  subtitle,
}: InterfaceCalloutCard): JSX.Element {
  const className = classNames(
    "nimbus--callout-card",
    `nimbus--callout-card--${appearance}`,
  );

  const renderSubtitle = subtitle && <Text>{subtitle}</Text>;

  return (
    <div className={className}>
      <div className="nimbus--callout-card__icon" aria-label={title}>
        <Icon size="medium" />
      </div>
      <div className="nimbus--callout-card__info">
        <Text bold>{title}</Text>
        {renderSubtitle}
      </div>
    </div>
  );
}

export default CalloutCard;
