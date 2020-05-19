import * as React from "react";
import { Button } from "../../../components/src";
import { Props } from "../../../components/src/Button";

const Wrapper: React.FC<Props> = ({
  start,
  end,
  color,
  children,
  onClick,
}: Props) => (
  <Button start={start} end={end} color={color} onClick={onClick}>
    {children}
  </Button>
);

export default Wrapper;
