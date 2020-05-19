import * as React from "react";
import { Link } from "../../../components/src";
import { Props } from "../../../components/src/Link";

const Wrapper: React.FC<Props> = ({
  href,
  target,
  onClick,
  start,
  end,
  color,
  children,
}: Props) => (
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
