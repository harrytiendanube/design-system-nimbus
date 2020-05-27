import * as React from "react";

import "@tiendanube/styles/css/Button.css";
import { Icon } from "../";

export interface InterfaceButton
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "className" | "style"
  > {
  /**
   * React node of type children.
   */
  children: React.ReactChildren | React.ReactChild[] | React.ReactText;
  /**
   * type of react mouse event onclick to manage event click and void return
   */
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  /**
   * Color
   */
  apparence: "primary" | "secondary" | "light" | "danger" | "transparent";
  /**
   * Icons's name to start in position left.
   */
  start?: string;
  /**
   * Icons's name to start in position rigth.
   */
  end?: string;
  /**
   * Convet button to apparence with background color transparent and border color pf apparence.
   */
  outline?: boolean;
}

/**
 * Button's Component as actionable component.
 * @Param start Icons's name to start in position left
 * @Param end Icons's name to start in position left.
 * @Param children React node of type children.
 * @Param color type of apparence "primary" | "secondary" | "light" | "danger" | "transparent"
 * @Param outline Convet button to apparence background color transparent with border color dark.
 */
const Button = ({
  children,
  start,
  end,
  apparence = "primary",
  outline = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick,
}: InterfaceButton): JSX.Element => {
  const classname = React.useMemo(
    () => `nimbus--button--${apparence}${outline ? "-outline" : ""}`,
    [apparence, outline],
  );
  const iconStart = React.useMemo(
    () => start && <Icon name={start} startPadding />,
    [start],
  );
  const iconEnd = React.useMemo(() => end && <Icon name={end} endPadding />, [
    end,
  ]);

  return (
    <button className={classname} onClick={onClick}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
};

export default React.memo(Button);
