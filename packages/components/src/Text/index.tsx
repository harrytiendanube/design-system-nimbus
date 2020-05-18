import * as React from "react";
import "@tiendanube/styles/css/Text.css";

type Size = "regular";

interface Props
  extends Omit<
    React.HTMLAttributes<HTMLParagraphElement>,
    "className" | "style"
  > {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: React.ReactNode;
  /** Tamaño "regular" */
  size: Size;
}

const Text: React.FC<Props> = ({ children, size, ...share }: Props) => {
  return (
    <p {...share} className={`nimbus--text nimbus--text_${size}`}>
      {children}
    </p>
  );
};

Text.defaultProps = {
  size: "regular",
};
export default Text;
