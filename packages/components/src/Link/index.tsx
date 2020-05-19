import * as React from "react";
import Icon from "../Icon";
import "@tiendanube/styles/css/Link.css";

export interface Props
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "style"
  > {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: React.ReactNode;
  /**
   * Nombre del Icono que mostrará al comienzo del botón.
   */
  start?: string;
  /**
   * Nombre del Icono que mostrará al final del botón.
   */
  end?: string;
}

const Link: React.FC<Props> = ({ start, children, end, ...share }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return (
    <a {...share} className="nimbus--link">
      {start && <Icon name={start} startPadding />}
      {children}
      {end && <Icon name={end} endPadding />}
    </a>
  );
};

export default Link;
