import * as React from "react";

interface Props
  extends Omit<
    React.HTMLAttributes<HTMLHeadingElement>,
    "className" | "children"
  > {
  /** Element inside tag component */
  children: React.ReactNode;
  /** Heading type */
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title: React.FC<Props> = ({ children, type, ...share }: Props) => {
  const HeadTag = `${type}`;
  return <HeadTag {...share}>{children}</HeadTag>;
};

Title.defaultProps = {
  type: "h1",
};

export default Title;
