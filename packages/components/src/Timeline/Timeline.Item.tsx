import * as React from "react";
import classNames from "classnames";

import { Icon as IconType } from "@tiendanube/icons";
import { Text } from "..";

export interface InterfaceTimelineItem {
  /** Icon Component imported from @tiendanube/icons */
  icon?: IconType;
  /** Type of appearance */
  appearance?:
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success";
  /** Title */
  title: string;
  /** Description */
  description?: string;
  /** Date */
  date: string;
  /** Time */
  time: string;
}

/**
 * @param iconIcon Component imported from @tiendanube/icons
 * @param appearance Type of appearance
 * @param title Title
 * @param description Description
 * @param date Date
 * @param time Time
 */

function Item({
  icon: Icon,
  appearance = "default",
  title,
  description,
  date,
  time,
}: InterfaceTimelineItem): JSX.Element {
  const iconClass = React.useMemo(
    () =>
      classNames(
        "nimbus--timeline-icon",
        `nimbus--timeline-icon--${appearance}`,
      ),
    [appearance],
  );
  const memorizedIcon = React.useMemo(
    () =>
      Icon ? (
        <div className={iconClass}>
          <Icon />
        </div>
      ) : (
        <div className="nimbus--timeline-no-icon" />
      ),
    [Icon, iconClass],
  );
  const memorizedDescription = React.useMemo(
    () =>
      description && (
        <Text appearance="light" size="small">
          {description}
        </Text>
      ),
    [description],
  );
  return (
    <div className="nimbus--timeline-item">
      {memorizedIcon}
      <div className="nimbus--timeline-item__details">
        <div className="nimbus--timeline-item__info">
          <Text size="small">{title}</Text>
          {memorizedDescription}
        </div>
        <div className="nimbus--timeline-item__timestamp">
          <Text textAlign="right" size="small">
            {date}
          </Text>
          <Text textAlign="right" appearance="light" size="small">
            {time}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Item);
