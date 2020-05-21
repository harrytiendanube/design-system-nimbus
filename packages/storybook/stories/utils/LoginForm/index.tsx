import * as React from "react";
import { Input } from "../../../../components/src";

const LoginForm: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <>
      <Input
        label="Email de tu Tiendanube"
        placeholder="nombre@mail.com"
        name="email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
          setEmail(event.target.value)
        }
      />
      <Input
        label="Contraseña de tu Tiendanube"
        placeholder="Contraseña"
        name="password"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
          setPassword(event.target.value)
        }
      />
    </>
  );
};

export default LoginForm;
