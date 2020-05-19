import * as React from "react";

interface Props
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "children" | "style"> {
  /** Element inside tag component */
  children: React.ReactNode;
  /** Heading type */
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title: React.FC<Props> = ({ children, type = "h1", ...share }: Props) => {
  const HeadTag = `${type}`;

  // TODO: @Juan falta definir estas clases.
  const classesTypes = {
    h1: "main-title",
    h2: "second-title",
    h3: "t-title",
    h4: "t-title",
  };
  const props = Object.assign({}, share, { className: classesTypes[type] });
  return <HeadTag {...props}>{children}</HeadTag>;
};

Title.defaultProps = {
  type: "h1",
};

export default Title;
