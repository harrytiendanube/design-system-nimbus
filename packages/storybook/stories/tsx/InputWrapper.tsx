import * as React from "react";
import { Input } from "../../../components/src";
import { Props } from "../../../components/src/Input";

const Wrapper: React.FC<Props> = ({
  label,
  placeholder,
  value,
  name,
  onChange,
}: Props) => (
  <Input
    label={label}
    placeholder={placeholder}
    value={value}
    name={name}
    onChange={onChange}
  />
);

export default Wrapper;
