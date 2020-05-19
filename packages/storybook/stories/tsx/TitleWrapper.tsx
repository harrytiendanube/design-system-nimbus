import * as React from "react";
import { Title } from "../../../components/src";
import { Props } from "../../../components/src/Title";

const Wrapper: React.FC<Props> = ({ children }: Props) => (
  <Title> {children} </Title>
);

export default Wrapper;
