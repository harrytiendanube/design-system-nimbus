import * as React from "react";
import { Text } from "../../../components/src";
import { Props } from "../../../components/src/Text";

const Wrapper: React.FC<Props> = ({ children }: Props) => (
  <Text> {children} </Text>
);

export default Wrapper;
