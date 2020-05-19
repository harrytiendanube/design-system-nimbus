import * as React from "react";
import { Text, InterfaceText } from "../../../components/src";

const Wrapper: React.FC<InterfaceText> = ({ children }: InterfaceText) => (
  <Text> {children} </Text>
);

export default Wrapper;
