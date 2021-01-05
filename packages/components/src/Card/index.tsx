import * as React from "react";

import "./Card.css";

import { Icon as IconType, ChevronDownIcon } from "@tiendanube/icons";

import {
  Title,
  Button,
  Label,
  InterfaceButton,
  InterfaceLabel,
  Stack,
} from "..";

interface InterfaceCard {
  /** Text to be displayed in the label */
  title: string;
  /** React node of type children */
  children: React.ReactNode;
  /** Primary action button */
  primaryButton?: InterfaceButton | "skeleton";
  /** Secondary action button */
  secondaryButton?: InterfaceButton | "skeleton";
  /** Indicates if Card is collapsible or not */
  isCollapsible?: boolean;
  /** Label to show on the header of the Card */
  headerLabel?: InterfaceLabel | "skeleton";
  /** Icon (imported from @tiendanube/icons) to show on the header of the Card */
  headerIcon?: IconType;
  /** Callback to be called when Icon header is clicked */
  onClickHeaderIcon?: () => void;
}

/**
 * @param title Text to be displayed in the label
 * @param children React node of type children
 * @param primaryButton Primary action button
 * @param secondaryButton Secondary action button
 * @param isCollapsible Indicates if Card is collapsible or not
 * @param headerIcon Icon (imported from @tiendanube/icons) to show on the
 *     header of the Card
 * @param label Label to show on the header of the Card
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
      primaryButton === "skeleton" ? (
        <Stack.Item>
          <Button.Skeleton />
        </Stack.Item>
      ) : (
        primaryButton?.onClick && (
          <Stack.Item>
            <Button
              onClick={primaryButton.onClick}
              appearance="primary"
              spinner={primaryButton.spinner}
              disabled={primaryButton.disabled}
            >
              {primaryButton.children}
            </Button>
          </Stack.Item>
        )
      ),
    [primaryButton],
  );

  const memorizedSecondary = React.useMemo(
    () =>
      secondaryButton === "skeleton" ? (
        <Stack.Item>
          <Button.Skeleton />
        </Stack.Item>
      ) : (
        secondaryButton?.onClick && (
          <Stack.Item>
            <Button
              onClick={secondaryButton.onClick}
              spinner={secondaryButton.spinner}
              disabled={secondaryButton.disabled}
            >
              {secondaryButton.children}
            </Button>
          </Stack.Item>
        )
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
      headerLabel === "skeleton" ? (
        <Stack.Item>
          <Label.Skeleton />
        </Stack.Item>
      ) : (
        headerLabel?.id && (
          <Label
            id={headerLabel.id}
            icon={headerLabel.icon}
            label={headerLabel.label}
            appearance={headerLabel.appearance}
            onClick={headerLabel.onClick}
          />
        )
      ),
    [headerLabel],
  );

  const memorizedCollapsibleButton = React.useMemo(
    () =>
      isCollapsible && (
        <span
          className={`nimbus--card-header__collapse ${open ? "is-open" : ""}`}
        >
          <ChevronDownIcon />
        </span>
      ),
    [isCollapsible, open],
  );

  const memorizedChildren = React.useMemo(
    () => (
      <>
        {children && <div className="nimbus--card-body">{children}</div>}
        {(secondaryButton || primaryButton) && (
          <div className="nimbus--card-footer">
            <Stack spacing="tight">
              {memorizedSecondary}
              {memorizedPrimary}
            </Stack>
          </div>
        )}
      </>
    ),
    [
      children,
      memorizedPrimary,
      memorizedSecondary,
      primaryButton,
      secondaryButton,
    ],
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
      {isCollapsible ? (
        <button
          type="button"
          aria-label="Expand"
          className="nimbus--card-header is-collapsible"
          onClick={handleCollapse}
        >
          <div className="nimbus--card-header__title">
            <Title type="h3">{title}</Title>
          </div>
          {memorizedHeaderLabel}
          {memorizedHeaderAction}
          {memorizedCollapsibleButton}
        </button>
      ) : (
        <div className="nimbus--card-header">
          <div className="nimbus--card-header__title">
            <Title type="h3">{title}</Title>
          </div>
          {memorizedHeaderLabel}
          {memorizedHeaderAction}
          {memorizedCollapsibleButton}
        </div>
      )}
      {memorizedCollapsibleChildren}
    </div>
  );
}

export default React.memo(Card);
