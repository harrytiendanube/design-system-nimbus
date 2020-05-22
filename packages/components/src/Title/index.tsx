import * as React from "react";
import "@tiendanube/styles/css/Title.css";

export interface InterfaceTitle
  extends Omit<
    React.HTMLAttributes<HTMLHeadingElement>,
    "className" | "children" | "style"
  > {
  /** Element inside tag component */
  children: React.ReactNode;
  /** Heading type */
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title: React.FC<InterfaceTitle> = ({
  children,
  type = "h1",
  ...share
}: InterfaceTitle) => {
  const HeadTag = `${type}`;

  const classesTypes = {
    // TODO: Reemplazar los valores 01, 02, 03 por los h1, h2, h3, etc.
    h1: "nimbus--title-01",
    h2: "nimbus--title-02",
    h3: "nimbus--title-03",
    h4: "nimbus--title-04",
    h5: "nimbus--title-05",
    h6: "nimbus--title-06",
  };
  const props = Object.assign({}, share, { className: classesTypes[type] });
  return <HeadTag {...props}>{children}</HeadTag>;
};

Title.defaultProps = {
  type: "h1",
};

export default Title;
