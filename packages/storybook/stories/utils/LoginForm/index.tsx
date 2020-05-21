import * as React from "react";
import { Input } from "../../../../components/src";

export interface InterfaceLogin {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<InterfaceLogin> = ({
  email,
  setEmail,
  password,
  setPassword,
}: InterfaceLogin) => {
  return (
    <>
      <Input
        label="Email de tu Tiendanube"
        placeholder="nombre@mail.com"
        name="email"
        type="email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
          setEmail(event.target.value)
        }
      />
      <Input
        label="Contraseña de tu Tiendanube"
        placeholder="Contraseña"
        name="password"
        type="password"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
          setPassword(event.target.value)
        }
      />
    </>
  );
};

export default LoginForm;
