import * as React from "react";

import "./Card.css";

import { Icon as IconType, ChevronDownIcon } from "@tiendanube/icons";

import { Title, Button, Label, InterfaceButton, InterfaceLabel } from "..";

interface InterfaceCard {
  /**
   * Text to be displayed in the label
   * */
  title: string;
  /**
   * React node of type children
   * */
  children: React.ReactNode;
  /**
   * Primary action button
   * */
  primaryButton?: InterfaceButton;
  /**
   * Secondary action button
   * */
  secondaryButton?: InterfaceButton;
  /**
   * Indicates if Card is collapsible or not
   */
  isCollapsible?: boolean;
  /**
   * Label to show on the header of the Card
   */
  headerLabel?: InterfaceLabel;
  /**
   * Icon (imported from @tiendanube/icons) to show on the header of the Card
   */
  headerIcon?: IconType;
  /**
   * Callback to be called when Icon header is clicked
   */
  onClickHeaderIcon?: () => void;
}

/**
 *  @param title Text to be displayed in the label
 *  @param children React node of type children
 *  @param primaryButton Primary action button
 *  @param secondaryButton Secondary action button
 *  @param isCollapsible Indicates if Card is collapsible or not
 *  @param headerIcon Icon (imported from @tiendanube/icons) to show on the header of the Card
 *  @param label Label to show on the header of the Card
 */

function Card({
  title,
  children,
  primaryButton,
  secondaryButton,
  isCollapsible,
  headerLabel,
  headerIcon: Icon,
  onClickHeaderIcon,
}: InterfaceCard): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleCollapse = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setOpen((currentOpen) => !currentOpen);
    },
    [],
  );

  const memorizedPrimary = React.useMemo(
    () =>
      primaryButton?.onClick && (
        <div className="nimbus--action-wrapper__item">
          <Button onClick={primaryButton.onClick} appearance="primary">
            {primaryButton.children}
          </Button>
        </div>
      ),
    [primaryButton],
  );

  const memorizedSecondary = React.useMemo(
    () =>
      secondaryButton?.onClick && (
        <div className="nimbus--action-wrapper__item">
          <Button onClick={secondaryButton.onClick}>
            {secondaryButton.children}
          </Button>
        </div>
      ),
    [secondaryButton],
  );

  const memorizedHeaderAction = React.useMemo(
    () =>
      Icon &&
      onClickHeaderIcon && (
        <button
          type="button"
          aria-label={title}
          className="nimbus--card-header__action"
          onClick={onClickHeaderIcon}
        >
          <Icon />
        </button>
      ),
    [Icon, title, onClickHeaderIcon],
  );

  const memorizedHeaderLabel = React.useMemo(
    () =>
      headerLabel?.id && (
        <Label
          id={headerLabel.id}
          icon={headerLabel.icon}
          label={headerLabel.label}
          appearance={headerLabel.appearance}
          onClick={headerLabel.onClick}
        />
      ),
    [headerLabel],
  );

  const memorizedCollapsibleButton = React.useMemo(
    () =>
      isCollapsible && (
        <button
          type="button"
          aria-label="Expand"
          className={`nimbus--card-header__collapse ${open ? "is-open" : ""}`}
          onClick={handleCollapse}
        >
          <ChevronDownIcon />
        </button>
      ),
    [isCollapsible, handleCollapse, open],
  );

  const memorizedChildren = React.useMemo(
    () => (
      <>
        <div className="nimbus--card-body">{children}</div>
        <div className="nimbus--card-footer">
          <div className="nimbus--action-wrapper">
            {memorizedSecondary}
            {memorizedPrimary}
          </div>
        </div>
      </>
    ),
    [children, memorizedPrimary, memorizedSecondary],
  );

  const memorizedCollapsibleChildren = React.useMemo(
    () => (
      <>
        {isCollapsible ? (
          <div className={`nimbus--card-collapse ${open ? "is-open" : ""}`}>
            {memorizedChildren}
          </div>
        ) : (
          <>{memorizedChildren}</>
        )}
      </>
    ),
    [isCollapsible, memorizedChildren, open],
  );

  return (
    <div className="nimbus--card-wrapper">
      <div
        className={`nimbus--card-header ${
          isCollapsible ? "is-collapsible" : ""
        }`}
      >
        <div className="nimbus--card-header__title">
          <Title type="h3">{title}</Title>
        </div>
        {memorizedHeaderLabel}
        {memorizedHeaderAction}
        {memorizedCollapsibleButton}
      </div>
      {memorizedCollapsibleChildren}
    </div>
  );
}

export default React.memo(Card);
