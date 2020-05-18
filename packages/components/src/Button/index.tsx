import * as React from "react";
import "@tiendanube/styles/css/Button.css";
import { Icon } from "../";

interface Props
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "className" | "style"
  > {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: React.ReactNode;
  /**
   * Click event
   */
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  /**
   * Color
   */
  color: "primary" | "secondary" | "light" | "danger" | "transparent";
  /**
   * Nombre del Icono que mostrará al comienzo del botón.
   */
  start?: string;
  /**
   * Nombre del Icono que mostrará al final del botón.
   */
  end?: string;
  /**
   * Fondo transparente con borde de color.
   */
  outline?: boolean;
}

/**
  Utiliza `Button` como componente de acción.
*/
const Button: React.FC<Props> = ({
  start,
  children,
  color,
  outline,
  end,
  ...share
}: Props) => {
  return (
    <button
      {...share}
      className={`nimbus--button--${color}${outline ? "-outline" : ""}`}
    >
      {start && <Icon name={start} startPadding />}
      {children}
      {end && <Icon name={end} endPadding />}
    </button>
  );
};

Button.defaultProps = {
  color: "primary",
  outline: false,
};

export default Button;
