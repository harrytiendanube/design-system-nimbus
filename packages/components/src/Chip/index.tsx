import * as React from "react";

import "./Chip.css";

import { CloseIcon, Icon as IconType } from "@tiendanube/icons";
import Text from "../Text";

export interface InterfaceChip {
  /** ID */
  id: string;
  /** Text for the chip label */
  label: React.ReactText;
  /** Icon for the chip label */
  icon?: IconType;
  /** Event to be fired upon dismissing the chip */
  onDismiss(id: string): void;
}
function Chip({
  id,
  label,
  icon: Icon,
  onDismiss,
}: InterfaceChip): JSX.Element {
  const handleClick = () => {
    onDismiss(id);
  };
  return (
    <button
      type="button"
      id={id}
      className="nimbus--chip"
      onClick={handleClick}
    >
      {Icon && (
        <div className="nimbus--chip__icon">
          <Icon />
        </div>
      )}
      <Text size="tiny">{label}</Text>
      <div className="nimbus--chip__close">
        <CloseIcon />
      </div>
    </button>
  );
}

export default Chip;
