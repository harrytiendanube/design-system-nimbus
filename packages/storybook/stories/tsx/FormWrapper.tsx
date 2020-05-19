import * as React from "react";
import { Form, Props } from "../../../components/src";

const Wrapper: React.FC<Props> = ({
  submitText,
  submitCallback,
  optionalButtonText,
  optionalCallback,
  children,
}: Props) => (
  <Form
    submitText={submitText}
    submitCallback={submitCallback}
    optionalButtonText={optionalButtonText}
    optionalCallback={optionalCallback}
  >
    {children}
  </Form>
);

export default Wrapper;
