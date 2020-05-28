/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";

import "@tiendanube/styles/css/Alert.css";
import { Icon, Title, Text, Button, Link } from "../";

interface InterfaceAlert {
  /**
   * React node of type children
   * */
  children: React.ReactNode;
  /**
   * Type
   * */
  type: "toast" | "inline";
  /**
   * Appearance
   * */
  appearance?: "primary" | "secondary" | "danger" | "success" | "warning";
  /**
   * Title
   * */
  title?: string;
  /**
   * Label of primary action
   * */
  primaryLabel?: string;
  /**
   * Ttype of react mouse event onclick to manage event click and void return
   */
  onClickPrimary?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  /**
   * Label of secundary action
   * */
  secondaryLabel?: string;
  /**
   * Destination link of secundary action
   * */
  secondaryTo?: string;
  /**
   * Is dismissable boolean flag
   * */
  isDismissable?: boolean;
}
/**
 *  @param children React node of type children
 *  @param type Type
 *  @param appearance Appearance
 *  @param title Title
 *  @param primaryLabel Label of primary action
 *  @param onClickPrimary Ttype of react mouse event onclick to manage event click and void return
 *  @param secondaryLabel Label of secundary action
 *  @param secondaryTo Destination link of secundary action
 *  @param isDismissable Is dismissable boolean flag
 */
function Alert({
  children,
  type = "inline",
  appearance = "primary",
  title,
  primaryLabel,
  onClickPrimary = (): void => {},
  secondaryLabel,
  secondaryTo,
  isDismissable = false,
}: InterfaceAlert): JSX.Element {
  const icon = {
    primary: "InfoCircle",
    secondary: "InfoCircle",
    danger: "ExclamationTriangle",
    success: "CheckCircle",
    warning: "ExclamationCircle",
  }[appearance];

  const hasActions = primaryLabel || secondaryLabel;

  const [show, setShow] = React.useState(true);

  if (show)
    return (
      <div className={`nimbus--alert--${type} nimbus--alert--${appearance}`}>
        <div className="nimbus--alert__icon">
          <Icon name={icon} />
        </div>
        <div className="nimbus--alert__body">
          {title && <Title type="h5">{title}</Title>}
          <Text size="regular">{children}</Text>
          {hasActions && (
            <div className="nimbus--alert__actions">
              {primaryLabel && (
                <Button onClick={onClickPrimary} color="primary">
                  {primaryLabel}
                </Button>
              )}
              {secondaryLabel && (
                <Link href={secondaryTo}>{secondaryLabel}</Link>
              )}
            </div>
          )}
        </div>
        {isDismissable && (
          <div
            className="nimbus--alert__close"
            onClick={(): void => setShow(false)}
          >
            <Icon name="Times" />
          </div>
        )}
      </div>
    );
  else return <React.Fragment />;
}

export default Alert;
