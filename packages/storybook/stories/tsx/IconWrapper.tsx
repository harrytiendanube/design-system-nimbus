import * as React from "react";
import { Icon, InterfaceIcon } from "../../../components/src";

const Wrapper: React.FC<InterfaceIcon> = ({
  name,
  size,
  color,
}: InterfaceIcon) => <Icon name={name} size={size} color={color} />;

export default Wrapper;
