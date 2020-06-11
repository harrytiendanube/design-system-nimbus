import * as React from "react";

import "@tiendanube/styles/css/PageTitle.css";

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

// TODO: Replace name 'PageTitle' with 'PagePageTitle'
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

  return (
    <div className="nimbus--page-title">
      <Title>{title}</Title>
      {memorizedSubtitle}
      {memorizedLink}
    </div>
  );
}

export default React.memo(PageTitle) as typeof PageTitle;
