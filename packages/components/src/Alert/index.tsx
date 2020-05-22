import * as React from "react";
import "@tiendanube/styles/css/Alert.css";
import { Icon, Title, Text, Button, Link } from "../";

interface Props
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "children"> {
  /** Element inside tag component */
  children: React.ReactNode;
  type: "toast" | "inline";
  color: "primary" | "secondary" | "danger" | "success" | "warning";
  title?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  isDismissable?: boolean;
}

const Alert: React.FC<Props> = ({
  children,
  type,
  color,
  title,
  ctaPrimary,
  ctaSecondary,
  isDismissable,
  ...share
}: Props) => {
  const icon = {
    primary: "InfoCircle",
    secondary: "InfoCircle",
    danger: "ExclamationTriangle",
    success: "CheckCircle",
    warning: "ExclamationCircle",
  }[color];

  const hasActions = ctaPrimary || ctaSecondary;

  return (
    <div
      {...share}
      className={`nimbus--alert--${type} nimbus--alert--${color}`}
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
};

Alert.defaultProps = {
  type: "inline",
  color: "primary",
  isDismissable: false,
};

export default Alert;
