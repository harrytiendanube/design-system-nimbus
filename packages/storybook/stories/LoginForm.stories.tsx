import * as React from "react";
import { Title, Text, Link, Form, Button } from "../../components/src";
import { Input } from "../../components";
export default { title: "Login Form" };

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <>
      <Title>Administrá tu tienda online</Title>
      <Text>¿Todavía no vendés por internet?</Text>
      <Link href="http://www.tiendanube.com.ar">Creá tu tienda</Link>
      <Form
        submitText="Ingresar a tu tienda"
        submitCallback={(): void =>
          alert(`Login click: email: ${email} password: ${password}`)
        }
        linkText="¿Te olvidaste tu contraseña?"
        linkHref="http://www.tiendanube.com"
      >
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
      </Form>
      <Button
        color="light"
        start="Facebook"
        onClick={(): void => alert("Facebook click")}
      >
        {" "}
        Continuar con Facebook
      </Button>{" "}
    </>
  );
};
