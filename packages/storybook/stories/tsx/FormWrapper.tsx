import * as React from "react";
import { Form, InterfaceForm } from "../../../components/src";

const Wrapper: React.FC<InterfaceForm> = ({
  mySlot,
  submitText,
  submitCallback,
  optionalButtonText,
  optionalCallback,
  children,
}: InterfaceForm) => (
  <Form
    mySlot={mySlot}
    submitText={submitText}
    submitCallback={submitCallback}
    optionalButtonText={optionalButtonText}
    optionalCallback={optionalCallback}
  >
    {children}
  </Form>
);

export default Wrapper;
