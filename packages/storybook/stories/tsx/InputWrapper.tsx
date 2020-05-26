import * as React from "react";
import { Input, InterfaceInput } from "../../../components/src";

const Wrapper: React.FC<InterfaceInput> = ({
  label,
  placeholder,
  value,
  name,
  onChange,
}: InterfaceInput) => (
  <Input
    label={label}
    placeholder={placeholder}
    value={value}
    name={name}
    onChange={onChange}
  />
);

export default Wrapper;
