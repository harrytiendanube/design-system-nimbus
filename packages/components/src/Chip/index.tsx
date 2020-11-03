import * as React from "react";

import "./Chip.css";

import { CloseIcon } from "@tiendanube/icons";
import Text from "../Text";

export interface InterfaceChip {
  /** ID */
  id: string;
  /** Text for the chip label */
  label: React.ReactText;
  /** Event to be fired upon dismissing the chip */
  onDismiss(id: string): void;
}
function Chip({ id, label, onDismiss }: InterfaceChip): JSX.Element {
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
      <Text>{label}</Text>
      <CloseIcon />
    </button>
  );
}

export default Chip;
