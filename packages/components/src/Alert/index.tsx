import * as React from "react";

import "./Alert.css";
import {
  InfoCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CloseIcon,
} from "@tiendanube/icons";

import Button from "../Button";
import Link from "../Link";
import Title from "../Title";
import Text from "../Text";

interface InterfaceAlert {
  /**
   * Text to be displayed in the alert
   * */
  children: React.ReactText;
  /**
   * Appearance of the alert
   * */
  appearance?: "primary" | "secondary" | "danger" | "success" | "warning";
  /**
   * Title of the alert
   * */
  title?: string;
  /**
   * Label of primary action
   * */
  primaryLabel?: string;
  /**
   * Type of react mouse event onclick to manage event click and void return
   */
  onClickPrimary?: () => void;
  /**
   * Label of secondary action
   * */
  secondaryLabel?: string;
  /**
   * Destination link of secondary action
   * */
  secondaryTo?: string;
  /**
   * Type of react mouse event onclick to manage event click and void return
   */
  onDismiss?: () => void;
  /**
   * Indicates whether the alert should be displayed
   * */
  show?: boolean;
}
/**
 *  @param children Text to be displayed in the alert
 *  @param appearance Appearance of the alert
 *  @param title Title of the alert
 *  @param primaryLabel Label of primary action
 *  @param onClickPrimary Type of react mouse event onclick to manage event click and void return
 *  @param secondaryLabel Label of secondary action
 *  @param secondaryTo Destination link of secondary action
 *  @param onDismiss Type of react mouse event onclick to manage event click and void return
 *  @param show Indicates whether the alert should be displayed
 */
function Alert({
  children,
  appearance = "primary",
  title,
  primaryLabel,
  onClickPrimary,
  secondaryLabel,
  secondaryTo,
  onDismiss,
  show = false,
}: InterfaceAlert): JSX.Element {
  const memorizedIcon = React.useMemo(() => {
    const iconVariants = {
      primary: InfoCircleIcon,
      secondary: InfoCircleIcon,
      danger: ExclamationTriangleIcon,
      success: CheckCircleIcon,
      warning: ExclamationCircleIcon,
    };
    const Icon = iconVariants[appearance];
    return <Icon />;
  }, [appearance]);

  const memorizedPrimary = React.useMemo(
    () =>
      primaryLabel &&
      onClickPrimary && (
        <div className="nimbus--action-wrapper__item">
          <Button onClick={onClickPrimary} appearance="secondary">
            {primaryLabel}
          </Button>
        </div>
      ),
    [primaryLabel, onClickPrimary],
  );
  const memorizedSecondary = React.useMemo(
    () =>
      secondaryLabel &&
      secondaryTo && (
        <div className="nimbus--action-wrapper__item">
          <Link href={secondaryTo}>{secondaryLabel}</Link>
        </div>
      ),
    [secondaryLabel, secondaryTo],
  );

  const memorizedDismissable = React.useMemo(
    () =>
      onDismiss && (
        <button
          type="button"
          aria-label="Close"
          className="nimbus--alert__close"
          onClick={onDismiss}
        >
          <CloseIcon />
        </button>
      ),
    [onDismiss],
  );
  const withActions = (primaryLabel || secondaryLabel) && (
    <div className="nimbus--alert__actions">
      <div className="nimbus--action-wrapper">
        {memorizedPrimary}
        {memorizedSecondary}
      </div>
    </div>
  );
  const classname = React.useMemo(
    () =>
      `nimbus--alert nimbus--alert--${appearance} ${
        onDismiss ? "is-dismissable" : ""
      }`,
    [appearance, onDismiss],
  );
  return (
    <>
      {show && (
        <div className={classname} role="alert">
          <div className="nimbus--alert__icon">{memorizedIcon}</div>
          <div className="nimbus--alert__details">
            <div className="nimbus--alert__body">
              {title && <Title type="h5">{title}</Title>}
              <Text size="regular">{children}</Text>
            </div>
            {withActions}
          </div>
          {memorizedDismissable}
        </div>
      )}
    </>
  );
}

export default React.memo(Alert);
