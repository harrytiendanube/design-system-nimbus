import * as React from "react";

import "./PageTitle.css";

import Text from "../Text";
import Link from "../Link";
import Title from "../Title";

export interface InterfacePageTitle {
  /**
   * Title text
   */
  title: string;
  /**
   * Subtitle text
   */
  subtitle?: string;
  /**
   * Link text
   */
  link?: string;
  /**
   * Link href
   */
  linkTo?: string;
}

/**
 *  @param title is the title text
 *  @param subtitle is the subtitle text
 *  @param link is the link text
 *  @param linkTo is the link href
 */
function PageTitle({
  title,
  subtitle,
  link,
  linkTo,
}: InterfacePageTitle): JSX.Element {
  const memorizedSubtitle = React.useMemo(
    () => subtitle && <Text>{subtitle}</Text>,
    [subtitle],
  );
  const memorizedLink = React.useMemo(
    () => link && linkTo && <Link href={linkTo}>{link}</Link>,
    [linkTo, link],
  );
  const withSubtitle = (subtitle || link) && (
    <div className="nimbus--page-subtitle">
      {memorizedSubtitle}
      {memorizedLink}
    </div>
  );

  return (
    <div className="nimbus--page-title">
      <Title>{title}</Title>
      {withSubtitle}
    </div>
  );
}

export default React.memo(PageTitle);
