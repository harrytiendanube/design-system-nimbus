import * as React from "react";

import "./PageTitle.css";

import Text from "../Text";
import Link, { InterfaceLink } from "../Link";
import Title from "../Title";

export interface InterfacePageTitle {
  /** Title text */
  title: string;
  /** Subtitle text */
  subtitle?: string;
  /** Link */
  link?: Pick<InterfaceLink, "children" | "href" | "onClick">;
}

function PageTitle({ title, subtitle, link }: InterfacePageTitle): JSX.Element {
  const renderSubtitle = subtitle && <Text>{subtitle}</Text>;

  const renderLink = link && (
    <Link href={link.href} onClick={link.onClick}>
      {link.children}
    </Link>
  );

  const renderSubtitleLink = (subtitle || link) && (
    <div className="nimbus--page-subtitle">
      {renderSubtitle}
      {renderLink}
    </div>
  );

  return (
    <div className="nimbus--page-title">
      <Title>{title}</Title>
      {renderSubtitleLink}
    </div>
  );
}

const Skeleton = () => <div className="nimbus--page-title-skeleton" />;

PageTitle.Skeleton = Skeleton;

export default PageTitle;
