import * as React from "react";
import { Input } from "../../../../components/src";

const LoginForm: React.FC = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event);
  };
  return (
    <>
      <Input label="nombre" name="nombre" value="n1" onChange={handleChange} />
      <Input
        label="apellido"
        name="apellido"
        value="n1"
        onChange={handleChange}
      />
      <Input label="edad" name="edad" value="n1" onChange={handleChange} />
    </>
  );
};

export default LoginForm;
