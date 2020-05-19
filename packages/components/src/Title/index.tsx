import * as React from "react";

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
  type,
  ...share
}: InterfaceTitle) => {
  const HeadTag = `${type}`;
  return <HeadTag {...share}>{children}</HeadTag>;
};

Title.defaultProps = {
  type: "h1",
};

export default Title;
