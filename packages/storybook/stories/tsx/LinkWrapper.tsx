import * as React from "react";
import { Link, InterfaceLink } from "../../../components/src";

const Wrapper: React.FC<InterfaceLink> = ({
  href,
  target,
  onClick,
  start,
  end,
  color,
  children,
}: InterfaceLink) => (
  <Link
    href={href}
    target={target}
    onClick={onClick}
    start={start}
    end={end}
    color={color}
  >
    {children}
  </Link>
);

export default Wrapper;
