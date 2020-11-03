import * as React from "react";
import { Form, InputValidator } from "@tiendanube/components/src";

function Wrapper(): JSX.Element {
  const handleSubmit = (data: {}): void => {
    console.log(data);
    alert("follow your dreams 🚀");
  };

  const handleClickButton = () => {
    alert("click in button");
  };

  return (
    <Form
      textValidation={{
        admin: "This field is required (custom)",
        email: "input email (custom)",
      }}
      alertText="Error"
      alertAppearance="danger"
      submitLabel="OK"
      onClickSubmit={handleSubmit}
      buttonLabel="Cancel"
      onClickButton={handleClickButton}
    >
      <InputValidator
        label="User"
        value="123"
        placeholder="Insert user"
        name="user"
        required
      />
      <InputValidator
        label="Password"
        placeholder="Insert password"
        name="password"
      />
      <InputValidator
        label="Age"
        placeholder="Insert age"
        name="age"
        type="number"
      />
      <InputValidator
        label="Admin"
        placeholder="Insert admin"
        name="admin"
        maxLength={15}
        minLength={5}
      />
      <InputValidator
        label="Email"
        placeholder="Insert email"
        name="email"
        type="email"
      />

      <InputValidator
        label="Only contain 1"
        placeholder="Type something that contains 1"
        name="only"
        type="text"
        pattern="1"
      />
    </Form>
  );
}
export default Wrapper;
