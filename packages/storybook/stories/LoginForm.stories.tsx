import * as React from "react";
import { Title, Text, Link, Form, Button } from "../../components/src";
import { LoginForm } from "./utils";
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
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
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
