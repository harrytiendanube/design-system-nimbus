import * as React from "react";
import classNames from "classnames";

import { Icon as IconType } from "@tiendanube/icons";

import "./CustomInput.css";

export interface InterfaceCustomInput {
  /** Label */
  label: string;
  /** Icon to be displayed in the label */
  labelIcon?: IconType;
  /** ID of the input, used for a11y */
  id: string;
  /** React Node of type children */
  children: React.ReactNode;
  /** Force the focus state on the input. Can't be used together with disabled */
  focus?: boolean;
  /** Determines whether the input is disabled. Can't be used together with focus */
  disabled?: boolean;
}

function CustomInput({
  label,
  labelIcon: Icon,
  id,
  children,
  focus = false,
  disabled = false,
}: InterfaceCustomInput): JSX.Element {
  const className = classNames("nimbus--custom-input-wrapper");

  const fieldClassName = classNames(
    "nimbus--custom-input__field",
    { "nimbus--custom-input__field--focus": focus && !disabled },
    { "nimbus--custom-input__field--disabled": disabled && !focus },
  );

  const renderLabel = (
    <span id={id} className="nimbus--custom-input__label">
      {Icon && (
        <span className="nimbus--custom-input__label-icon">
          <Icon />
        </span>
      )}
      {label}
    </span>
  );

  return (
    <div className={className}>
      {renderLabel}
      <div className="nimbus--custom-input" aria-labelledby={id}>
        <div className={fieldClassName}>{children}</div>
      </div>
    </div>
  );
}

export default CustomInput;
