import * as React from "react";
import { Title, InterfaceTitle } from "../../../components/src";

const Wrapper: React.FC<InterfaceTitle> = ({ children }: InterfaceTitle) => (
  <Title> {children} </Title>
);

export default Wrapper;
