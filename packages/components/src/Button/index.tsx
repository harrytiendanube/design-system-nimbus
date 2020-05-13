import * as React from "react";
import "@tiendanube/styles/css/Button.css";
import { Icon } from "../";

type Color = "primary" | "secondary" | "light" | "danger" | "transparent";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: React.ReactNode;
  /**
   * Cambia el estilo del componente
   */
  className?: string;
  /**
   * Colores "primary", "secondary", "Light", "Danger", "Transparent"
   */
  color: Color;
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
  className = "",
  start,
  children,
  end,
  color = "primary",
  outline = false,
  ...defaultProps
}: Props) => {
  return (
    <button
      {...defaultProps}
      className={`${className} nimbus--button--${color}${
        outline ? "-outline" : ""
      }`}
    >
      {start && <Icon name={start} className="button_start" />}
      {children}
      {end && <Icon name={end} className="button_end" />}
    </button>
  );
};

export default Button;
