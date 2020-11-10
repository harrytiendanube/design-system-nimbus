import * as React from "react";

import "./EmptyState.css";

import Title from "../Title";
import Button from "../Button";
import Link from "../Link";

export interface InterfaceEmptyState {
  /** Image URL for the empty state. */
  image: string;
  /** Title of the EmptyState */
  title?: string;
  /** Label of primary action */
  primaryActionLabel?: string;
  /** Label of secondary action */
  secondaryActionLabel?: string;
  /** OnClickPrimary callback function */
  onClickPrimary?: () => void;
  /** OnClickSecondary callback function */
  onClickSecondary?: () => void;
  /** Defines whether the component should be full width or not. */
  fullWidth?: boolean;
  /** Component to render in empty state body. */
  children: React.ReactNode;
}

function EmptyState({
  image,
  title,
  primaryActionLabel,
  secondaryActionLabel,
  onClickPrimary,
  onClickSecondary,
  fullWidth = false,
  children,
}: InterfaceEmptyState): JSX.Element {
  const classname = fullWidth
    ? `nimbus--empty-state is-full-width`
    : `nimbus--empty-state`;

  const renderTitle = title && (
    <div className="nimbus--empty-state__heading">
      <Title type="h2">{title}</Title>
    </div>
  );

  const renderPrimary = primaryActionLabel && onClickPrimary && (
    <div className="nimbus--action-wrapper__item">
      <Button onClick={onClickPrimary} appearance="primary">
        {primaryActionLabel}
      </Button>
    </div>
  );

  const renderSecondary = secondaryActionLabel && onClickSecondary && (
    <div className="nimbus--action-wrapper__item">
      <Link onClick={onClickSecondary} appearance="primary">
        {secondaryActionLabel}
      </Link>
    </div>
  );

  return (
    <div className={classname}>
      <div className="nimbus--empty-state__image">
        <img src={image} alt={title} />
      </div>
      <div className="nimbus--empty-state__content">
        {renderTitle}
        <div className="nimbus--empty-state__body">{children}</div>
        <div className="nimbus--action-wrapper">
          {renderPrimary}
          {renderSecondary}
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
