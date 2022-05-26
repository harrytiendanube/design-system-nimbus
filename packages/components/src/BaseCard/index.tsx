import * as React from "react";

import "./BaseCard.css";

import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

interface InterfaceBaseCard {
  children: React.ReactNode;
}

function BaseCard({ children }: InterfaceBaseCard): JSX.Element {
  return <div className="nimbus--base-card">{children}</div>;
}
BaseCard.Header = Header;
BaseCard.Body = Body;
BaseCard.Footer = Footer;

export default BaseCard;
