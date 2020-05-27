import * as React from "react";
import "@tiendanube/styles/css/Alert.css";
import { Icon, Title, Text, Button, Link } from "../";

interface InterfaceAlert
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  /** Element inside tag component */
  children: React.ReactNode;
  type: "toast" | "inline";
  appearance?: "primary" | "secondary" | "danger" | "success" | "warning";
  title?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  isDismissable?: boolean;
}

function Alert({
  children,
  type = "inline",
  appearance = "primary",
  title,
  ctaPrimary,
  ctaSecondary,
  isDismissable = false,
  ...share
}: InterfaceAlert): JSX.Element {
  const icon = {
    primary: "InfoCircle",
    secondary: "InfoCircle",
    danger: "ExclamationTriangle",
    success: "CheckCircle",
    warning: "ExclamationCircle",
  }[appearance];

  const hasActions = ctaPrimary || ctaSecondary;

  return (
    <div
      {...share}
      className={`nimbus--alert--${type} nimbus--alert--${appearance}`}
    >
      <div className="nimbus--alert__icon">
        <Icon name={icon} />
      </div>
      <div className="nimbus--alert__body">
        {title && <Title type="h5">{title}</Title>}
        <Text size="regular">{children}</Text>
        {hasActions && (
          <div className="nimbus--alert__actions">
            {ctaPrimary && (
              <Button onClick={alert} color="primary">
                {ctaPrimary}
              </Button>
            )}
            {ctaSecondary && <Link>{ctaSecondary}</Link>}
          </div>
        )}
      </div>
      {isDismissable && (
        <div className="nimbus--alert__close">
          <Icon name="Times" />
        </div>
      )}
    </div>
  );
}

// Alert.defaultProps = {
//   type: "inline",
//   appearance: "primary",
//   isDismissable: false,
// };

export default Alert;
