import * as React from "react";
import { Header, InterfaceHeader } from "../../../components/src";

const Wrapper: React.FC<InterfaceHeader> = ({
  titleText,
  subtitleText,
  linkText,
  linkHref,
}: InterfaceHeader) => (
  <Header
    titleText={titleText}
    subtitleText={subtitleText}
    linkText={linkText}
    linkHref={linkHref}
  />
);

export default Wrapper;
