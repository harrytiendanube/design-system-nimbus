import * as React from "react";
import { Icon } from "../../../components/src";
import { Props } from "../../../components/src/Icon";

const Wrapper: React.FC<Props> = ({ name, size, color }: Props) => (
  <Icon name={name} size={size} color={color} />
);

export default Wrapper;
