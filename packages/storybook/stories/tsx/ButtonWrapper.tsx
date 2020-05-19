import * as React from "react";
import { Button, InterfaceButton } from "../../../components/src";

const Wrapper: React.FC<InterfaceButton> = ({
  start,
  end,
  color,
  children,
  onClick,
}: InterfaceButton) => (
  <Button start={start} end={end} color={color} onClick={onClick}>
    {children}
  </Button>
);

export default Wrapper;
