import * as React from "react";
import { Form, InterfaceForm } from "../../../components/src";

const Wrapper: React.FC<InterfaceForm> = ({
  titleText,
  subtitleText,
  submitText,
  linkText,
  linkHref,
  submitCallback,
  optionalButtonText,
  optionalCallback,
  children,
}: InterfaceForm) => (
  <Form
    titleText={titleText}
    subtitleText={subtitleText}
    linkText={linkText}
    linkHref={linkHref}
    submitText={submitText}
    submitCallback={submitCallback}
    optionalButtonText={optionalButtonText}
    optionalCallback={optionalCallback}
  >
    {children}
  </Form>
);

export default Wrapper;
