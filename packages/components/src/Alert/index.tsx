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
  onClickPrimary?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;

  /**
   * Label of secondary action
   * */
  secondaryLabel?: string;
  /**
   * Destination link of secondary action
   * */
  secondaryTo?: string;
  /**
   * Is dismissable boolean flag
   * */
  isDismissable?: boolean;
  /**
   * Type of react mouse event onclick to manage event click and void return
   */
  onDismiss?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
 *  @param isDismissable Is dismissable boolean flag
 *  @param onDismiss Type of react mouse event onclick to manage event click and void return
 *  @param show Indicates whether the alert should be displayed
 */
function Alert({
  children,
  appearance = "primary",
  title,
  primaryLabel,
  onClickPrimary = (): void => {},
  secondaryLabel,
  secondaryTo = "",
  isDismissable = false,
  onDismiss = (): void => {},
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
      primaryLabel && (
        <Button onClick={onClickPrimary} appearance="primary">
          {primaryLabel}
        </Button>
      ),
    [primaryLabel, onClickPrimary],
  );
  const memorizedSecondary = React.useMemo(
    () => secondaryLabel && <Link href={secondaryTo}>{secondaryLabel}</Link>,
    [secondaryLabel, secondaryTo],
  );

  const memorizedDismissable = React.useMemo(
    () =>
      isDismissable && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="nimbus--alert__close" onClick={onDismiss}>
          <CloseIcon />
        </div>
      ),
    [isDismissable, onDismiss],
  );

  const withActions = (primaryLabel || secondaryLabel) && (
    <div className="nimbus--alert__actions">
      {memorizedPrimary}
      {memorizedSecondary}
    </div>
  );

  return show ? (
    <div className={`nimbus--alert nimbus--alert--${appearance}`}>
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
  ) : (
    <React.Fragment />
  );
}

Alert.defaultProps = {
  appearance: "primary",
};

export default React.memo(Alert);
