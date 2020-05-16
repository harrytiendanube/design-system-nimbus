import * as React from "react";
import Icon from "../Icon";
import "@tiendanube/styles/css/Link.css";

type Color = "primary" | "secondary" | "light" | "danger" | "transparent";

interface Props
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "onClick" | "style"
  > {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: React.ReactNode;
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
}

const Link: React.FC<Props> = ({
  start,
  children,
  end,
  color,
  ...share
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function avoidOnclick(): void {}
  return (
    <a
      {...share}
      onClick={avoidOnclick}
      style={{}}
      className={`nimbus--link link_${color}`}
    >
      {start && <Icon name={start} startMargin />}
      {children}
      {end && <Icon name={end} endMargin />}
    </a>
  );
};

Link.defaultProps = {
  color: "primary",
};

export default Link;
